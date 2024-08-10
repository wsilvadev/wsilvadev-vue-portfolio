import { Canvas } from '@react-three/fiber';
import { Experience } from './Experience';
import './index.css';

function App(props) {
  console.log('p2', props)
  return (
    <div className="container">
      <Canvas className="canvas" camera={{ position: [0, -15, 0], fov: 20 }}>
        <Experience animation={props.animation} />
      </Canvas>
    </div>
  );
}

export default App;
