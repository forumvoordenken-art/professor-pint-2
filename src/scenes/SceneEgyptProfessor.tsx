import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type PhysicsConfig = {
  damping: number;
  stiffness: number;
  mass: number;
};

type CameraTransform = {
  scale: number;
  x: number;
  y: number;
};

type ParallaxLayer = {
  x: number;
  y: number;
  scale: number;
};

type ParallaxLayers = {
  farLayer: ParallaxLayer;
  midLayer: ParallaxLayer;
  nearLayer: ParallaxLayer;
};

type DustParticle = {
  x: number;
  y: number;
  opacity: number;
  size: number;
};

const TIMINGS = {
  SCENE_DURATION: 300,
  ENTRANCE_START: 0,
  ENTRANCE_END: 45,
  GESTURE_1_START: 60,
  GESTURE_1_END: 90,
  GESTURE_2_START: 120,
  GESTURE_2_END: 150,
  GESTURE_3_START: 180,
  GESTURE_3_END: 210,
  BLINK_DURATION: 4,
  BLINK_INTERVAL: 90,
  TALK_CYCLE: 14,
  SYLLABLE_DURATION: 7,
  BREATH_CYCLE: 60,
  CAMERA_ZOOM_START: 0,
  CAMERA_ZOOM_MID: 150,
  CAMERA_ZOOM_END: 300,
} as const;

const SPRING_CONFIGS = {
  ENTRANCE: {
    damping: 200,
    stiffness: 120,
    mass: 0.7,
  },
  ARM_GESTURE: {
    damping: 80,
    stiffness: 180,
    mass: 0.5,
  },
  HEAD_NOD: {
    damping: 150,
    stiffness: 100,
    mass: 0.6,
  },
  MUG_MOVEMENT: {
    damping: 120,
    stiffness: 90,
    mass: 1.2,
  },
  BLINK: {
    damping: 300,
    stiffness: 400,
    mass: 0.3,
  },
  BREATHING: {
    damping: 250,
    stiffness: 50,
    mass: 1,
  },
} as const;

const Easing = {
  smoothstep: (t: number): number => {
    const clamped = Math.max(0, Math.min(1, t));
    return clamped * clamped * (3 - 2 * clamped);
  },
  elasticOut: (t: number): number => {
    const p = 0.3;
    return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1;
  },
  easeInOutExpo: (t: number): number => {
    if (t === 0 || t === 1) {
      return t;
    }

    if (t < 0.5) {
      return Math.pow(2, 20 * t - 10) / 2;
    }

    return (2 - Math.pow(2, -20 * t + 10)) / 2;
  },
  easeInOutSine: (t: number): number => {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  },
};

const cyclicInterpolate = (
  frame: number,
  cycleLength: number,
  keyframes: number[],
  values: number[],
  extrapolate: 'clamp' | 'extend' = 'clamp'
): number => {
  return interpolate(frame % cycleLength, keyframes, values, {
    extrapolateLeft: extrapolate,
    extrapolateRight: extrapolate,
  });
};

const triggeredSpring = (
  frame: number,
  fps: number,
  triggerFrame: number,
  config: PhysicsConfig
): number => {
  if (frame < triggerFrame) {
    return 0;
  }

  return spring({
    frame: frame - triggerFrame,
    fps,
    config,
  });
};

const pulse = (frame: number, frequency: number, amplitude: number): number => {
  return Math.sin(frame * frequency) * amplitude;
};

const getCameraTransform = (frame: number): CameraTransform => {
  const zoomPhase1 = interpolate(
    frame,
    [TIMINGS.CAMERA_ZOOM_START, TIMINGS.CAMERA_ZOOM_MID],
    [1, 1.12],
    {
      extrapolateRight: 'clamp',
      easing: Easing.easeInOutSine,
    }
  );

  const zoomPhase2 = interpolate(
    frame,
    [TIMINGS.CAMERA_ZOOM_MID, TIMINGS.CAMERA_ZOOM_END],
    [1.12, 1.05],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.easeInOutExpo,
    }
  );

  const cameraScale = frame < TIMINGS.CAMERA_ZOOM_MID ? zoomPhase1 : zoomPhase2;

  const panX =
    interpolate(frame, [0, TIMINGS.SCENE_DURATION], [0, -50], {
      extrapolateRight: 'clamp',
    }) +
    Math.sin(frame / 80) * 8;

  const panY = Math.sin(frame / 100) * 5;

  return {
    scale: cameraScale,
    x: panX,
    y: panY,
  };
};

