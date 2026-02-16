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
import {Professor} from './Professor';

export const SceneEgyptProfessor: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Camera animation
  const cameraScale = interpolate(frame, [0, 150, 300], [1, 1.08, 1.05], {
    extrapolateRight: 'clamp',
  });

  // Entrance animation
  const entranceProgress = spring({
    frame,
    fps,
    config: {damping: 200, stiffness: 120, mass: 0.7},
  });
  const professorY = interpolate(entranceProgress, [0, 1], [100, 0]);

  // Idle animations
  const floatY = Math.sin(frame / 12) * 4;
  
  // Eye blink
  const blinkCycle = frame % 90;
  const eyeScaleY = blinkCycle < 4 ? interpolate(blinkCycle, [0, 2, 4], [1, 0.1, 1]) : 1;

  // Mouth talking
  const mouthOpen = interpolate(frame % 14, [0, 7, 14], [0.25, 1, 0.25]);

  // Head rotation
  const headRotation = interpolate(Math.sin(frame / 30), [-1, 1], [-2, 2]);

  // Arm gestures
  const leftArmRotate = interpolate(Math.sin((frame % 120) / 120 * Math.PI * 2), [-1, 1], [-8, 8]);

  return (
    <AbsoluteFill style={{backgroundColor: '#2a1810'}}>
      {/* Background */}
      <div style={{position: 'absolute', inset: 0, transform: `scale(${cameraScale})`}}>
        <Img
          src={staticFile('pyramid-background.jpg')}
          style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)'}}
        />
      </div>

      {/* Professor */}
      <div style={{position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%, -50%)`}}>
        <Professor
          y={professorY + floatY}
          eyeScaleY={eyeScaleY}
          mouthOpen={mouthOpen}
          headRotation={headRotation}
          leftShoulderRotation={leftArmRotate}
          scale={0.5}
        />
      </div>
    </AbsoluteFill>
  );
};
