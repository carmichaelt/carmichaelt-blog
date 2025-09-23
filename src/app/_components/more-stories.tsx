import { PostPreview } from "@/app/_components/post-preview";
import { api } from "../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Id } from "../../../convex/_generated/dataModel";

type Props = {
  search?: string;
  sortField?: "date" | "title";
  sortOrder?: "asc" | "desc";
  limit?: number;
  author?: Id<"authors">;
  preview?: boolean;
  dateFrom?: string;
  dateTo?: string;
};

export async function MoreStories({ 
  search,
  sortField = "date",
  sortOrder = "desc",
  limit = 10,
  author,
  preview = false,
  dateFrom,
  dateTo,
}: Props) {
  // Use the simple query for server component
  const posts = await fetchQuery(api.posts.getPostsSimple, {
    search,
    sortField,
    sortOrder,
    limit,
    author,
    preview,
    dateFrom,
    dateTo,
  });

  // Transform posts to include author data
  const transformedPosts = await Promise.all(
    posts?.map(async (post) => {
      const authorData = await fetchQuery(api.authors.getAuthorById, { 
        id: post.author as Id<"authors"> 
      });
      return {
        ...post,
        author: {
          _id: post.author,
          name: authorData?.name ?? "",
          avatar: authorData?.avatar ?? "",
          picture: authorData?.avatar ?? ""
        }
      };
    }) ?? []
  );

  if (!transformedPosts || transformedPosts.length === 0) {
    return (
      <section>
        <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
          More Stories
        </h2>
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No posts found matching your criteria.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {transformedPosts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}