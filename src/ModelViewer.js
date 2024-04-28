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

export default function ModelViewer() {
  const [rotY, setRotY] = useState(-0.8);
  const isMouseDown = useRef(false);

  useEffect(() => {
    const mouseDownHandler = () => {
      isMouseDown.current = true;
    };

    const mouseUpHandler = () => {
      isMouseDown.current = false;
      setRotY(-0.8);
    };

    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, []);

  useEffect(() => {
    if (!isMouseDown.current) {
      const intervalId = setInterval(() => {
        setRotY((prevRotY) => prevRotY + 0.01);
      }, 16); // Run the interval approximately every 16 milliseconds (60fps)

      return () => clearInterval(intervalId); // Cleanup function
    }
  }, [isMouseDown.current]);

  return (
    <div className="Model">
      <Canvas style={{ width: "100vw", height: "100vh", backgroundColor: 'black' }}>
        <Suspense fallback={null}>
          <Me rotY={rotY} />
          <OrbitControls enableZoom={false} enablePan={false} />
          <ambientLight intensity={1} />
          <directionalLight position={[0,5,5]} intensity={2} color={'blue'}></directionalLight>
          <directionalLight position={[0,5,-5]} intensity={2} color={'red'}></directionalLight>
          {/* <Environment background preset="sunset"></Environment> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
