'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, RefreshCw, Home, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

interface ErrorDisplayProps {
    error: Error & { digest?: string }
    reset?: () => void
    title?: string
    description?: string
    backLink?: {
        href: string
        label: string
    }
    showHomeLink?: boolean
    showDebugInfo?: boolean
}

export function ErrorDisplay({
                                 error,
                                 reset,
                                 title = "Something went wrong!",
                                 description = "We encountered an unexpected error. This could be temporary, so please try again.",
                                 backLink,
                                 showHomeLink = true,
                                 showDebugInfo = true
                             }: ErrorDisplayProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Error:', error)
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
                        <AlertCircle className="w-10 h-10 text-destructive" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-2xl font-bold text-foreground mb-4">
                        {title}
                    </h1>

                    <p className="text-muted-foreground mb-8">
                        {description}
                    </p>

                    {error.digest && (
                        <p className="text-sm text-muted-foreground mb-8 font-mono">
                            Error ID: {error.digest}
                        </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {reset && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={reset}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Try Again
                            </motion.button>
                        )}

                        {backLink && (
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href={backLink.href}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    {backLink.label}
                                </Link>
                            </motion.div>
                        )}
                    </div>

                    {showHomeLink && (
                        <div className="mt-8">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                Go to Homepage
                            </Link>
                        </div>
                    )}
                </motion.div>

                {/* Debug info in development */}
                {showDebugInfo && process.env.NODE_ENV === 'development' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 p-4 bg-muted/50 rounded-lg text-left"
                    >
                        <p className="text-sm font-mono text-muted-foreground mb-2">
                            Development Mode - Error Details:
                        </p>
                        <pre className="text-xs overflow-auto">
              {error.message}
                            {error.stack && '\n\n' + error.stack}
            </pre>
                    </motion.div>
                )}
            </div>
        </div>
    )
}