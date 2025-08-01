// components/content/AuthorCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Globe, Mail, BookOpen, Coffee } from 'lucide-react'
import { ScaleOnHover } from '@/components/transitions/ScaleOnHover'

interface AuthorCardProps {
    author: {
        name: string
        avatar?: string
        bio?: string
        role?: string
        socials?: {
            github?: string
            linkedin?: string
            twitter?: string
            website?: string
            email?: string
        }
        stats?: {
            posts?: number
            followers?: number
            following?: number
        }
    }
    variant?: 'default' | 'compact' | 'detailed'
}

export function AuthorCard({ author, variant = 'default' }: AuthorCardProps) {
    const socialIcons = [
        { name: 'github', icon: Github, href: author.socials?.github },
        { name: 'linkedin', icon: Linkedin, href: author.socials?.linkedin },
        { name: 'twitter', icon: Twitter, href: author.socials?.twitter },
        { name: 'website', icon: Globe, href: author.socials?.website },
        { name: 'email', icon: Mail, href: author.socials?.email ? `mailto:${author.socials.email}` : undefined },
    ].filter(social => social.href)

    if (variant === 'compact') {
        return (
            <div className="flex items-center gap-3">
                {author.avatar && (
                    <Image
                        src={author.avatar}
                        alt={author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                )}
                <div>
                    <div className="font-medium text-foreground">{author.name}</div>
                    {author.role && (
                        <div className="text-sm text-muted-foreground">{author.role}</div>
                    )}
                </div>
            </div>
        )
    }

    if (variant === 'detailed') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-xl p-8"
            >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Avatar and basic info */}
                    <div className="flex-shrink-0 text-center md:text-left">
                        {author.avatar ? (
                            <Image
                                src={author.avatar}
                                alt={author.name}
                                width={120}
                                height={120}
                                className="rounded-full mx-auto md:mx-0 mb-4"
                            />
                        ) : (
                            <div className="w-[120px] h-[120px] bg-muted rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                <span className="text-4xl font-bold text-muted-foreground">
                  {author.name.charAt(0).toUpperCase()}
                </span>
                            </div>
                        )}

                        <h3 className="text-xl font-bold text-foreground mb-1">{author.name}</h3>
                        {author.role && (
                            <p className="text-muted-foreground mb-4">{author.role}</p>
                        )}

                        {/* Social links */}
                        <div className="flex justify-center md:justify-start gap-2">
                            {socialIcons.map((social) => (
                                <ScaleOnHover key={social.name} scale={1.1}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                        aria-label={social.name}
                                    >
                                        <social.icon className="w-4 h-4" />
                                    </a>
                                </ScaleOnHover>
                            ))}
                        </div>
                    </div>

                    {/* Bio and stats */}
                    <div className="flex-1">
                        {author.bio && (
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                {author.bio}
                            </p>
                        )}

                        {author.stats && (
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {author.stats.posts !== undefined && (
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-foreground">{author.stats.posts}</div>
                                        <div className="text-sm text-muted-foreground">Posts</div>
                                    </div>
                                )}
                                {author.stats.followers !== undefined && (
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-foreground">{author.stats.followers}</div>
                                        <div className="text-sm text-muted-foreground">Followers</div>
                                    </div>
                                )}
                                {author.stats.following !== undefined && (
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-foreground">{author.stats.following}</div>
                                        <div className="text-sm text-muted-foreground">Following</div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href={`/blog?author=${encodeURIComponent(author.name)}`}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                            >
                                <BookOpen className="w-4 h-4" />
                                View all posts
                            </Link>
                            <button className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium">
                                <Coffee className="w-4 h-4" />
                                Buy me a coffee
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    }

    // Default variant
    return (
        <div className="bg-muted/30 border border-border rounded-lg p-6">
            <div className="flex items-start gap-4">
                {author.avatar ? (
                    <Image
                        src={author.avatar}
                        alt={author.name}
                        width={64}
                        height={64}
                        className="rounded-full flex-shrink-0"
                    />
                ) : (
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-bold text-muted-foreground">
              {author.name.charAt(0).toUpperCase()}
            </span>
                    </div>
                )}

                <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">{author.name}</h3>
                    {author.role && (
                        <p className="text-sm text-muted-foreground mb-3">{author.role}</p>
                    )}
                    {author.bio && (
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                            {author.bio}
                        </p>
                    )}

                    {socialIcons.length > 0 && (
                        <div className="flex gap-2">
                            {socialIcons.map((social) => (
                                <ScaleOnHover key={social.name} scale={1.1}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                        aria-label={social.name}
                                    >
                                        <social.icon className="w-4 h-4" />
                                    </a>
                                </ScaleOnHover>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}