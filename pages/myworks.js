import { motion } from "framer-motion";
import Image from "next/image";

function WorkListItem({ title, description, url, imagePath, index, alt, tags }) {

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
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="mb-6 p-0 md:p-3 md:pl-6 rounded-lg cursor-pointer flex flex-col items-start md:flex-row md:items-center md:justify-between md:hover:outline outline-2 outline-black dark:outline-white"
      variants={animationVariants}
      initial="initial"
      animate="enter"
      whileHover="hover"
      onClick={() => {
        if(!url) {
          alert("This is a private project and cannot be accessed publicly.");
          return;
        }

        window.open(url, "_blank");
      }}
    >
      <div>
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-md mt-2">{description}</div>
        {
          tags && <div className="flex gap-2 mt-2 mb-4 md:mb-0">
            {
              tags.map(tag => <Tag key={tag} text={tag} />)
            }
          </div>
        }
      </div>
      {
        imagePath && <div style={{ height: "160px", width: "260px", position: "relative", flexShrink: 0 }} className="mt-4 md:mt-0">
        <Image
          className="z-[1] rounded-lg"
          src={imagePath}
          alt={alt}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      }
    </motion.div>
  );
}

const Tag = ({ text }) => {
  return <span>#{text}</span>
}

export default function MyWork() {
  const workList = [
    {
      title: "Payout Control System",
      description: "A payment system that has an advanced approval layer between the payer and the payee. Demo accounts available.",
      url: "https://payment-control-system.vercel.app/",
      imagePath: "/images/works/payout-control-system.png",
      alt: "payout-control-system.png",
      tags: ["nextjs", "typescript", "postgresql","billplz"]
    },
    {
      title: "E-commerce Demo",
      description: "A mobile friendly demo e-commerce",
      url: "https://ecommerce-vincel.vercel.app/",
      imagePath: "/images/works/ecommerce.png",
      alt: "ecommerce.png",
      tags: ["nextjs", "typescript"]
    },
    {
      title: "Warehouse Management System",
      description: "A custom system featuring workflows from material receipt, processing, to sales. Includes stock tracking with printed QR, access control, master data, and operational reporting. ",
      url: "",
      imagePath: "",
      alt: "",
      tags: ["nextjs", "typescript", "postgresql"]
    },
    {
      title: "Qr Access Control System",
      description: "An access control system that allows entry to a door/barrier gate by scanning a QR code.",
      url: "",
      imagePath: "",
      alt: "",
      tags: ["nodejs", "rpi"]
    },
    {
      title: "Wame",
      description: "Open Whatsapp chat without adding contact",
      url: "https://wameapp.vercel.app/",
      imagePath: "/images/works/wame.png",
      alt: "wame.png",
      tags: ["nextjs"]
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
        className="pt-6 md:pl-6 rounded-lg text-xl font-light"
      >
        ... and more
      </motion.div>
    </div>
  );
}
