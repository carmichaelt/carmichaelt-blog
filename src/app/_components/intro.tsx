import { CMS_NAME } from "@/lib/constants";
import Link from "next/link";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
        Carmichaelt.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A partially pre-rendered blog using{" "}
        <Link
          href="https://nextjs.org/"
          className="underline hover:text-blue-600 duration-200 transition-colors"
        >
          Next.js
        </Link>{" "}
        and {CMS_NAME}.
      </h4>
    </section>
  );
}