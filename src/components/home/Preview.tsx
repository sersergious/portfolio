// components/home/Preview.tsx
import { FadeInWhenVisible } from '@/components/transitions';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  FileText,
  Mail,
  MessageCircle,
  Code,
  Brain,
  Monitor,
} from 'lucide-react';
import { ResearchCard } from '@/components/research/ResearchCard';
import { BlogCard } from '@/components/blog/BlogCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import type { Project, BlogPost, ResearchPaper } from '@/lib/mdx-content';

interface PreviewProps {
  projects: Project[];
  blogPosts: BlogPost[];
  research: ResearchPaper[];
}

export function Preview({ projects, blogPosts, research }: PreviewProps) {
  // Get latest items instead of featured
  const latestProjects = projects.slice(0, 3);
  const latestBlogPosts = blogPosts.slice(0, 2);
  const latestResearch = research.slice(0, 2);

  return (
    <div>
      {/* Latest Projects Section */}
      {latestProjects.length > 0 && (
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Code className="w-6 h-6 text-violet-500" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Latest Projects
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Showcasing innovative solutions and cutting-edge development
                work
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {latestProjects.map(project => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group transition-colors"
              >
                View all projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Building the Future
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I specialize in creating innovative solutions that bridge the
                  gap between theoretical research and practical applications.
                  My work spans across multiple domains, from cutting-edge web
                  development to advanced research projects.
                </p>
                <p>
                  With expertise in modern technologies, I'm passionate about
                  pushing the boundaries of what's possible and sharing
                  knowledge with the community.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="btn-primary group inline-flex items-center gap-2 w-fit"
                >
                  Learn more about me
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              {/* What I Do Cards - with flexbox for equal heights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card-flat rounded-2xl p-6 bg-card shadow-sm h-full flex flex-col">
                  <Code className="w-8 h-8 mx-auto mb-3 text-primary flex-shrink-0" />
                  <div className="text-lg font-semibold mb-1 text-center">
                    Web Development
                  </div>
                  <div className="text-sm text-muted-foreground text-center mt-auto">
                    Full-stack applications with modern frameworks.
                  </div>
                </div>

                <div className="card-flat rounded-2xl p-6 bg-card shadow-sm h-full flex flex-col">
                  <Brain className="w-8 h-8 mx-auto mb-3 text-accent flex-shrink-0" />
                  <div className="text-lg font-semibold mb-1 text-center">
                    AI & Machine Learning
                  </div>
                  <div className="text-sm text-muted-foreground text-center mt-auto">
                    Applied AI solutions and research-driven models.
                  </div>
                </div>

                <div className="card-flat rounded-2xl p-6 bg-card shadow-sm h-full flex flex-col">
                  <Monitor className="w-8 h-8 mx-auto mb-3 text-primary flex-shrink-0" />
                  <div className="text-lg font-semibold mb-1 text-center">
                    Desktop Applications
                  </div>
                  <div className="text-sm text-muted-foreground text-center mt-auto">
                    Cross-platform software with native-like performance.
                  </div>
                </div>

                <div className="card-flat rounded-2xl p-6 bg-card shadow-sm h-full flex flex-col">
                  <FileText className="w-8 h-8 mx-auto mb-3 text-accent flex-shrink-0" />
                  <div className="text-lg font-semibold mb-1 text-center">
                    Research & Writing
                  </div>
                  <div className="text-sm text-muted-foreground text-center mt-auto">
                    Academic publications and technical documentation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Blog Preview */}
      <FadeInWhenVisible direction="up">
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            {/* Centered header and text */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                My Recent Publications
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Check out my recent research work and my personal blog
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Research Preview */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold">Recent Research</h3>
                </div>
                {latestResearch.length > 0 ? (
                  <div>
                    <div className="space-y-6">
                      {latestResearch.map(paper => (
                        <div key={paper.slug} className="h-full">
                          <ResearchCard paper={paper} />
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                      <Link
                        href="/research"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group transition-colors"
                      >
                        View all research
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg p-8 text-center">
                    <BookOpen className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-muted-foreground mb-2">
                      Publications Coming Soon
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Research publications will be available here shortly.
                    </p>
                  </div>
                )}
              </div>

              {/* Blog Preview */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <FileText className="w-6 h-6 text-accent" />
                  <h3 className="text-2xl font-bold">Recent Blog Posts</h3>
                </div>
                {latestBlogPosts.length > 0 ? (
                  <>
                    <div className="space-y-6">
                      {latestBlogPosts.map(post => (
                        <div key={post.slug} className="h-full">
                          <BlogCard post={post} />
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                      <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium group transition-colors"
                      >
                        Read all posts
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="bg-card border border-border rounded-lg p-8 text-center">
                    <FileText className="w-12 h-12 text-accent/30 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-muted-foreground mb-2">
                      Blogs Coming Soon
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Blog posts and articles will be available here shortly.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Collaborate?
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              I'm always interested in discussing new opportunities, innovative
              projects, or just having a conversation about technology and
              research.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary group inline-flex items-center gap-2 px-6 py-3"
              >
                <Mail className="w-5 h-5" />
                Get In Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/*AI Assistant coming soon*/}
              <div
                className="btn-secondary inline-flex items-center gap-2 px-6 py-3 opacity-50 cursor-not-allowed select-none"
                title="AI Assistant Coming Soon"
              >
                <MessageCircle className="w-5 h-5" />
                AI Assistant Coming Soon
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
