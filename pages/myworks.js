import { motion } from "framer-motion";
import useDarkMode from "hooks/useDarkMode";

function WorkListItem({ title, description, url, imagePath, index }) {
  const { isDarkMode } = useDarkMode();

  const animationVariants = {
    initial: {
      x: -200,
      opacity: 0,
    },
    enter: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.1 * index,
      },
    },
    hover: {
      scale: 1.1,
      borderWidth: 2,
      borderColor: isDarkMode ? "#FFFFFF" : "#000000",
      borderStyle: "solid",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="mb-6 p-3 pl-6 rounded-lg cursor-pointer flex flex-row items-center justify-between"
      variants={animationVariants}
      initial="initial"
      animate="enter"
      whileHover="hover"
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      <div className="">
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-md mt-2">{description}</div>
      </div>
      <div className="h-[160px]">
        <img
          className="z-[1] rounded-lg"
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
          }}
          src={imagePath}
          alt="wame.png"
        />
      </div>
    </motion.div>
  );
}

export default function MyWork() {
  const workList = [
    {
      title: "Wame",
      description: "Open Whatsapp Chat without Adding Contact",
      url: "https://wameapp.vercel.app/",
      imagePath: "/images/works/wame.png",
    },
  ];
  return (
    <div>
      {workList.map((work, index) => (
        <WorkListItem key={work.url} {...work} index={index} />
      ))}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: workList.length * 0.1 + 0.5,
          duration: 1,
        }}
        className="pt-6 pl-6 rounded-lg text-xl font-light"
      >
        More to come..
      </motion.div>
    </div>
  );
}
