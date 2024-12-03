import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { useEffect } from "react";

type treeType = {
  position: { x: number; z: number };
  box: number;
};
type props = {
  boundery: number;
  count: number;
};

const PinkTreeModel: React.FC<props> = ({ boundery, count }) => {
  const model = useLoader(GLTFLoader, "./modles/pinkTree.glb");
  const [trees, setTrees] = React.useState<treeType[]>([]);

  model.scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  const newPosition = (box: number, boundery: number) => {
    return (
      boundery / 2 -
      box / 2 -
      (boundery - box) * (Math.round(Math.random() * 100) / 100)
    );
  };

  const updatePosition = (treeArray: treeType[], boundery: number) => {
    treeArray.forEach((tree) => {
      tree.position.x = newPosition(tree.box, boundery);
      tree.position.z = newPosition(tree.box, boundery);
    });
    setTrees(treeArray);
  };

  useEffect(() => {
    const tempTrees: treeType[] = [];
    for (let i = 0; i < count; i++) {
      tempTrees.push({
        position: { x: 0, z: 0 },
        box: 1,
      });
    }
    updatePosition(tempTrees, boundery);
  }, []); // Add an empty dependency array to run only once

  return (
    <group rotation={[0, 0, 0]}>
      {trees.map((tree, index) => (
        <object3D key={index} position={[tree.position.x, 0, tree.position.z]}>
          <primitive object={model.scene.clone()} />
        </object3D>
      ))}
    </group>
  );
};

export default PinkTreeModel;
