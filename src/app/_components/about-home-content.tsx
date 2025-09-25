import Link from "next/link";

export function AboutHomeContent() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Tom Carmichael</h1>
      <p className="text-gray-600">
        I&apos;m a developer and technologist who currently works at <Link href="https://www.paconsulting.com/" className="font-bold text-purple-500">PA Consulting</Link> advising enterpises how to leverage Web Development, AI, Cloud Architecture, and Engineering.
        <br />
        <br />
        As well as consulting clients, I lead the development of an AI-powered Conversational Training Platform called Kaiwa,
        built using Next.js and Vercel. 
        <br />
        <br />
        I also spend my own time building <Link href="/projects" className="font-bold text-purple-500">my projects</Link> using technologies and concepts that interest me, like this website and blog.    
        <br />
        <br />
        You can read <Link href="/posts" className="font-bold text-purple-500">my ramblings</Link> or browse <Link href="https://github.com/carmichaelt" className="font-bold text-purple-500">my code.</Link>
        If you&apos;re interested in how I build my projects, you can check out <Link href="/tech-stack" className="font-bold text-purple-500">my tech stack</Link>. 
        <br />
         If you want to chat over coffee, you can message me on <Link href="https://linkedin.com/in/tomcarmichael" className="font-bold text-purple-500">my LinkedIn</Link>.
      </p>
    </div>
  );
}
