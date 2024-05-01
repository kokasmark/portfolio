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
    const intensity = 300; // Adjust intensity value as needed
    const position = [
      i % 2 === 0 ? 5 : -3,
      (parentState.scroll / 200) * 5 + (24 * (i+1)),
      3
    ];
    lights.push(
      <pointLight key={i} position={position} intensity={intensity} color={color} visible={parentState.cardsFlicker ? !parentState.flicker : true}/>
    );
  }
  return lights;
};

export default function ModelViewer(props) {
  const [rotY, setRotY] = useState(0);
  const isMouseDown = useRef(false);
  var direction = 1;

  useEffect(() => {
    const mouseScroll = (e) => {
      if(e.wheelDelta > 0)
        direction = 1
      else
        direction = -1
      setRotY((prevRotY) => prevRotY + ((e.wheelDelta / 120) * 0.2));
      props.parent.setScroll(((e.wheelDelta / 120) * 0.2));
    };
    window.addEventListener("mousewheel", mouseScroll);

    let touchstartX = 0
    let touchendX = 0
        
    function checkDirection() {
      if (touchendX < touchstartX) {props.parent.setScroll(-0.83); direction=-1;}
      if (touchendX > touchstartX) {props.parent.setScroll(0.83); direction=1;}
    }

    document.addEventListener('touchstart', e => {
      touchstartX = e.changedTouches[0].screenY
    })

    document.addEventListener('touchend', e => {
      touchendX = e.changedTouches[0].screenY
      checkDirection()
    })

    return () => {
      window.removeEventListener("mousewheel", mouseScroll);
      window.removeEventListener("touchstart", null);
      window.removeEventListener("touchend", null);
    };
  }, []);

  useEffect(() => {
    
      const intervalId = setInterval(() => {
        setRotY((prevRotY) => prevRotY + 0.01*direction);
      }, 16); // Run the interval approximately every 16 milliseconds (60fps)

      return () => clearInterval(intervalId); // Cleanup function
    
  }, []);
  
  return (
    <div className="Model">
      <Canvas style={{ width: "100vw", height: "100vh", backgroundColor: '#03090b' }}>
        <Suspense fallback={null}>
          <Me rotY={rotY} />
          {!props.parent.state.flicker && <pointLight position={[0,4-(props.parent.state.scroll / 200) * 5,5]} intensity={100} />}
          <ambientLight intensity={0.2} />
          {addLightsToScene(props.parent.state.cards.length, props.parent.state)}
        </Suspense>
      </Canvas>
    </div>
  );
}
