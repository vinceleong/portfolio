export default function Section({ title, body, index }) {
  return (
    <section className={`${index === 0 ? '' : 'border-t'} border-black/10 py-8 dark:border-white/20`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-lg leading-relaxed opacity-80">{body}</p>
    </section>
  );
}
