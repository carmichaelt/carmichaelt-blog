import { type Metadata } from "next";

interface PostLayoutProps {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  // For now, we'll use basic metadata
  // In a production app, you might want to fetch post data here
  // or use a different approach for metadata generation

  return {
    title: `Carmichaelt Blog`,
    description: "Read the latest post on Carmichaelt Blog",
    openGraph: {
      title: `Carmichaelt Blog`,
      description: "Read the latest post on Carmichaelt Blog",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Carmichaelt Blog`,
      description: "Read the latest post on Carmichaelt Blog",
    },
  };
}

export default async function PostLayout({ children }: PostLayoutProps) {
  /*return <div className="[--header-height:calc(--spacing(14))]">
  
    <div className="flex flex-1">
      <ControlsSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 p-4">
              {children}
          </div>
        </div>
      </SidebarInset>
    </div>
    
</div>;*/
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2 p-4">
        {children}
      </div>
    </div>
  );
}