const getParallaxLayers = (camera: CameraTransform): ParallaxLayers => {
  return {
    farLayer: {
      x: camera.x * 0.3,
      y: camera.y * 0.3,
      scale: camera.scale * 0.98,
    },
    midLayer: {
      x: camera.x * 0.6,
      y: camera.y * 0.5,
      scale: camera.scale * 0.99,
    },
    nearLayer: {
      x: camera.x * 1.2,
      y: camera.y * 0.8,
      scale: camera.scale * 1.01,
    },
  };
};

const getSunlightEffect = (frame: number) => {
  const opacity = interpolate(Math.sin(frame / 40), [-1, 1], [0.1, 0.25]);
  const rotation = frame * 0.02;
  return {opacity, rotation};
};

const getHeatShimmer = (frame: number) => {
  const offsetX = Math.sin(frame / 8) * 2;
  const offsetY = Math.cos(frame / 10) * 1.5;
  return {offsetX, offsetY};
};

const getDustParticles = (frame: number): DustParticle[] => {
  const particles: DustParticle[] = [];

  for (let i = 0; i < 8; i++) {
    const seed = i * 123.45;
    const x = 200 + Math.sin(frame / 30 + seed) * 100 + i * 180;
    const y = (frame * (0.9 + i * 0.08) + (seed % 300)) % 1080;
    const opacity = Math.abs(Math.sin(frame / 20 + seed)) * 0.22;
    particles.push({
      x,
      y,
      opacity,
      size: 2 + (i % 3),
    });
  }

  return particles;
};

const getEntranceAnimation = (frame: number, fps: number) => {
  const entranceProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.ENTRANCE,
  });

  const enterY = interpolate(entranceProgress, [0, 1], [120, 0]);

  const enterScale = interpolate(entranceProgress, [0, 0.7, 1], [0.8, 1.05, 1]);

  const enterOpacity = interpolate(
    frame,
    [TIMINGS.ENTRANCE_START, TIMINGS.ENTRANCE_END],
    [0, 1],
    {extrapolateRight: 'clamp'}
  );

  return {y: enterY, scale: enterScale, opacity: enterOpacity};
};

const getBreathingAnimation = (frame: number) => {
  const breathPhase = (frame % TIMINGS.BREATH_CYCLE) / TIMINGS.BREATH_CYCLE;

  const chestMovement = interpolate(Math.sin(breathPhase * Math.PI * 2), [-1, 1], [-2, 2]);

  const shoulderPhase = ((frame + 5) % TIMINGS.BREATH_CYCLE) / TIMINGS.BREATH_CYCLE;
  const shoulderMovement = interpolate(Math.sin(shoulderPhase * Math.PI * 2), [-1, 1], [-1, 1]);

  return {
    chestY: chestMovement,
    shoulderY: shoulderMovement,
    scale: 1 + chestMovement * 0.005,
  };
};

const getIdleAnimation = (frame: number) => {
  const primaryBob = Math.sin(frame / 12) * 4;
  const secondaryBob = Math.sin(frame / 6) * 1.5;
  const sway = Math.cos(frame / 20) * 2;

  return {
    y: primaryBob + secondaryBob,
    x: sway,
  };
};

