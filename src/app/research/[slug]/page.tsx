// app/research/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Download, ExternalLink, Users, Calendar, Quote, Award, FileText, BookOpen, ChevronRight } from 'lucide-react'
import { getResearchBySlug, getAllResearch } from '@/lib/content'
import { NotionPage } from '@/components/notion/NotionPage'
import { NotionBlock } from '@/components/notion/NotionBlock'
import { FadeInWhenVisible } from '@/components/transitions/FadeInWhenVisible'
import { StaggerContainer } from '@/components/transitions/StaggerContainer'
import { StaggerItem } from '@/components/transitions/StaggerItem'
import { ResearchCard } from '@/components/content/ResearchCard'
import { notionUtils } from '@/lib/notion'

interface ResearchPageProps {
    params: {
        slug: string
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ResearchPageProps): Promise<Metadata> {
    const paper = await getResearchBySlug(params.slug)

    if (!paper) {
        return {
            title: 'Paper Not Found',
        }
    }

    return {
        title: paper.meta.title,
        description: paper.meta.abstract,
        openGraph: {
            title: paper.meta.title,
            description: paper.meta.abstract,
            type: 'article',
            publishedTime: paper.meta.date,
            authors: paper.meta.authors,
            images: paper.meta.image ? [paper.meta.image] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: paper.meta.title,
            description: paper.meta.abstract,
            images: paper.meta.image ? [paper.meta.image] : undefined,
        },
    }
}

// Generate static params for all research papers
export async function generateStaticParams() {
    const papers = await getAllResearch()
    return papers.map((paper) => ({
        slug: paper.slug,
    }))
}

// Convert markdown content to NotionBlock format
function markdownToNotionBlocks(content: string): NotionBlockType[] {
    const lines = content.split('\n')
    const blocks: NotionBlockType[] = []
    let blockId = 0

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()

        if (!line) continue

        // Headings
        if (line.startsWith('# ')) {
            blocks.push({
                id: `block-${blockId++}`,
                type: 'heading_1',
                content: line.substring(2),
            })
        } else if (line.startsWith('## ')) {
            blocks.push({
                id: `block-${blockId++}`,
                type: 'heading_2',
                content: line.substring(3),
            })
        } else if (line.startsWith('### ')) {
            blocks.push({
                id: `block-${blockId++}`,
                type: 'heading_3',
                content: line.substring(4),
            })
        }
        // Lists
        else if (line.startsWith('- ') || line.startsWith('* ')) {
            blocks.push({
                id: `block-${blockId++}`,
                type: 'bulleted_list_item',
                content: line.substring(2),
            })
        }
        // Numbered lists
        else if (/^\d+\.\s/.test(line)) {
            blocks.push({
                id: `block-${blockId++}`,
                type: 'numbered_list_item',
                content: line.replace(/^\d+\.\s/, ''),
            })
        }
        // Blockquotes
        else if (line.startsWith('> ')) {
            blocks.push({
                id: `block-${blockId++}`,
                type: 'quote',
                content: line.substring(2),
            })
        }
        // Code blocks
        else if (line.startsWith('```')) {
            const language = line.substring(3)
            let codeContent = ''
            i++
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
                codeContent += lines[i] + '\n'
                i++
            }
            blocks.push({
                id: `block-${blockId++}`,
                type: 'code',
                content: codeContent.trim(),
                properties: { language },
            })
        }
        // Horizontal rule
        else if (line === '---' || line === '***') {
            blocks.push({
                id: `block-${blockId++}`,
                type: 'divider',
                content: '',
            })
        }
        // Regular paragraph
        else {
            blocks.push({
                id: `block-${blockId++}`,
                type: 'paragraph',
                content: line,
            })
        }
    }

    return blocks
}

// Define NotionBlock type
interface NotionBlockType {
    id: string
    type: string
    content: string
    properties?: any
    children?: NotionBlockType[]
}

