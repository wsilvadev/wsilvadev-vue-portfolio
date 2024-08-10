import { Avatar } from './Avatar';
import React from 'react';

export const Experience = (props) => {
  return (
    <>
      <ambientLight intensity={-2} />

      <group position={0}>
        <Avatar animation={props.animation} />
      </group>
    </>
  );
};
