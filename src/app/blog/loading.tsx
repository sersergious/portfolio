// app/blog/loading.tsx
export default function BlogLoading() {
    return (
        <div className="min-h-screen">
            {/* Header Skeleton */}
            <section className="py-20 border-b border-border">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Title skeleton */}
                        <div className="h-12 w-48 bg-muted rounded-lg mx-auto mb-4 animate-pulse" />
                        {/* Description skeleton */}
                        <div className="h-6 w-96 bg-muted rounded-lg mx-auto animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Search Bar Skeleton */}
            <section className="py-8 border-b border-border">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                        {/* Search skeleton */}
                        <div className="h-10 w-full lg:w-96 bg-muted rounded-lg animate-pulse" />

                        {/* Categories skeleton */}
                        <div className="flex gap-2">
                            <div className="h-8 w-20 bg-muted rounded-full animate-pulse" />
                            <div className="h-8 w-24 bg-muted rounded-full animate-pulse" />
                            <div className="h-8 w-28 bg-muted rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Posts Grid Skeleton */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {/* Featured post skeleton */}
                    <div className="mb-16">
                        <div className="h-8 w-40 bg-muted rounded-lg mb-6 animate-pulse" />
                        <div className="bg-card border border-border rounded-lg overflow-hidden">
                            <div className="aspect-video bg-muted animate-pulse" />
                            <div className="p-6">
                                <div className="h-8 w-3/4 bg-muted rounded-lg mb-4 animate-pulse" />
                                <div className="h-4 w-full bg-muted rounded-lg mb-2 animate-pulse" />
                                <div className="h-4 w-5/6 bg-muted rounded-lg mb-4 animate-pulse" />
                                <div className="flex gap-4">
                                    <div className="h-4 w-24 bg-muted rounded-lg animate-pulse" />
                                    <div className="h-4 w-20 bg-muted rounded-lg animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* All posts skeleton */}
                    <div>
                        <div className="h-8 w-32 bg-muted rounded-lg mb-8 animate-pulse" />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
                                    <div className="aspect-video bg-muted animate-pulse" />
                                    <div className="p-6">
                                        <div className="h-6 w-3/4 bg-muted rounded-lg mb-3 animate-pulse" />
                                        <div className="h-4 w-full bg-muted rounded-lg mb-2 animate-pulse" />
                                        <div className="h-4 w-4/5 bg-muted rounded-lg mb-4 animate-pulse" />
                                        <div className="flex gap-3">
                                            <div className="h-4 w-20 bg-muted rounded-lg animate-pulse" />
                                            <div className="h-4 w-16 bg-muted rounded-lg animate-pulse" />
                                        </div>
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