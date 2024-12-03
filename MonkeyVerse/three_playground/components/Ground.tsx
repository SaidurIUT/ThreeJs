

const Ground: React.FC = () => {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color={"#458740"} />
    </mesh>
  );
};

export default Ground;
