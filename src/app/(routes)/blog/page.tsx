// app/blog/page.tsx (Updated)
import {
  getAllBlogPosts,
  getUniqueCategories,
  getUniqueTags,
} from "@/lib/mdx-content";
import { BlogPageHeader } from "@/components/blog/BlogPageHeader";
import { BlogPageClient } from "@/components/blog/BlogPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, AI, and technology",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  // Extract unique categories and tags
  const categories = getUniqueCategories(posts);
  const tags = getUniqueTags(posts);

  return (
    <div className="min-h-screen">
      <BlogPageHeader />
      <BlogPageClient posts={posts} />
    </div>
  );
}
