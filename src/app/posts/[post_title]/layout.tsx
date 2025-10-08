import { type Metadata } from "next";

interface PostLayoutProps {
  children: React.ReactNode;
  params: Promise<{ post_title: string }>;
}

export async function generateMetadata({
  params,
}: PostLayoutProps): Promise<Metadata> {
  const { post_title } = await params;

  // For now, we'll use basic metadata
  // In a production app, you might want to fetch post data here
  // or use a different approach for metadata generation

  return {
    title: `${post_title} | Carmichaelt Blog`,
    description: "Read the latest post on Carmichaelt Blog",
    openGraph: {
      title: `${post_title} | Carmichaelt Blog`,
      description: "Read the latest post on Carmichaelt Blog",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post_title} | Carmichaelt Blog`,
      description: "Read the latest post on Carmichaelt Blog",
    },
  };
}

export default async function PostLayout({ children }: PostLayoutProps) {
  return <>{children}</>;
}
