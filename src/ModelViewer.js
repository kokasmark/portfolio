import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import { Suspense, useEffect, useRef, useState } from "react";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Me = ({ rotY }) => {
  const { camera } = useThree();
  camera.position.set(0, 0, 8);
  const materials = useLoader(MTLLoader, "me.mtl");
  const obj = useLoader(OBJLoader, "me.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  return <primitive object={obj} position={[0, -12, 0]} rotation={[0, rotY, 0]} scale={0.5} />;
};

const addLightsToScene = (numLights, parentState) => {
  const lights = [];
  for (let i = 0; i < numLights; i++) {
    const color = parentState.colors[i] || 0xffffff; // Default color if not provided
    const intensity = 200; // Adjust intensity value as needed
    const position = [
      i % 2 === 0 ? 5 : -5,
      (parentState.scroll / 200) * 5 + (22 * i),
      5
    ];
    lights.push(
      <pointLight key={i} position={position} intensity={intensity} color={color} />
    );
  }
  return lights;
};

export default function ModelViewer(props) {
  const [rotY, setRotY] = useState(-0.8);

  useEffect(() => {
    const mouseScroll = (e) => {
      setRotY((prevRotY) => prevRotY + ((e.wheelDelta / 120) * 0.1));
      props.parent.setScroll(((e.wheelDelta / 120) * 0.1));
    };
    window.addEventListener("mousewheel", mouseScroll);

    return () => {
      window.removeEventListener("mousewheel", mouseScroll);
    };
  }, []);

  return (
    <div className="Model">
      <Canvas style={{ width: "100vw", height: "100vh", backgroundColor: 'black' }}>
        <Suspense fallback={null}>
          <Me rotY={rotY} />
          {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
          <ambientLight intensity={0.2} />
          {addLightsToScene(props.parent.state.cards.length, props.parent.state)}
        </Suspense>
      </Canvas>
    </div>
  );
}
