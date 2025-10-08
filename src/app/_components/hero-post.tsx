import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import Link from "next/link";
import DateFormatter from "@/app/_components/date-formatter";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { PostBody } from "./post-body";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  search?: string;
  sortField?: "date" | "title";
  sortOrder?: "asc" | "desc";
  preview?: boolean;
  dateFrom?: string;
  dateTo?: string;
};

export async function HeroPost({
  search,
  sortField = "date",
  sortOrder = "desc",
  preview = false,
  dateFrom,
  dateTo,
}: Props) {
  // Use the simple query for server component
  const posts = await fetchQuery(api.posts.getPostsSimple, {
    search,
    sortField,
    sortOrder,
    limit: 1,
    preview,
    dateFrom,
    dateTo,
  });

  // Transform posts to match Post interface
  const transformedPosts = await Promise.all(
    posts?.map(async (post) => {
      const authorData = await fetchQuery(api.users.getUserById, {
        id: post.author as Id<"users">,
      });
      return {
        slug: post.slug,
        title: post.title,
        date: post.date,
        coverImage: post.coverImage,
        author: {
          name: authorData?.name ?? "",
          picture: authorData?.avatarUrl ?? "",
        },
        excerpt: post.excerpt,
        ogImage: {
          url: post.ogImage,
        },
        content: post.content,
        richContent: post.richContent,
        preview: post.preview,
      };
    }) ?? [],
  );

  const heroPost = transformedPosts?.[0];

  if (!heroPost) {
    return (
      <section>
        <div className="mb-8 md:mb-16">
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
          <div>
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8 md:mb-16">
      <Card className="overflow-hidden">
        <CardHeader className="space-y-6">
          <div className="flex items-start gap-4">
            <CoverImage
              title={heroPost.title}
              src={heroPost.coverImage}
              slug={heroPost.slug}
            />
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-2xl md:text-3xl leading-tight font-bold">
                  <Link
                    href={`/posts/${heroPost.slug}`}
                    className="hover:underline"
                  >
                    {heroPost.title}
                  </Link>
                </CardTitle>
                <div className="text-sm text-muted-foreground ml-4">
                  <DateFormatter dateString={heroPost.date} />
                </div>
              </div>
              <CardDescription className="text-base leading-relaxed text-muted-foreground">
                {heroPost.excerpt}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <PostBody
            content={heroPost.content}
            richContent={heroPost.richContent}
          />
          <div className="flex items-center gap-2">
            <Avatar
              name={heroPost.author.name}
              picture={heroPost.author.picture}
            />
          </div>
        </CardContent>
      </Card>
      {/*<div className="mb-8 md:mb-16 w-[500px]">
        <CoverImage 
          title={heroPost.title} 
          src={heroPost.coverImage} 
          slug={heroPost.slug} 
        />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={`/posts/${heroPost.slug}`} className="hover:underline">
              {heroPost.title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={heroPost.date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{heroPost.excerpt}</p>
          <Avatar 
            name={heroPost.author.name} 
            picture={heroPost.author.picture} 
          />
        </div>
      </div>*/}
    </section>
  );
}