export default async function ResearchPaperPage({ params }: ResearchPageProps) {
    const paper = await getResearchBySlug(params.slug)

    if (!paper) {
        notFound()
    }

    // Convert markdown content to Notion blocks
    const contentBlocks = markdownToNotionBlocks(paper.content)

    // Get related papers (same research area/tags)
    const allPapers = await getAllResearch()
    const relatedPapers = allPapers
        .filter(p => p.slug !== paper.slug)
        .filter(p =>
            p.meta.tags?.some(tag => paper.meta.tags?.includes(tag))
        )
        .slice(0, 3)

    // Format authors for display
    const formattedAuthors = paper.meta.authors.map((author, index) => {
        const isLast = index === paper.meta.authors.length - 1
        const isSecondToLast = index === paper.meta.authors.length - 2
        return (
            <span key={author}>
        {author}
                {!isLast && (isSecondToLast ? ' and ' : ', ')}
      </span>
        )
    })

    return (
        <article className="min-h-screen">
            <div className="notion-page">
                {/* Back Navigation */}
                <FadeInWhenVisible direction="up">
                    <Link
                        href="/research"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Research
                    </Link>
                </FadeInWhenVisible>

                {/* Paper Header */}
                <FadeInWhenVisible direction="up" delay={0.1}>
                    <header className="mb-12">
                        {/* Status and Awards */}
                        <div className="flex items-center gap-3 mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses(paper.meta.status)}`}>
                {getStatusLabel(paper.meta.status)}
              </span>
                            {paper.meta.featured && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-sm font-medium">
                  <Award className="w-3 h-3" />
                  Featured
                </span>
                            )}
                            {paper.meta.awards && paper.meta.awards.map((award, index) => (
                                <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-sm font-medium">
                  <Award className="w-3 h-3" />
                                    {award}
                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                            {paper.meta.title}
                        </h1>

                        {/* Authors */}
                        <div className="flex items-center gap-2 text-lg text-muted-foreground mb-6">
                            <Users className="w-5 h-5" />
                            <p>{formattedAuthors}</p>
                        </div>

                        {/* Publication Info */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <time dateTime={paper.meta.date}>
                                    {notionUtils.formatDate(paper.meta.date)}
                                </time>
                            </div>

                            {(paper.meta.journal || paper.meta.conference) && (
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" />
                                    <span>
                    {paper.meta.journal || paper.meta.conference}
                                        {paper.meta.volume && `, Vol. ${paper.meta.volume}`}
                                        {paper.meta.pages && `, pp. ${paper.meta.pages}`}
                  </span>
                                </div>
                            )}

                            {paper.meta.citations && (
                                <div className="flex items-center gap-2">
                                    <Quote className="w-4 h-4" />
                                    <span>{paper.meta.citations} citations</span>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            {paper.meta.pdf && (
                                <a
                                    href={paper.meta.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    Download PDF
                                </a>
                            )}

                            {paper.meta.doi && (
                                <a
                                    href={`https://doi.org/${paper.meta.doi}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    View on DOI
                                </a>
                            )}

                            {paper.meta.arxiv && (
                                <a
                                    href={`https://arxiv.org/abs/${paper.meta.arxiv}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    View on arXiv
                                </a>
                            )}

                            <button className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                                <FileText className="w-4 h-4" />
                                Cite
                            </button>
                        </div>

                        {/* Tags */}
                        {paper.meta.tags && paper.meta.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {paper.meta.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                                    >
                    {tag}
                  </span>
                                ))}
                            </div>
                        )}
                    </header>
                </FadeInWhenVisible>

                {/* Abstract */}
                <FadeInWhenVisible direction="up" delay={0.2}>
                    <section className="mb-12 p-6 bg-muted/30 rounded-lg border border-border">
                        <h2 className="text-xl font-semibold mb-4">Abstract</h2>
                        <p className="text-foreground leading-relaxed">
                            {paper.meta.abstract}
                        </p>
                    </section>
                </FadeInWhenVisible>

                {/* Paper Image */}
                {paper.meta.image && (
                    <FadeInWhenVisible direction="up" delay={0.3}>
                        <div className="mb-12 rounded-lg overflow-hidden border border-border">
                            <Image
                                src={paper.meta.image}
                                alt={paper.meta.title}
                                width={1200}
                                height={600}
                                className="w-full"
                            />
                        </div>
                    </FadeInWhenVisible>
                )}

                {/* Content */}
                <FadeInWhenVisible direction="up" delay={0.4}>
                    <div className="prose prose-lg max-w-none mb-12">
                        {contentBlocks.map((block) => (
                            <NotionBlock key={block.id} block={block} />
                        ))}
                    </div>
                </FadeInWhenVisible>

                {/* Citation */}
                <FadeInWhenVisible direction="up" delay={0.5}>
                    <section className="mb-12 p-6 bg-muted/30 rounded-lg border border-border">
                        <h3 className="text-lg font-semibold mb-4">Citation</h3>
                        <pre className="text-sm bg-background p-4 rounded-lg overflow-x-auto font-mono">
{`@article{${paper.slug}${new Date(paper.meta.date).getFullYear()},
  title={${paper.meta.title}},
  author={${paper.meta.authors.join(' and ')}},
  journal={${paper.meta.journal || paper.meta.conference || 'Preprint'}},
  ${paper.meta.volume ? `volume={${paper.meta.volume}},\n  ` : ''}${paper.meta.pages ? `pages={${paper.meta.pages}},\n  ` : ''}year={${new Date(paper.meta.date).getFullYear()}}${paper.meta.doi ? `,\n  doi={${paper.meta.doi}}` : ''}
}`}
            </pre>
                    </section>
                </FadeInWhenVisible>

                {/* Related Papers */}
                {relatedPapers.length > 0 && (
                    <FadeInWhenVisible direction="up" delay={0.6}>
                        <section className="border-t border-border pt-12">
                            <h2 className="text-2xl font-bold mb-8">Related Research</h2>
                            <StaggerContainer className="grid md:grid-cols-3 gap-6">
                                {relatedPapers.map((relatedPaper, index) => (
                                    <StaggerItem key={relatedPaper.slug} delay={index * 0.1}>
                                        <ResearchCard paper={relatedPaper} showAbstract={false} />
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </section>
                    </FadeInWhenVisible>
                )}
            </div>
        </article>
    )
}

// Helper functions
function getStatusClasses(status: string) {
    const statusMap = {
        'published': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        'preprint': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        'in-review': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        'draft': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
    return statusMap[status as keyof typeof statusMap] || statusMap.draft
}

function getStatusLabel(status: string) {
    const labelMap = {
        'published': 'Published',
        'preprint': 'Preprint',
        'in-review': 'Under Review',
        'draft': 'Draft'
    }
    return labelMap[status as keyof typeof labelMap] || 'Draft'
}