const getGestureAnimation = (frame: number, fps: number) => {
  const gesture1Progress = triggeredSpring(
    frame,
    fps,
    TIMINGS.GESTURE_1_START,
    SPRING_CONFIGS.ARM_GESTURE
  );

  const gesture1Active = frame >= TIMINGS.GESTURE_1_START && frame < TIMINGS.GESTURE_1_END;
  const gesture1Rotation = gesture1Active ? interpolate(gesture1Progress, [0, 1], [0, -35]) : 0;

  const gesture2Progress = triggeredSpring(
    frame,
    fps,
    TIMINGS.GESTURE_2_START,
    SPRING_CONFIGS.ARM_GESTURE
  );

  const gesture2Active = frame >= TIMINGS.GESTURE_2_START && frame < TIMINGS.GESTURE_2_END;
  const gesture2Extension = gesture2Active ? interpolate(gesture2Progress, [0, 1], [0, 25]) : 0;

  const gesture3Active = frame >= TIMINGS.GESTURE_3_START && frame < TIMINGS.GESTURE_3_END;
  const waveFrequency = gesture3Active
    ? Math.sin((frame - TIMINGS.GESTURE_3_START) * 0.5) * 15
    : 0;

  const handScale = gesture3Active ? 1.04 + pulse(frame, 0.25, 0.02) : 1;

  return {
    rightArmRotation: gesture1Rotation,
    rightArmX: gesture2Extension,
    leftHandRotation: waveFrequency,
    handScale,
  };
};

const getMugAnimation = (frame: number, fps: number) => {
  const mugRaiseProgress = triggeredSpring(
    frame,
    fps,
    TIMINGS.GESTURE_2_START - 5,
    SPRING_CONFIGS.MUG_MOVEMENT
  );

  const mugActive = frame >= TIMINGS.GESTURE_2_START && frame < TIMINGS.GESTURE_2_END + 20;

  const mugY = mugActive ? interpolate(mugRaiseProgress, [0, 1], [0, -30]) : 0;
  const mugRotation = mugActive ? interpolate(mugRaiseProgress, [0, 1], [0, -15]) : 0;

  const isDrinking =
    frame >= TIMINGS.GESTURE_2_START + 25 && frame < TIMINGS.GESTURE_2_START + 40;
  const drinkScale = isDrinking ? 0.98 : 1;

  const foamPulse = isDrinking ? Math.abs(Math.sin(frame * 0.9)) : 0;
  const showFoam = foamPulse > 0.55;

  return {
    y: mugY,
    rotation: mugRotation,
    scale: drinkScale,
    showFoam,
  };
};

const getEyeBlinkAnimation = (frame: number) => {
  const blinkTriggers = [
    TIMINGS.BLINK_INTERVAL,
    TIMINGS.BLINK_INTERVAL * 2,
    TIMINGS.BLINK_INTERVAL * 2 + 80,
  ];

  let isBlinking = false;
  let blinkProgress = 0;

  for (const trigger of blinkTriggers) {
    if (frame >= trigger && frame < trigger + TIMINGS.BLINK_DURATION) {
      isBlinking = true;
      blinkProgress = (frame - trigger) / TIMINGS.BLINK_DURATION;
      break;
    }
  }

  const eyeOpenAmount = isBlinking ? interpolate(blinkProgress, [0, 0.5, 1], [1, 0, 1]) : 1;

  return {
    scaleY: eyeOpenAmount,
    opacity: interpolate(eyeOpenAmount, [0, 1], [0.2, 1]),
  };
};

const getEyebrowAnimation = (frame: number) => {
  const eyebrowRaiseTriggers = [
    {start: 70, end: 100, intensity: 8},
    {start: 140, end: 170, intensity: 12},
    {start: 220, end: 250, intensity: 6},
  ];

  let eyebrowY = 0;

  for (const trigger of eyebrowRaiseTriggers) {
    if (frame >= trigger.start && frame < trigger.end) {
      const progress = (frame - trigger.start) / (trigger.end - trigger.start);
      eyebrowY = interpolate(progress, [0, 0.5, 1], [0, -trigger.intensity, 0]);
      break;
    }
  }

  return {y: eyebrowY};
};

