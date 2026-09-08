import Link from "next/link";

export function BackLink({ href = "/", label = "Home" }: { href?: string; label?: string }) {
  return (
    <Link
      href={href}
      className="mb-10 inline-flex text-sm text-zinc-500 transition-colors hover:text-zinc-200"
    >
      ← {label}
    </Link>
  );
}
