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
      title: "Production Management System",
      description: "A manufacturing company was running production tracking on a legacy system that charged a monthly per-head fee and was riddled with bugs, making it difficult for staff to use effectively. They also looked to digitalize  more of their processes and documents. My team designed and built a web and mobile system covering the full workflow - material receipt, processing, stock management, sales, and delivery. With reporting, access control, master data management, and QR-based stock tracking. The inventory department now tracks stock  more efficiently, and information flows between departments in real time.",
      url: "",
      imagePath: "",
      alt: "",
      tags: ["nextjs", "typescript", "fluttermobile", "postgresql"]
    },
    {
      title: "Qr Access Control System",
      description: "As JaGaApp's client base grew, visitor check-ins at guarded entrances became a bottleneck - long queues, heavy reliance on security personnel. I designed and built a QR-based access control system from scratch, with custom hardware, firmware, and full integration with the JaGaApp VMS. Enabling visitor verification, two-layer approval via the Android app, and offline operation. The result: entry time dropped from 2 minutes to near-instant, and the guard headcount needed per site was reduced.",
      url: "",
      imagePath: "",
      alt: "",
      tags: ["nodejs", "iot", "rpi", "firestore"]
    },
    {
      title: "E-invoice integration for JaGaCount (Accounting Software)",
      description: "With LHDN's e-invoicing mandate requiring businesses to submit compliant e-invoices, JaGaCount needed a way for clients to meet the requirement without leaving the platform. I built and integrated an easy-to-use e-invoice module to   supporting  individual, batch, and consolidated submissions, with a submission tracker and an automatic retry-on-failure mechanism to handle failed transmissions. The module seamlessly integrates into the modules and now serves 20+ clients and has processed over 300,000 e-invoice submissions.",
      url: "",
      imagePath: "",
      alt: "",
      tags: ["nextjs", "nodejs", "firestore"]
    },
    {
      title: "Project Management System",
      description: "A Monday.com like project management system that allows users to create projects, tasks, and track progress. Features include kanban board, dynamic tables, charts that pull data from table inputs, and team collaboration tools.",
      url: "",
      imagePath: "/images/works/project-management-system.png",
      alt: "project-management-system.png",
      tags: ["nextjs", "typescript", "fluttermobile", "firestore"]
    },
    {
      title: "Payout Control System",
      description: "A payment system that has an advanced approval layer between the payer and the payee. Demo accounts available.",
      url: "https://payment-control-system.vercel.app/",
      imagePath: "/images/works/payout-control-system.png",
      alt: "payout-control-system.png",
      tags: ["nextjs", "typescript", "postgresql","billplz"]
    },
    {
      title: "Wame",
      description: "Tired of having to add someone to contact just to send them a WhatsApp message? Wame solves that problem.",
      url: "https://wameapp.vercel.app/",
      imagePath: "/images/works/wame.png",
      alt: "wame.png",
      tags: ["nextjs"]
    },
    {
      title: "E-commerce User Interface",
      description: "A mobile friendly e-commerce website that demonstrates great website user experience on mobile.",
      url: "https://ecommerce-vincel.vercel.app/",
      imagePath: "/images/works/ecommerce.png",
      alt: "ecommerce.png",
      tags: ["nextjs", "typescript"]
    },
  ];
  return (
    <div className="pb-6">
      {workList.map((work, index) => (
        <WorkListItem key={work.title} {...work} index={index} />
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
