import React from 'react';
import {Composition, Sequence} from 'remotion';
import {SceneEgyptProfessor} from './scenes/SceneEgyptProfessor';

const FPS = 30;
const SCENE_DURATION = FPS * 10;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SceneEgyptProfessor"
        component={SceneEgyptProfessor}
        durationInFrames={SCENE_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />

      <Composition
        id="HistoryOfMoneyPrototype"
        durationInFrames={SCENE_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
        component={() => (
          <Sequence from={0} durationInFrames={SCENE_DURATION}>
            <SceneEgyptProfessor />
          </Sequence>
        )}
      />
    </>
  );
};
