import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { DirectionalLightHelper } from "three";

const Lights: React.FC = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  useHelper(lightRef, DirectionalLightHelper, 5, "red");

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        ref={lightRef}
        position={[0, 200, 200]}
        intensity={1}
        castShadow
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        shadow-camera-left={-950}
        shadow-camera-right={950}
        shadow-camera-top={950}
        shadow-camera-bottom={-950}
      />

      <hemisphereLight args={["#7cdbe6", "#5e9c49", 0.7]} />
    </>
  );
};

export default Lights;
