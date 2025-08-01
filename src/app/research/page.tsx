// app/research/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Search, Filter, Award, BookOpen, FileText, Download } from 'lucide-react'
import { getAllResearch } from '@/lib/content'
import { ResearchCard } from '@/components/content/ResearchCard'
import { StaggerContainer } from '@/components/transitions/StaggerContainer'
import { StaggerItem } from '@/components/transitions/StaggerItem'
import { FadeInWhenVisible } from '@/components/transitions/FadeInWhenVisible'
import { NotionPage } from '@/components/notion/NotionPage'
import { NotionHeader } from '@/components/notion/NotionHeader'

export const metadata: Metadata = {
    title: 'Research',
    description: 'Academic papers, preprints, and research findings in machine learning, AI, and software engineering',
}

export default async function ResearchPage() {
    const papers = await getAllResearch()

    // Sort papers by date (newest first)
    const sortedPapers = papers.sort((a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    )

    // Group papers by status
    const publishedPapers = sortedPapers.filter(p => p.meta.status === 'published')
    const preprints = sortedPapers.filter(p => p.meta.status === 'preprint')
    const inReview = sortedPapers.filter(p => p.meta.status === 'in-review')
    const drafts = sortedPapers.filter(p => p.meta.status === 'draft')

    // Get unique research areas from tags
    const researchAreas = Array.from(
        new Set(papers.flatMap(paper => paper.meta.tags || []))
    )

    // Calculate stats
    const totalCitations = papers.reduce((sum, paper) => sum + (paper.meta.citations || 0), 0)
    const awardsCount = papers.filter(p => p.meta.awards && p.meta.awards.length > 0).length

    return (
        <div className="min-h-screen">
            {/* Notion-style Header */}
            <section className="notion-page">
                <NotionHeader
                    title="Research"
                    description="Exploring the frontiers of machine learning, artificial intelligence, and software engineering through rigorous academic research."
                    icon="🔬"
                />

                {/* Research Stats */}
                <FadeInWhenVisible direction="up">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        <div className="bg-card border border-border rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-primary mb-1">{papers.length}</div>
                            <div className="text-sm text-muted-foreground">Publications</div>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-accent mb-1">{totalCitations}</div>
                            <div className="text-sm text-muted-foreground">Citations</div>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-gb-yellow mb-1">{awardsCount}</div>
                            <div className="text-sm text-muted-foreground">Awards</div>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-gb-green mb-1">{publishedPapers.length}</div>
                            <div className="text-sm text-muted-foreground">Published</div>
                        </div>
                    </div>
                </FadeInWhenVisible>

                {/* Search and Filters */}
                <div className="border-y border-border py-6 -mx-6 px-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="Search papers by title, author, or keyword..."
                                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                            />
                        </div>

                        {/* Filter Button */}
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
                            <Filter className="w-4 h-4" />
                            <span>Filter</span>
                        </button>
                    </div>

                    {/* Research Areas */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="text-sm text-muted-foreground">Research areas:</span>
                        {researchAreas.slice(0, 8).map((area) => (
                            <button
                                key={area}
                                className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
                            >
                                {area}
                            </button>
                        ))}
                        {researchAreas.length > 8 && (
                            <span className="px-3 py-1 text-sm text-muted-foreground">
                +{researchAreas.length - 8} more
              </span>
                        )}
                    </div>
                </div>

                {papers.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg mb-4">
                            No research papers yet. Check back soon!
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                        >
                            Go back home
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Featured Papers */}
                        {papers.some(p => p.meta.featured) && (
                            <FadeInWhenVisible direction="up">
                                <div>
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                        <Award className="w-6 h-6 text-yellow-500" />
                                        Featured Research
                                    </h2>
                                    <StaggerContainer className="grid md:grid-cols-2 gap-6">
                                        {papers
                                            .filter(p => p.meta.featured)
                                            .slice(0, 2)
                                            .map((paper, index) => (
                                                <StaggerItem key={paper.slug} delay={index * 0.1}>
                                                    <ResearchCard paper={paper} variant="featured" />
                                                </StaggerItem>
                                            ))}
                                    </StaggerContainer>
                                </div>
                            </FadeInWhenVisible>
                        )}

                        {/* Published Papers */}
                        {publishedPapers.length > 0 && (
                            <FadeInWhenVisible direction="up" delay={0.1}>
                                <div>
                                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-gb-green" />
                                        Published Papers
                                    </h2>
                                    <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {publishedPapers.map((paper, index) => (
                                            <StaggerItem key={paper.slug} delay={index * 0.05}>
                                                <ResearchCard paper={paper} />
                                            </StaggerItem>
                                        ))}
                                    </StaggerContainer>
                                </div>
                            </FadeInWhenVisible>
                        )}

                        {/* Preprints */}
                        {preprints.length > 0 && (
                            <FadeInWhenVisible direction="up" delay={0.2}>
                                <div>
                                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-gb-blue" />
                                        Preprints
                                    </h2>
                                    <StaggerContainer className="space-y-4">
                                        {preprints.map((paper, index) => (
                                            <StaggerItem key={paper.slug} delay={index * 0.05}>
                                                <ResearchCard paper={paper} variant="compact" />
                                            </StaggerItem>
                                        ))}
                                    </StaggerContainer>
                                </div>
                            </FadeInWhenVisible>
                        )}

                        {/* Under Review */}
                        {inReview.length > 0 && (
                            <FadeInWhenVisible direction="up" delay={0.3}>
                                <div>
                                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-gb-yellow" />
                                        Under Review
                                    </h2>
                                    <StaggerContainer className="space-y-4">
                                        {inReview.map((paper, index) => (
                                            <StaggerItem key={paper.slug} delay={index * 0.05}>
                                                <ResearchCard paper={paper} variant="compact" />
                                            </StaggerItem>
                                        ))}
                                    </StaggerContainer>
                                </div>
                            </FadeInWhenVisible>
                        )}

                        {/* Download BibTeX */}
                        <FadeInWhenVisible direction="up" delay={0.4}>
                            <div className="border-t border-border pt-8 mt-12">
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold mb-4">Export Citations</h3>
                                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                                        <Download className="w-4 h-4" />
                                        Download All BibTeX
                                    </button>
                                </div>
                            </div>
                        </FadeInWhenVisible>
                    </div>
                )}
            </section>
        </div>
    )
}