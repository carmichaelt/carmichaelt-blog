import Link from "next/link";

import { Container } from "@/components/site/container";
import { PostList } from "@/components/site/post-list";
import { TFlareHero } from "@/components/site/t-flare-hero";
import { getAllPosts, getAllProjects } from "@/lib/content";

export default function Home() {
  const posts = getAllPosts();
  const projects = getAllProjects();

  return (
    <>
      <section className="relative h-[calc(100dvh-3.5rem)] min-h-[28rem] w-full overflow-hidden">
        <TFlareHero />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/50" />
        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-10 sm:px-8 sm:pb-14">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm tracking-[0.2em] text-emerald-400 uppercase">Carmichaelt.</p>
            <h1 className="mt-3 max-w-xl text-4xl font-bold tracking-tight text-zinc-50 sm:text-6xl">
              Tom Carmichael
            </h1>
            <p className="mt-4 max-w-lg text-base text-zinc-400 sm:text-lg">
              Developer, founder, and technologist. I build AI-native products and write when
              something is worth pausing for.
            </p>
          </div>
        </div>
      </section>

      <Container className="py-20">
        <div className="space-y-6 text-base leading-relaxed text-zinc-300 sm:text-lg">
          <p>
            I currently work at{" "}
            <Link
              href="https://www.askvinny.com/"
              className="font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
            >
              Vinny
            </Link>{" "}
            building an AI property management teammate.
          </p>
          <p>I specialize in building AI agents, workflows, tools and evals.</p>
          <p>
            In December 2025 I founded{" "}
            <Link
              href="https://skydunes.dev"
              className="font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
            >
              SkyDunes
            </Link>
            , a software company building AI-native applications. There are{" "}
            <Link
              href="/projects"
              className="font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
            >
              {projects.length} projects
            </Link>{" "}
            here, including this site.
          </p>
          <p>
            Read{" "}
            <Link
              href="/posts"
              className="font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
            >
              my writing
            </Link>
            , browse{" "}
            <Link
              href="https://github.com/carmichaelt"
              className="font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
            >
              my code
            </Link>
            , or look at{" "}
            <Link
              href="/tech-stack"
              className="font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
            >
              the stack
            </Link>
            .
          </p>
          <p>
            If you want to chat over coffee, message me on{" "}
            <Link
              href="https://linkedin.com/in/tomcarmichael"
              className="font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
            >
              LinkedIn
            </Link>
            . You can also read{" "}
            <Link
              href="/things-i-believe"
              className="font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
            >
              things I believe
            </Link>
            .
          </p>
        </div>

        <section className="mt-20">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">Writing</h2>
            <Link
              href="/posts"
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
            >
              All posts
            </Link>
          </div>
          <PostList posts={posts} />
        </section>
      </Container>
    </>
  );
}
