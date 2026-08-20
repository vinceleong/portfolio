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
          height: "17px",
          width: "17px",
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
        <div className="pb-10">Need a system for your business?</div>
        <div>Reach out to me at&nbsp;</div>
        <div className="h-[5px] mt-5" />
        <div className="flex justify-center items-center gap-3">
          <div
            className="cursor-pointer underline"
            onClick={() => {
              window.location.href = "https://wa.me/601111931731";
            }}
          >
            +601111931731
          </div>
          <EmailActionButton
            icon="copy"
            action={() => {
              navigator.clipboard.writeText("+601111931731");
            }}
          />
        </div>
        <div className="my-2">or</div>
        <div className="flex justify-center items-center gap-3">
          <div
            className="cursor-pointer underline"
            onClick={() => {
              window.location.href = "mailto:leongchunyong@gmail.com";
            }}
          >
            leongchunyong@gmail.com
          </div>
          <EmailActionButton
            icon="copy"
            action={() => {
              navigator.clipboard.writeText("leongchunyong@gmail.com");
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
