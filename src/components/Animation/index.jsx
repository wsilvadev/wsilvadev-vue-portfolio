import { Canvas } from '@react-three/fiber';
import { Experience } from './Experience';
import './index.css';

function App() {
  return (
    <div className="container">
      <Canvas className="canvas" camera={{ position: [0, -15, 0], fov: 20 }}>
        <Experience />
      </Canvas>
    </div>
  );
}

export default App;
