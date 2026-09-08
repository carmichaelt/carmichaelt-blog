import Link from "next/link";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mt-8 mb-4 text-3xl font-bold tracking-tight first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight">{children}</h3>
  ),
  p: ({ children }) => <p className="mb-4 leading-relaxed text-zinc-300">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-zinc-100">{children}</strong>,
  ul: ({ children }) => <ul className="mb-6 list-disc space-y-2 pl-5 text-zinc-300">{children}</ul>,
  ol: ({ children }) => (
    <ol className="mb-6 list-decimal space-y-2 pl-5 text-zinc-300">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ children, href }) => (
    <Link
      href={href ?? "#"}
      className="font-medium text-emerald-400 transition-colors hover:text-emerald-300"
    >
      {children}
    </Link>
  ),
  code: ({ children, className }) => {
    const isInline = !className;
    return isInline ? (
      <code className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-sm text-zinc-100">
        {children}
      </code>
    ) : (
      <code className={className}>{children}</code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-6 overflow-x-auto rounded-lg border border-white/10 bg-white/5 p-4 text-sm">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-emerald-400/70 pl-4 text-zinc-400 italic">
      {children}
    </blockquote>
  ),
};

export function Markdown({ content }: { content: string }) {
  return (
    <div className="markdown">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
