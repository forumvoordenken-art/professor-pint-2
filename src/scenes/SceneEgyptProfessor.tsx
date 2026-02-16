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

export const SceneEgyptProfessor: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Camera animation - subtle zoom and pan
  const cameraScale = interpolate(
    frame,
    [0, 150, 300],
    [1, 1.08, 1.05],
    {extrapolateRight: 'clamp'}
  );
  const cameraPanX = interpolate(
    frame,
    [0, 150, 300],
    [0, -20, 0],
    {extrapolateRight: 'clamp'}
  );

  // Professor entrance animation
  const entranceProgress = spring({
    frame,
    fps,
    config: {damping: 200, stiffness: 120, mass: 0.7},
  });
  const professorY = interpolate(entranceProgress, [0, 1], [100, 0]);
  const professorOpacity = interpolate(frame, [0, 45], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Idle animations - gentle floating
  const floatY = Math.sin(frame / 12) * 4 + Math.sin(frame / 6) * 1.5;
  const swayX = Math.cos(frame / 20) * 2;

  // Breathing animation
  const breathPhase = (frame % 60) / 60;
  const breathScale = 1 + Math.sin(breathPhase * Math.PI * 2) * 0.008;

  // Eye blink animation (every 90 frames)
  const blinkCycle = frame % 90;
  const eyeScaleY = blinkCycle < 4
    ? interpolate(blinkCycle, [0, 2, 4], [1, 0.1, 1])
    : 1;

  // Mouth animation - talking cycle
  const mouthCycle = frame % 14;
  const mouthOpen = interpolate(mouthCycle, [0, 7, 14], [0.25, 1, 0.25]);

  // Head rotation - subtle nods during gestures
  const headRotation = interpolate(
    Math.sin(frame / 30),
    [-1, 1],
    [-2, 2]
  );

  // Arm gestures - three distinct gestures
  const gesture1 = spring({
    frame: frame - 60,
    fps,
    config: {damping: 80, stiffness: 180, mass: 0.5},
  });
  const gesture2 = spring({
    frame: frame - 120,
    fps,
    config: {damping: 80, stiffness: 180, mass: 0.5},
  });
  const gesture3 = spring({
    frame: frame - 180,
    fps,
    config: {damping: 80, stiffness: 180, mass: 0.5},
  });

  // Right arm rotation based on gestures
  const rightArmRotate =
    (frame >= 60 && frame < 90 ? interpolate(gesture1, [0, 1], [0, -25]) : 0) +
    (frame >= 120 && frame < 150 ? interpolate(gesture2, [0, 1], [0, 20]) : 0) +
    (frame >= 180 && frame < 210 ? interpolate(gesture3, [0, 1], [0, -15]) : 0);

  // Left arm rotation (holding mug)
  const leftArmRotate = interpolate(
    Math.sin((frame % 120) / 120 * Math.PI * 2),
    [-1, 1],
    [-8, 8]
  );

  // Mug raise animation
  const mugRaise = frame >= 240 && frame < 270
    ? spring({
        frame: frame - 240,
        fps,
        config: {damping: 120, stiffness: 90, mass: 1.2},
      })
    : frame >= 270 ? 1 : 0;
  const mugY = interpolate(mugRaise, [0, 1], [0, -40]);
  const mugRotate = interpolate(mugRaise, [0, 1], [0, 12]);

  return (
    <AbsoluteFill style={{backgroundColor: '#2a1810'}}>
      {/* Background - Egyptian pyramids */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${cameraScale}) translateX(${cameraPanX}px)`,
        }}
      >
        <Img
          src={staticFile('pyramid-background.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.7) sepia(0.3)',
          }}
        />
      </div>

      {/* Dust particles for atmosphere */}
      {Array.from({length: 8}).map((_, i) => {
        const seed = i * 123.45;
        const x = 200 + Math.sin(frame / 30 + seed) * 100 + i * 180;
        const y = (frame * (0.9 + i * 0.08) + (seed % 300)) % 1080;
        const opacity = Math.abs(Math.sin(frame / 20 + seed)) * 0.22;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              borderRadius: '50%',
              background: '#f4d598',
              opacity,
              filter: 'blur(1px)',
            }}
          />
        );
      })}

      {/* Professor Pint - SVG inline */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, calc(-50% + ${professorY + floatY}px)) translateX(${swayX}px)`,
          opacity: professorOpacity,
        }}
      >
        <svg
          width="800"
          height="1200"
          viewBox="0 0 800 1200"
          style={{
            transform: `scale(${breathScale}) rotate(${headRotation}deg)`,
            transformOrigin: 'center',
          }}
        >
          {/* Head */}
          <ellipse cx="400" cy="220" rx="170" ry="145" fill="#f2ad68" />

          {/* Ears */}
          <ellipse cx="255" cy="220" rx="60" ry="80" fill="#8a8078" />
          <ellipse cx="545" cy="220" rx="60" ry="80" fill="#8a8078" />

          {/* Glasses frame */}
          <circle
            cx="340"
            cy="235"
            r="38"
            fill="none"
            stroke="#17120f"
            strokeWidth="4"
          />
          <circle
            cx="465"
            cy="235"
            r="38"
            fill="none"
            stroke="#17120f"
            strokeWidth="4"
          />
          <line
            x1="378"
            y1="235"
            x2="427"
            y2="235"
            stroke="#17120f"
            strokeWidth="4"
          />

          {/* Eyes with blink */}
          <ellipse
            cx="340"
            cy="235"
            rx="15"
            ry={15 * eyeScaleY}
            fill="#000"
          />
          <ellipse
            cx="465"
            cy="235"
            rx="15"
            ry={15 * eyeScaleY}
            fill="#000"
          />

          {/* Eye highlights */}
          {eyeScaleY > 0.5 && (
            <>
              <circle cx="345" cy="230" r="5" fill="#fff" opacity="0.8" />
              <circle cx="470" cy="230" r="5" fill="#fff" opacity="0.8" />
            </>
          )}

          {/* Nose */}
          <ellipse cx="405" cy="270" rx="20" ry="25" fill="#c47742" />

          {/* Mustache */}
          <ellipse cx="405" cy="285" rx="52" ry="22" fill="#5d4a3a" />
          <ellipse cx="360" cy="285" rx="30" ry="18" fill="#5d4a3a" />
          <ellipse cx="450" cy="285" rx="30" ry="18" fill="#5d4a3a" />

          {/* Mouth - animated talking */}
          <ellipse
            cx="405"
            cy="305"
            rx="43"
            ry={11 * mouthOpen}
            fill="#5b250d"
            opacity="0.9"
          />

          {/* Body - jacket */}
          <rect
            x="275"
            y="365"
            width="250"
            height="280"
            fill="#3a2a1f"
            rx="15"
          />

          {/* Shirt and tie */}
          <polygon
            points="400,365 350,365 350,500 450,500 450,365"
            fill="#e8dcc8"
          />
          <polygon
            points="400,370 385,370 395,480 405,480 415,370"
            fill="#8b2f2f"
          />

          {/* Left arm (holding mug) */}
          <g
            transform={`rotate(${leftArmRotate} 280 400)`}
            style={{transformOrigin: '280px 400px'}}
          >
            <rect
              x="190"
              y="390"
              width="90"
              height="40"
              fill="#3a2a1f"
              rx="20"
            />
            <ellipse cx="190" cy="410" rx="25" ry="30" fill="#f2ad68" />

            {/* Beer mug */}
            <g transform={`translate(0 ${mugY}) rotate(${mugRotate} 165 425)`}>
              <rect
                x="140"
                y="400"
                width="50"
                height="60"
                fill="#f2c15f"
                stroke="#8f5f18"
                strokeWidth="3"
                rx="8"
              />
              <ellipse
                cx="165"
                cy="405"
                rx="22"
                ry="8"
                fill="#f8de98"
                opacity={mugRaise > 0.5 ? 1 : 0.6}
              />
              <path
                d="M 190 415 Q 205 415 205 425 Q 205 435 190 435"
                fill="none"
                stroke="#8f5f18"
                strokeWidth="3"
              />
            </g>
          </g>

          {/* Right arm (gesturing) */}
          <g
            transform={`rotate(${rightArmRotate} 520 400)`}
            style={{transformOrigin: '520px 400px'}}
          >
            <rect
              x="520"
              y="390"
              width="90"
              height="40"
              fill="#3a2a1f"
              rx="20"
            />
            <ellipse cx="610" cy="410" rx="25" ry="30" fill="#f2ad68" />
          </g>

          {/* Pants */}
          <rect
            x="310"
            y="645"
            width="80"
            height="180"
            fill="#4a3428"
            rx="10"
          />
          <rect
            x="410"
            y="645"
            width="80"
            height="180"
            fill="#4a3428"
            rx="10"
          />

          {/* Shoes */}
          <ellipse cx="350" cy="825" rx="45" ry="25" fill="#2a1810" />
          <ellipse cx="450" cy="825" rx="45" ry="25" fill="#2a1810" />
        </svg>
      </div>

      {/* Shadow under professor */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '15%',
          width: '600px',
          height: '80px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%)',
          transform: `translateX(-50%) translateY(${professorY * 0.5}px)`,
          filter: 'blur(20px)',
          opacity: professorOpacity * 0.7,
        }}
      />

      {/* Lighting overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 50% 20%, rgba(255, 244, 215, 0.16), transparent 40%),
            linear-gradient(180deg, rgba(40, 24, 12, 0) 60%, rgba(40, 24, 12, 0.2) 100%)
          `,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
