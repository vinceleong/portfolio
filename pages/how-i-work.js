import { motion } from "framer-motion";

const points = [
  {
    number: "01",
    heading: "Understand the pain point.",
    body: "Before any code, I dig into what's actually slowing the business down. Not just the feature request, but the workflow behind it.",
  },
  {
    number: "02",
    heading: "Design for how the team actually operates.",
    body: "Systems only get used if they fit real workflows, so I build around how the business runs today, not an idealized version of it.",
  },
  {
    number: "03",
    heading: "Build and integrate.",
    body: "Full-stack web, mobile, or backend — whatever the problem calls for, with a focus on solutions that connect cleanly to tools the business already uses.",
  },
  {
    number: "04",
    heading: "Iterate with the business, not just the spec.",
    body: "Priorities shift once people see the system in action — I build in room for that instead of treating the first spec as final.",
  },
];

function Point({ number, heading, body, index }) {
  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.2,
      }}
    >
      <div className="text-sky-400 text-sm font-mono tracking-widest mb-2">
        {number}
      </div>
      <div className="text-2xl font-bold mb-3">{heading}</div>
      <div className="text-lg leading-relaxed text-white/70 max-w-xl">
        {body}
      </div>
    </motion.div>
  );
}

export default function HowIWork() {
  return (
    <div>
      <motion.div
        className="text-4xl pt-2 pb-2 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        How I Work
      </motion.div>
      <motion.div
        className="text-lg leading-relaxed text-white/50 mb-12 max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Software that works the way your business does.
      </motion.div>
      {points.map((point, i) => (
        <Point key={point.number} {...point} index={i} />
      ))}
    </div>
  );
}

HowIWork.theme = "dark";