const getMouthAnimation = (frame: number) => {
  const mouthOpenBase = cyclicInterpolate(
    frame,
    TIMINGS.TALK_CYCLE,
    [0, TIMINGS.TALK_CYCLE * 0.3, TIMINGS.TALK_CYCLE * 0.7, TIMINGS.TALK_CYCLE],
    [0.15, 1, 0.3, 0.15]
  );

  const syllableVariation = Math.sin(frame / TIMINGS.SYLLABLE_DURATION) * 0.15;

  const isDrinking =
    frame >= TIMINGS.GESTURE_2_START + 25 && frame < TIMINGS.GESTURE_2_START + 40;

  const mouthOpen = isDrinking ? 0.5 : Math.max(0.1, mouthOpenBase + syllableVariation);

  const mouthWidth = interpolate(Math.sin(frame / 50), [-1, 1], [0.95, 1.05]);

  return {
    scaleY: mouthOpen,
    scaleX: mouthWidth,
  };
};

const getHeadAnimation = (frame: number, fps: number) => {
  const nodTriggers = [100, 200];
  let nodRotation = 0;

  for (const trigger of nodTriggers) {
    if (frame >= trigger && frame < trigger + 30) {
      const nodSpring = triggeredSpring(frame, fps, trigger, SPRING_CONFIGS.HEAD_NOD);
      nodRotation = interpolate(nodSpring, [0, 0.55, 1], [0, 8, 0]);
      break;
    }
  }

  const tilt = Math.sin(frame / 80) * 2;
  const turn = interpolate(Math.sin(frame / 60), [-1, 1], [-5, 5]);

  return {
    rotateX: nodRotation,
    rotateZ: tilt,
    rotateY: turn,
  };
};

