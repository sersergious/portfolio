// app/research/error.tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, RefreshCw, Home, ArrowLeft, FileSearch } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ResearchError({
                                          error,
                                          reset,
                                      }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Research section error:', error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                >
                    <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                        <FileSearch className="w-10 h-10 text-destructive" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-2xl font-bold text-foreground mb-4">
                        Research Data Unavailable
                    </h1>

                    <p className="text-muted-foreground mb-8">
                        We're having trouble loading the research papers. This might be a temporary issue
                        with our data source. Please try again in a moment.
                    </p>

                    {error.message && (
                        <div className="bg-muted/50 rounded-lg p-4 mb-8 text-left">
                            <p className="text-sm text-muted-foreground font-mono">
                                Error: {error.message}
                            </p>
                        </div>
                    )}

                    {error.digest && (
                        <p className="text-sm text-muted-foreground mb-8 font-mono">
                            Reference ID: {error.digest}
                        </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={reset}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </motion.button>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href="/research"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Research
                            </Link>
                        </motion.div>
                    </div>

                    <div className="mt-8 space-y-2">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Home className="w-4 h-4" />
                            Go to Homepage
                        </Link>
                    </div>

                    {/* Helpful Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 p-6 bg-muted/30 rounded-lg text-left"
                    >
                        <h2 className="text-sm font-semibold text-foreground mb-3">
                            While we fix this, you can:
                        </h2>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Check out my <Link href="/projects" className="text-primary hover:underline">projects</Link></li>
                            <li>• Read my <Link href="/blog" className="text-primary hover:underline">blog posts</Link></li>
                            <li>• Visit my <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Scholar profile</a></li>
                            <li>• Browse papers on <a href="https://arxiv.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">arXiv</a></li>
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Debug info in development */}
                {process.env.NODE_ENV === 'development' && error.stack && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-8 p-4 bg-muted/50 rounded-lg text-left"
                    >
                        <p className="text-sm font-mono text-muted-foreground mb-2">
                            Stack Trace (Development Mode):
                        </p>
                        <pre className="text-xs overflow-auto max-h-48">
              {error.stack}
            </pre>
                    </motion.div>
                )}
            </div>
        </div>
    )
}