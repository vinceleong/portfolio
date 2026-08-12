import { useEffect, useId, useState } from "react";

function getMermaidSource(markdown) {
  return markdown
    .replace(/^```mermaid\s*/u, "")
    .replace(/\s*```$/u, "")
    .trim();
}

export default function MermaidDiagram({ title, description, markdown, isMermaidReady }) {
  const reactId = useId();
  const diagramId = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");
  const mermaidSource = getMermaidSource(markdown);

  useEffect(() => {
    if (!isMermaidReady || !window.mermaid) return;

    let isActive = true;
    const isDarkMode = document.documentElement.classList.contains("dark");

    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: isDarkMode ? "dark" : "default",
    });

    window.mermaid
      .render(diagramId, mermaidSource)
      .then(({ svg: renderedSvg }) => {
        if (!isActive) return;
        setSvg(renderedSvg);
        setError("");
      })
      .catch(() => {
        if (!isActive) return;
        setSvg("");
        setError("Unable to render diagram. Showing Mermaid source instead.");
      });

    return () => {
      isActive = false;
    };
  }, [diagramId, isMermaidReady, mermaidSource]);

  return (
    <div className="rounded-lg border border-black/10 p-5 dark:border-white/20">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 leading-relaxed opacity-75">{description}</p>
      <div className="mt-5 overflow-x-auto rounded-lg bg-black/5 p-4 dark:bg-white/5">
        {svg ? (
          <div
            className="min-w-[720px]"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <pre className="min-w-[720px] whitespace-pre-wrap text-sm leading-relaxed">
            <code>{error ? `${error}\n\n${markdown}` : markdown}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
