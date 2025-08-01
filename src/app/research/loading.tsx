// app/research/loading.tsx
export default function ResearchLoading() {
    return (
        <div className="min-h-screen">
            {/* Header Skeleton */}
            <section className="notion-page">
                <header className="mb-12">
                    {/* Icon skeleton */}
                    <div className="text-4xl mb-6">
                        <div className="w-12 h-12 bg-muted rounded-lg animate-pulse" />
                    </div>

                    {/* Title skeleton */}
                    <div className="h-12 w-64 bg-muted rounded-lg mb-6 animate-pulse" />

                    {/* Description skeleton */}
                    <div className="space-y-2 max-w-3xl">
                        <div className="h-6 w-full bg-muted rounded-lg animate-pulse" />
                        <div className="h-6 w-4/5 bg-muted rounded-lg animate-pulse" />
                    </div>
                </header>

                {/* Stats Grid Skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-card border border-border rounded-lg p-4">
                            <div className="h-8 w-16 bg-muted rounded mx-auto mb-2 animate-pulse" />
                            <div className="h-4 w-20 bg-muted rounded mx-auto animate-pulse" />
                        </div>
                    ))}
                </div>

                {/* Search Bar Skeleton */}
                <div className="border-y border-border py-6 -mx-6 px-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="h-10 flex-1 bg-muted rounded-lg animate-pulse" />
                        <div className="h-10 w-24 bg-muted rounded-lg animate-pulse" />
                    </div>

                    {/* Tags skeleton */}
                    <div className="mt-4 flex gap-2">
                        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-8 w-20 bg-muted rounded-full animate-pulse" />
                        ))}
                    </div>
                </div>

                {/* Featured Research Skeleton */}
                <div className="space-y-12">
                    <div>
                        <div className="h-8 w-48 bg-muted rounded-lg mb-6 animate-pulse" />
                        <div className="grid md:grid-cols-2 gap-6">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                                    <div className="aspect-[16/10] bg-muted animate-pulse" />
                                    <div className="p-6">
                                        <div className="h-8 w-3/4 bg-muted rounded-lg mb-4 animate-pulse" />
                                        <div className="h-4 w-full bg-muted rounded-lg mb-2 animate-pulse" />
                                        <div className="h-4 w-5/6 bg-muted rounded-lg mb-4 animate-pulse" />
                                        <div className="flex gap-2">
                                            {[...Array(3)].map((_, j) => (
                                                <div key={j} className="h-6 w-16 bg-muted rounded-full animate-pulse" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Published Papers Skeleton */}
                    <div>
                        <div className="h-7 w-40 bg-muted rounded-lg mb-6 animate-pulse" />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
                                    <div className="aspect-[4/3] bg-muted animate-pulse" />
                                    <div className="p-5">
                                        <div className="h-6 w-20 bg-muted rounded-full mb-3 animate-pulse" />
                                        <div className="h-5 w-3/4 bg-muted rounded-lg mb-2 animate-pulse" />
                                        <div className="h-4 w-full bg-muted rounded-lg mb-3 animate-pulse" />
                                        <div className="h-3 w-2/3 bg-muted rounded-lg animate-pulse" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}