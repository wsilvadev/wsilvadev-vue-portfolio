import {Avatar} from './Avatar';
import React from 'react';


export const Experience = ({animation}) => {
  return (
    <>
      <ambientLight intensity={-3} />

      <group position={0}>
        <Avatar animation={animation} />
      </group>
    </>
  );
};
