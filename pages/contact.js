import Icon from "components/Icon";
import { motion } from "framer-motion";

function EmailActionButton({ icon, action }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.9,
      }}
    >
      <Icon
        style={{
          height: "20px",
          width: "20px",
        }}
        className="cursor-pointer"
        onClick={action}
      >
        {icon}
      </Icon>
    </motion.div>
  );
}

export default function Contact() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <div className="flex flex-col justify-center items-center text-lg">
        <div>Email me @&nbsp;</div>
        <div className="h-[5px]" />
        <div className="cursor-pointer">leongchunyong@gmail.com</div>
        <div className="h-[25px]" />
        <div className="flex flex-row">
          <EmailActionButton
            icon="copy"
            action={() => {
              navigator.clipboard.writeText("leongchunyong@gmail.com");
            }}
          />
          <div className="w-[15px]" />
          <EmailActionButton
            icon="FiExternalLink"
            action={() => {
              window.location.href = "mailto:leongchunyong@gmail.com";
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
