import { motion } from "framer-motion";
import Image from "next/image";

function WorkListItem({
  title,
  description,
  url,
  caseStudyPath,
  imagePath,
  index,
  alt,
  tags,
}) {

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
        if (caseStudyPath) {
          window.location.href = caseStudyPath;
          return;
        }

        if(!url) {
          alert("This is a private project and cannot be accessed publicly.");
          return;
        }

        window.open(url, "_blank");
      }}
    >
      <div>
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-md mt-2 leading-relaxed">{description}</div>
        {
          tags && <div className="flex flex-wrap gap-2 mt-3 mb-4 md:mb-0 text-sm opacity-80">
            {
              tags.map(tag => <Tag key={tag} text={tag} />)
            }
          </div>
        }
        {caseStudyPath && (
          <div className="mt-4 font-semibold text-sky-600 dark:text-sky-300">
            View detail →
          </div>
        )}
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
      description: "A warehouse & production ERP for a materials recycling company — digitizing weighbridge intake, QR-labelled stock tracking, and dispatch, with approval workflows, RBAC, and full audit trails.",
      caseStudyPath: "/myworks/production-management-system",
      imagePath: "/images/works/production-management-system/add-material-receipt.png",
      alt: "Production Management System thumbnail",
      tags: ["nextjs", "typescript", "fluttermobile", "postgresql"]
    },
    {
      title: "Qr Access Control System",
      description: "An IoT access system for guarded communities that turns visitor and facility QR scans into verified gate access. It connects cloud visitor records, on-site QR readers, guard workflows, and relay hardware.",
      caseStudyPath: "/myworks/qr-access-control-system",
      imagePath: "/images/works/qr-access-control-system/thumbnail.png",
      alt: "QR Access Control System thumbnail",
      tags: ["nodejs", "iot", "rpi", "firestore"]
    },
    {
      title: "E-invoice integration for JaGaCount (Accounting SaaS)",
      description: "Built an e-invoice module for a property management accounting SaaS, enabling LHDN-compliant individual and consolidated submissions directly within the platform.",
      caseStudyPath: "/myworks/jagacount-einvoice",
      imagePath: "/images/works/jagacount/consolidated-invoice-dashboard.png",
      alt: "Jagacount e-invoice thumbnail",
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
