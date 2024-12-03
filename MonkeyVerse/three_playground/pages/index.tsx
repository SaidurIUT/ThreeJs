import { NextPage } from "next";
import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Stats,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import Lights from "../components/Lights";
import Ground from "../components/Ground";
import PinkTreeModel from "../components/pinkTree";
import * as THREE from "three";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const MyPlayer = () => {
  const model = useGLTF("./modles/player.glb");
  const { actions } = useAnimations(model.animations, model.scene);

  console.log(model);
  console.log("the model is: ", model.scene);

  model.scene.scale.set(2, 2, 2);
  model.scene.position.set(0, 0, 0);


  model.scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  useEffect(() => {
    actions?.walk?.play();
  }, []);

  return <primitive object={model.scene} />;
};

const Home: NextPage = () => {
  const testing = true;
  return (
    <div className="container">
      <Canvas
        shadows // Enables shadow projection on mesh components
        gl={{
          antialias: true, // Optional: Enables smoother rendering
        }}
        camera={{ position: [0, 100, 100] }}
        style={{
          background: testing ? "darkgray" : "black", // Change the color dynamically
        }}
      >
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[5]} /> : null}
        {testing ? <gridHelper args={[10, 10]} /> : null}
        <OrbitControls />
        <Lights />
        <MyPlayer />
        <Ground />
        <PinkTreeModel boundery={900} count={400} />
      </Canvas>
    </div>
  );
};

export default Home;
