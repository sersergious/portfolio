'use client'

export default function ProjectsError({
        error,
        reset,
      }: {
        error: Error & { digest?: string }
        reset: () => void
      }) {
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-destructive mb-4">
              Something went wrong!
            </h2>
            <button
              onClick={() => reset()}
              className="btn-primary"
            >
              Try again
            </button>
          </div>
        )
      }