// components/notion/NotionPage.tsx
interface NotionPageProps {
  title: string
  description?: string
  coverImage?: string
  children: React.ReactNode
}

export function NotionPage({
  title,
  description,
  coverImage,
  children
}: NotionPageProps) {
  return (
    <article className="notion-page">
      {/* Cover Image */}
      {coverImage && (
        <div className="w-full h-64 bg-muted rounded-lg overflow-hidden mb-8">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Title */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </header>

      {/* Content */}
      <div className="notion-content prose prose-lg max-w-none">
        {children}
      </div>
    </article>
  )
}