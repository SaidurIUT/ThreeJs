import * as THREE from "three";
import React, { useRef } from "react";
import { useState } from "react";

import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Cylinder: THREE.Mesh;
    Icosphere: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

export function PinkTreeModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./modles/pinkTree.glb") as GLTFResult;
  const [color, setColor] = useState("red");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials["Material.002"]}
      />
      <mesh
        // onClick={() => setColor("green")}
        castShadow
        receiveShadow
        geometry={nodes.Icosphere.geometry}
        material={materials["Material.001"]}
        material-color={color}
        position={[3.505, 13.676, -1.173]}
        scale={4.968}
      />
    </group>
  );
}

useGLTF.preload("./modles/pinkTree.glb");
