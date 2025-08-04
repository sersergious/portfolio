'use client'
import {ErrorDisplay} from "@/components/ui/error-display";

export default function ProjectError({
                                      error,
                                      reset,
                                  }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <ErrorDisplay
            error={error}
            reset={reset}
            title="Project Error"
            description="We encountered an error while loading the project. This could be temporary, so please try again."
            backLink={{
                href: "/project",
                label: "Back to Blog"
            }}
        />
    )
}