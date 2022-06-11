import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";

export default function Home() {
  const string =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac feugiat enim. Pellentesque enim risus, varius eget interdum id, mollis ut dolor. Morbi id neque ut nibh efficitur lobortis a vel libero. Praesent est dui, commodo at arcu vel, maximus faucibus purus. Nullam nec vestibulum justo. Donec dignissim pharetra ex, nec facilisis turpis malesuada vitae. Nulla facilisi. Mauris ut metus fermentum, pretium mi id, malesuada leo. Sed posuere nunc nec risus mollis ultricies. Donec in felis vel erat porttitor vulputate. Vivamus faucibus ex maximus est convallis egestas. Sed id pretium ante, eget volutpat magna. Nunc eu viverra mauris. Duis vestibulum nulla mauris, ac lobortis neque tempus in. Donec cursus est sit amet justo imperdiet rhoncus. Phasellus efficitur posuere viverra. Nulla facilisi. Fusce sagittis ipsum vitae ex auctor, ut congue orci sagittis. Duis eget lorem vulputate, vulputate arcu quis, bibendum metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vulputate pellentesque suscipit. Sed nec vestibulum orci, quis scelerisque nunc. Sed massa risus, luctus non sodales eu, congue non eros.Pellentesque condimentum ligula vitae mi dapibus mattis. Sed quis congue turpis, ac vestibulum odio. Aenean eu imperdiet tortor, eget sagittis urna. Suspendisse at euismod arcu, sed gravida leo. In vitae risus in sapien dignissim aliquam. Maecenas non placerat quam, vitae pretium purus. Mauris rutrum lacinia erat vehicula blandit. Morbi consequat laoreet metus lacinia faucibus. Duis consequat libero cursus, tempus quam ut, dapibus tortor. Nunc bibendum ex id turpis suscipit, pellentesque consectetur dolor imperdiet. Sed non magna malesuada, efficitur erat congue, cursus erat. Proin id mattis nisl. Mauris eu tincidunt turpis. Nullam ut dapibus lorem.Nullam ut ullamcorper est, non accumsan enim. Mauris scelerisque lectus a varius iaculis. Aliquam iaculis diam eleifend purus dapibus aliquam. Sed lacinia scelerisque tortor non consectetur. Proin interdum nibh sed dui varius, nec maximus mi suscipit. Vivamus id ante metus. Pellentesque sed mattis metus, id rhoncus quam. Sed pretium elit vel faucibus cursus. Sed vulputate feugiat lectus, vitae semper enim rutrum a. Integer efficitur eu velit ut sodales. Fusce eros orci, consectetur non lacus vitae, vulputate condimentum tortor. Quisque sem dolor, efficitur vitae vehicula nec, euismod eu enim.Sed placerat placerat ipsum in euismod. Nullam eget dolor libero. Duis cursus non turpis tristique accumsan. Donec tincidunt est a ligula hendrerit vestibulum. Vestibulum aliquet sed est et consequat. Phasellus vitae purus dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Maecenas non rhoncus ex, et tristique nulla. Duis sagittis dolor lacus, vel efficitur sem ornare vel. Nullam sem nunc, pharetra sed libero et, ultrices elementum dui. Etiam vehicula enim id lacus finibus, ac tincidunt eros pellentesque.";

  return (
    <div>
      <div className="flex">
        <motion.div
          className="text-4xl pt-2 pb-2"
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
        className="text-2xl pt-2 pb-2 "
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
        className="mt-36 ud mr-16 text-lg"
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
          "I love creating solutions for problems. And being able to create beautiful solutions is what drives me."
        }
      </motion.div>
    </div>
  );
}
