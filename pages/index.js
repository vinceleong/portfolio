import { motion } from "framer-motion";
import { useEffect } from "react";
import * as THREE from "three";
import { getStars, animateStars } from "utils/animationUtils/stars";
import { getAstronaut, animateAstronaut } from "utils/animationUtils/astronaut";

export default function Home() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("bg"),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    renderer.render(scene, camera);

    const stars = getStars(100);
    stars.forEach((star) => scene.add(star));

    const astronaut = getAstronaut();
    scene.add(astronaut);

    function animate() {
      requestAnimationFrame(animate);

      animateStars(stars);
      animateAstronaut(astronaut);

      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return (
    <div>
      <canvas
        id="bg"
        style={{
          height: "100vh",
          width: "100vw",
          background: "black",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      ></canvas>
      <div className="flex">
        <motion.div
          className="text-4xl pt-2 pb-2  text-neutral-50"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
          }}
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {`Hi, I'm Vince.`}
        </motion.div>
      </div>
      <motion.div
        className="text-2xl pt-2 pb-2 text-neutral-50"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1,
          duration: 0.5,
        }}
      >
        {"I reside in Malaysia and making "}
        <span className="line-through">{"good"}</span>
        <span className="text-sky-400">{" GREAT"}</span>{" "}
        {" web apps is my passion."}
      </motion.div>
      <motion.div
        className="mt-36 ud mr-16 text-lg  text-neutral-50"
        initial={{
          y: 100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: 2,
          duration: 0.8,
        }}
      >
        {
          "I love creating solutions for problems. And being able to create beautiful solutions is what drives me. "
        }
      </motion.div>
    </div>
  );
}