export const SceneEgyptProfessor: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const camera = getCameraTransform(frame);
  const parallax = getParallaxLayers(camera);
  const entrance = getEntranceAnimation(frame, fps);
  const breathing = getBreathingAnimation(frame);
  const idle = getIdleAnimation(frame);
  const gestures = getGestureAnimation(frame, fps);
  const mug = getMugAnimation(frame, fps);
  const eyeBlink = getEyeBlinkAnimation(frame);
  const eyebrow = getEyebrowAnimation(frame);
  const mouth = getMouthAnimation(frame);
  const head = getHeadAnimation(frame, fps);
  const sunlight = getSunlightEffect(frame);
  const shimmer = getHeatShimmer(frame);
  const dustParticles = getDustParticles(frame);

  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: '#f4e4c1'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${parallax.farLayer.x}px, ${parallax.farLayer.y}px) scale(${parallax.farLayer.scale})`,
          transformOrigin: '50% 50%',
        }}
      >
        <Img
          src={staticFile('assets/scenes/egypt-pyramids.svg')}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${parallax.midLayer.x}px, ${parallax.midLayer.y}px) scale(${parallax.midLayer.scale})`,
          transformOrigin: '50% 50%',
          background:
            'radial-gradient(circle at 80% 22%, rgba(255,205,123,0.16), rgba(255,205,123,0) 42%)',
          mixBlendMode: 'screen',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '20%',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(255,200,100,0.3) 0%, transparent 70%)',
          opacity: sunlight.opacity,
          transform: `rotate(${sunlight.rotation}deg) scale(${1 + pulse(frame, 0.03, 0.03)})`,
          filter: 'blur(30px)',
          mixBlendMode: 'screen',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '30%',
          bottom: 0,
          background: 'linear-gradient(to top, rgba(255,255,255,0.12), transparent)',
          transform: `translate(${shimmer.offsetX}px, ${shimmer.offsetY}px)`,
          filter: 'blur(2px)',
          mixBlendMode: 'overlay',
        }}
      />

      {dustParticles.map((particle, index) => (
        <div
          key={`dust-${index}`}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            background: 'rgba(255, 230, 180, 0.8)',
            opacity: particle.opacity,
            filter: 'blur(1px)',
          }}
        />
      ))}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${parallax.nearLayer.x}px, ${parallax.nearLayer.y}px) scale(${parallax.nearLayer.scale})`,
          transformOrigin: '50% 50%',
          background: 'linear-gradient(to top, rgba(90, 52, 24, 0.18) 0%, rgba(90, 52, 24, 0) 35%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '8%',
          bottom: '-4%',
          width: 760,
          transform: `
            translateY(${entrance.y + idle.y + breathing.chestY}px)
            translateX(${idle.x + camera.x * 0.05}px)
            scale(${entrance.scale * breathing.scale})
            rotateX(${head.rotateX}deg)
            rotateY(${head.rotateY}deg)
            rotateZ(${head.rotateZ}deg)
          `,
          transformOrigin: 'center bottom',
          opacity: entrance.opacity,
        }}
      >
        <Img src={staticFile('assets/characters/professor-pint.svg')} style={{width: '100%'}} />

        <div
          style={{
            position: 'absolute',
            left: 300,
            top: 185 + eyebrow.y + breathing.shoulderY * 0.2,
            width: 40,
            height: 8,
            borderRadius: 12,
            background: '#2c1b11',
            transform: 'rotate(-12deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 360,
            top: 185 + eyebrow.y + breathing.shoulderY * 0.2,
            width: 40,
            height: 8,
            borderRadius: 12,
            background: '#2c1b11',
            transform: 'rotate(12deg)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 306,
            top: 216,
            width: 18,
            height: 10,
            borderRadius: 999,
            background: '#1d120c',
            transform: `scaleY(${eyeBlink.scaleY})`,
            opacity: eyeBlink.opacity,
            transformOrigin: 'center',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 370,
            top: 216,
            width: 18,
            height: 10,
            borderRadius: 999,
            background: '#1d120c',
            transform: `scaleY(${eyeBlink.scaleY})`,
            opacity: eyeBlink.opacity,
            transformOrigin: 'center',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 530 + gestures.rightArmX,
            top: 320,
            width: 130,
            height: 40,
            borderRadius: 999,
            background: 'rgba(37, 24, 15, 0.24)',
            transform: `rotate(${gestures.rightArmRotation}deg)`,
            transformOrigin: 'left center',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 125,
            top: 310,
            width: 118,
            height: 36,
            borderRadius: 999,
            background: 'rgba(37, 24, 15, 0.2)',
            transform: `rotate(${gestures.leftHandRotation}deg) scale(${gestures.handScale})`,
            transformOrigin: 'right center',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 240,
            top: 345 + mug.y,
            width: 46,
            height: 56,
            borderRadius: '10px 10px 14px 14px',
            background: 'linear-gradient(180deg, #f2c15f 0%, #dc9b2e 100%)',
            border: '3px solid #8f5f18',
            transform: `rotate(${mug.rotation}deg) scale(${mug.scale})`,
            transformOrigin: '40% 70%',
            boxShadow: '0 8px 12px rgba(0,0,0,0.28)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: -12,
              top: 14,
              width: 14,
              height: 20,
              border: '3px solid #8f5f18',
              borderLeft: 'none',
              borderRadius: '0 10px 10px 0',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 4,
              top: 4,
              width: 32,
              height: 9,
              borderRadius: 999,
              background: '#f8de98',
              opacity: mug.showFoam ? 1 : 0.45,
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: 338,
            top: 265,
            width: 122,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 86,
              height: 22,
              borderRadius: 999,
              background: '#5b250d',
              transform: `scaleY(${mouth.scaleY}) scaleX(${mouth.scaleX})`,
              transformOrigin: 'center',
              boxShadow: 'inset 0 -2px 0 rgba(255,255,255,0.35)',
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '-5%',
          left: '8%',
          width: 760,
          height: 100,
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)',
          transform: `translateY(${entrance.y * 0.5}px) scale(${1 + pulse(frame, 0.03, 0.02)})`,
          filter: 'blur(20px)',
          opacity: entrance.opacity * 0.6,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 50% 20%, rgba(255, 244, 215, 0.16), transparent 35%),
            linear-gradient(180deg, rgba(40, 24, 12, 0) 65%, rgba(40, 24, 12, 0.18) 100%)
          `,
          opacity: 0.8,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
