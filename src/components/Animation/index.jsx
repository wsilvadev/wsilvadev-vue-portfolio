import { Canvas, useFrame } from '@react-three/fiber';
import { Experience } from './Experience';
import './index.css';
import { OrbitControls } from '@react-three/drei';
import { Physics, useBox } from '@react-three/cannon';



function App({animation}) {

  return (
    <div className="container">
      <Canvas className="canvas" camera={{ position: [0, -15, 0], fov: 20 }}>
          <Experience animation={animation} />
      </Canvas>
    </div>
  );
}

export default App;
