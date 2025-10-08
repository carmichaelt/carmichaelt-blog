import Link from "next/link";
import { api } from "../../../convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { ProjectCount } from "./project-count";
import { PostCount } from "./post-count";

export async function AboutHomeContent() {
  const projects = await preloadQuery(api.projects.getAllProjects);
  const posts = await preloadQuery(api.posts.getAllPosts);
  return (
    <div className="space-y-6 sm:space-y-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
        Tom Carmichael
      </h1>
      <div className="text-sm sm:text-base lg:text-lg text-gray-600 space-y-4 sm:space-y-6">
        <p>
          I&apos;m a developer and technologist who currently works at{" "}
          <Link
            href="https://www.paconsulting.com/"
            className="font-bold text-purple-500 hover:text-purple-600 transition-colors"
          >
            PA Consulting
          </Link>{" "}
          advising enterprises how to leverage Web Development, AI, Cloud
          Architecture, and Engineering.
        </p>

        <p>
          As well as consulting clients, I lead the development of an AI-powered
          Conversational Training Platform called Kaiwa, built using Next.js and
          Vercel.
        </p>

        <p>
          I also spend my own time building{" "}
          <Link
            href="/projects"
            className="font-bold text-purple-500 hover:text-purple-600 transition-colors"
          >
            my{" "}
            <span className="font-bold text-purple-500 hover:text-purple-600 transition-colors">
              <ProjectCount preloadedProjects={projects} />
            </span>{" "}
            projects
          </Link>{" "}
          using technologies and concepts that interest me, like this website
          and blog.
        </p>

        <p>
          You can read{" "}
          <Link
            href="/posts"
            className="font-bold text-purple-500 hover:text-purple-600 transition-colors"
          >
            my <PostCount preloadedPosts={posts} /> ramblings
          </Link>{" "}
          or browse{" "}
          <Link
            href="https://github.com/carmichaelt"
            className="font-bold text-purple-500 hover:text-purple-600 transition-colors"
          >
            my code
          </Link>
          . If you&apos;re interested in how I build my projects, you can check
          out{" "}
          <Link
            href="/tech-stack"
            className="font-bold text-purple-500 hover:text-purple-600 transition-colors"
          >
            my tech stack
          </Link>
          .
        </p>

        <p>
          If you want to chat over coffee, you can message me on{" "}
          <Link
            href="https://linkedin.com/in/tomcarmichael"
            className="font-bold text-purple-500 hover:text-purple-600 transition-colors"
          >
            my LinkedIn
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
