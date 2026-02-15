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

const talkCycle = 14;

export const SceneEgyptProfessor: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cameraScale = interpolate(frame, [0, 300], [1, 1.08], {
    extrapolateRight: 'clamp',
  });

  const cameraX = interpolate(frame, [0, 300], [0, -35], {
    extrapolateRight: 'clamp',
  });

  const professorY = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 120,
      mass: 0.7,
    },
  });

  const bobbing = Math.sin(frame / 12) * 3;
  const enterY = interpolate(professorY, [0, 1], [60, 0]);

  const mouthOpen = interpolate(frame % talkCycle, [0, talkCycle / 2, talkCycle], [0.2, 1, 0.25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${cameraScale}) translate(${cameraX}px, 0px)`,
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
          left: '8%',
          bottom: '-4%',
          width: 760,
          transform: `translateY(${enterY + bobbing}px)`,
        }}
      >
        <Img src={staticFile('assets/characters/professor-pint.svg')} style={{width: '100%'}} />

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
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: 86,
              height: 22,
              borderRadius: 999,
              background: '#5b250d',
              transform: `scaleY(${mouthOpen})`,
              transformOrigin: 'center',
              boxShadow: 'inset 0 -2px 0 rgba(255,255,255,0.35)',
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
