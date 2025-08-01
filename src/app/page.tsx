// app/page.tsx - Portfolio Homepage
import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Mail, FileText, Code, BookOpen, MessageCircle, Star, Calendar, ExternalLink } from 'lucide-react'
import { StaggerContainer } from '@/components/transitions/StaggerContainer'
import { StaggerItem } from "@/components/transitions/StaggerItem";
import { FadeInWhenVisible } from '@/components/transitions/FadeInWhenVisible'
import { TypewriterText} from "@/components/transitions/TypewriterText";
import { ScaleOnHover } from '@/components/transitions/ScaleOnHover'
import { getAllProjects, getAllBlogPosts, getAllResearch } from '@/lib/content'
import { ProjectCard } from '@/components/content/ProjectCard'
import { BlogCard } from '@/components/content/BlogCard'
import { ResearchCard } from '@/components/content/ResearchCard'
import {Button} from "@/components/ui/button"

export const metadata = {
  title: 'SerSergious - Research. Develop. Innovate.',
  description: 'Portfolio showcasing cutting-edge research, innovative development projects, and insights into the intersection of technology and science.',
}

const socials = [
  { href: 'https://github.com/sersergious', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/sersergious-dev', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:hello@sersergious.dev', icon: Mail, label: 'Email' },
]

export default async function HomePage() {
  // Fetch content
  const [projects, blogPosts, research] = await Promise.all([
    getAllProjects(),
    getAllBlogPosts(),
    getAllResearch()
  ])

  const featuredProjects = projects.filter(p => p.meta.featured).slice(0, 3)
  const featuredBlogPosts = blogPosts.filter(p => p.meta.featured).slice(0, 2)
  const featuredResearch = research.filter(p => p.meta.featured).slice(0, 2)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <StaggerContainer className="text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <StaggerItem>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="block">
                  <TypewriterText
                    text="Research."
                    speed={120}
                    delay={0}
                    className="text-primary"
                  />
                </span>
                <span className="block">
                  <TypewriterText
                    text="Develop."
                    speed={120}
                    delay={1.2}
                    className="text-accent"
                  />
                </span>
                <span className="block">
                  <TypewriterText
                    text="Innovate."
                    speed={120}
                    delay={2.4}
                    className="gradient-text"
                  />
                </span>
              </h1>
            </StaggerItem>

            {/* Subtitle */}
            <StaggerItem delay={0.3}>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
                I'm a researcher and developer passionate about creating innovative solutions
                at the intersection of <span className="text-primary font-semibold">technology</span> and <span className="text-accent font-semibold">science</span>.
              </p>
            </StaggerItem>

            {/* CTA Buttons */}
            <StaggerItem delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <ScaleOnHover>
                  <Link
                    href="/projects"
                    className="btn-primary group flex items-center gap-2 px-6 py-3"
                  >
                    <Code className="w-5 h-5" />
                    View Projects
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </ScaleOnHover>

                <ScaleOnHover>
                  <Link
                    href="/chat"
                    className="btn-secondary group flex items-center gap-2 px-6 py-3"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat with AI Assistant
                  </Link>
                </ScaleOnHover>
              </div>
            </StaggerItem>

            {/* Social Links */}
            <StaggerItem delay={0.9}>
              <div className="flex justify-center gap-4">
                {socials.map((social) => (
                  <ScaleOnHover key={social.label}>
                    <Link href={social.href} target="_blank" rel="noopener noreferrer">
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="w-11 h-11 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <span>
                          <social.icon className="w-5 h-5" />
                          <span className="sr-only">{social.label}</span>
                        </span>
                      </Button>
                    </Link>
                  </ScaleOnHover>
                ))}
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <FadeInWhenVisible direction="up" delay={0.2}>
          <section className="py-20 bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Showcasing innovative solutions and cutting-edge development work
                </p>
              </div>

              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {featuredProjects.map((project, index) => (
                  <StaggerItem key={project.slug} delay={index * 0.1}>
                    <ScaleOnHover scale={1.02}>
                      <ProjectCard project={project} variant="featured" />
                    </ScaleOnHover>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <div className="text-center">
                <ScaleOnHover>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group"
                  >
                    View all projects
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </ScaleOnHover>
              </div>
            </div>
          </section>
        </FadeInWhenVisible>
      )}

      {/* About Preview Section */}
      <FadeInWhenVisible direction="up" delay={0.3}>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Building the Future Through Code
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    I specialize in creating innovative solutions that bridge the gap between
                    theoretical research and practical applications. My work spans across
                    multiple domains, from cutting-edge web development to advanced research projects.
                  </p>
                  <p>
                    With expertise in modern technologies like Next.js, TypeScript, and AI/ML,
                    I'm passionate about pushing the boundaries of what's possible and sharing
                    knowledge with the community.
                  </p>
                </div>
                <div className="mt-8">
                  <ScaleOnHover>
                    <Link
                      href="/about"
                      className="btn-primary group flex items-center gap-2 w-fit"
                    >
                      Learn more about me
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </ScaleOnHover>
                </div>
              </div>

              <div className="space-y-6">
                {/* Stats Cards */}
                <StaggerContainer className="grid grid-cols-2 gap-4">
                  <StaggerItem>
                    <div className="card-flat p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2">{projects.length}+</div>
                      <div className="text-sm text-muted-foreground">Projects</div>
                    </div>
                  </StaggerItem>
                  <StaggerItem delay={0.1}>
                    <div className="card-flat p-6 text-center">
                      <div className="text-2xl font-bold text-accent mb-2">{research.length}+</div>
                      <div className="text-sm text-muted-foreground">Research Papers</div>
                    </div>
                  </StaggerItem>
                  <StaggerItem delay={0.2}>
                    <div className="card-flat p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2">{blogPosts.length}+</div>
                      <div className="text-sm text-muted-foreground">Blog Posts</div>
                    </div>
                  </StaggerItem>
                  <StaggerItem delay={0.3}>
                    <div className="card-flat p-6 text-center">
                      <div className="text-2xl font-bold text-accent mb-2">5+</div>
                      <div className="text-sm text-muted-foreground">Years Experience</div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

      {/* Research & Blog Preview */}
      <FadeInWhenVisible direction="up" delay={0.2}>
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Research Preview */}
              {featuredResearch.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <BookOpen className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Latest Research</h2>
                  </div>

                  <div className="space-y-6">
                    {featuredResearch.map((paper, index) => (
                      <StaggerItem key={paper.slug} delay={index * 0.1}>
                        <ResearchCard paper={paper} variant="compact" />
                      </StaggerItem>
                    ))}
                  </div>

                  <div className="mt-8">
                    <ScaleOnHover>
                      <Link
                        href="/research"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group"
                      >
                        View all research
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </ScaleOnHover>
                  </div>
                </div>
              )}

              {/* Blog Preview */}
              {featuredBlogPosts.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <FileText className="w-6 h-6 text-accent" />
                    <h2 className="text-2xl font-bold">Recent Blog Posts</h2>
                  </div>

                  <div className="space-y-6">
                    {featuredBlogPosts.map((post, index) => (
                      <StaggerItem key={post.slug} delay={index * 0.1}>
                        <BlogCard post={post} variant="compact" />
                      </StaggerItem>
                    ))}
                  </div>

                  <div className="mt-8">
                    <ScaleOnHover>
                      <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium group"
                      >
                        Read all posts
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </ScaleOnHover>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

      {/* Technologies Section */}
      <FadeInWhenVisible direction="up" delay={0.3}>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Technologies & Tools</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The modern stack I use to build innovative solutions
              </p>
            </div>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                'Next.js', 'TypeScript', 'React', 'Node.js', 'Python', 'Tailwind CSS',
                'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Vercel', 'Git'
              ].map((tech, index) => (
                <StaggerItem key={tech} delay={index * 0.05}>
                  <ScaleOnHover scale={1.05}>
                    <div className="card-flat p-4 text-center hover:border-primary/50 transition-colors">
                      <div className="text-sm font-medium text-foreground">{tech}</div>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </FadeInWhenVisible>

      {/* CTA Section */}
      <FadeInWhenVisible direction="up" delay={0.2}>
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 text-center">
            <StaggerContainer className="max-w-3xl mx-auto">
              <StaggerItem>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Collaborate?
                </h2>
              </StaggerItem>

              <StaggerItem delay={0.2}>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  I'm always interested in discussing new opportunities, innovative projects,
                  or just having a conversation about technology and research.
                </p>
              </StaggerItem>

              <StaggerItem delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ScaleOnHover>
                    <Link
                      href="/contact"
                      className="btn-primary group flex items-center gap-2 px-6 py-3"
                    >
                      <Mail className="w-5 h-5" />
                      Get In Touch
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </ScaleOnHover>

                  <ScaleOnHover>
                    <Link
                      href="/chat"
                      className="btn-secondary group flex items-center gap-2 px-6 py-3"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Try AI Assistant
                    </Link>
                  </ScaleOnHover>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>
      </FadeInWhenVisible>
    </div>
  )
}