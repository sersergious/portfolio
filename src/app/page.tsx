// app/page.tsx - Portfolio Homepage
import { Hero } from '@/components/home/Hero';
import { Preview } from '@/components/home/Preview';
import {
  getAllProjects,
  getAllBlogPosts,
  getAllResearch,
} from '@/lib/mdx-content';

export default async function HomePage() {
  // Fetch data in the page component (server component)
  const [projects, blogPosts, research] = await Promise.all([
    getAllProjects(),
    getAllBlogPosts(),
    getAllResearch(),
  ]);

  return (
    <main className="flex-1">
      <Hero />
      <Preview projects={projects} blogPosts={blogPosts} research={research} />
    </main>
  );
}
