import { Avatar } from './Avatar';
import React from 'react';

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={-2} />

      <group position={0}>
        <Avatar />
      </group>
    </>
  );
};
