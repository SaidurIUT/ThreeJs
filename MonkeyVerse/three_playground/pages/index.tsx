import { NextPage } from "next";
import { Canvas, useThree } from "@react-three/fiber";
import AnimatedBox from "../components/AnimatedBox";
import { OrbitControls, Stats } from "@react-three/drei";

const Home: NextPage = () => {
  const testing = true;
  return (
    <div className="container">
      <Canvas
        gl={{
          antialias: true, // Optional: Enables smoother rendering
        }}
        style={{
          background: testing ? "darkgray" : "black", // Change the color dynamically
        }}
      >
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[5]} /> : null}
        {testing ? <gridHelper args={[10, 10]} /> : null}
        <OrbitControls />
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} />
        <AnimatedBox isTesting={testing} />
      </Canvas>
    </div>
  );
};

export default Home;
