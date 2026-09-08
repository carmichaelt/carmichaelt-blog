import Link from "next/link";

const links = [
  { href: "/posts", label: "Writing" },
  { href: "/projects", label: "Projects" },
  { href: "/tech-stack", label: "Stack" },
  { href: "/things-i-believe", label: "Beliefs" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-md">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg tracking-tight text-zinc-100">
          Carmichael
          <span className="text-emerald-400 italic">t.</span>
        </Link>
        <ul className="flex items-center gap-4 text-sm text-zinc-400 sm:gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-zinc-100">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
