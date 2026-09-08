import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Tom Carmichael</p>
        <div className="flex gap-5">
          <Link
            href="https://github.com/carmichaelt"
            className="transition-colors hover:text-zinc-200"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/tomcarmichael"
            className="transition-colors hover:text-zinc-200"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
