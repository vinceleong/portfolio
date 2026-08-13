export default function Highlight({ title, text, icon: Icon }) {
  return (
    <div className="rounded-lg border border-black/10 p-5 dark:border-white/20">
      <Icon className="mb-4 text-sky-500" size={24} />
      <div className="font-bold">{title}</div>
      <p className="mt-2 leading-relaxed opacity-75 break-words">{text}</p>
    </div>
  );
}
