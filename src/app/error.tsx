// app/error.tsx
"use client"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="h-screen flex items-center justify-center flex-col space-y-4">
      <h1 className="text-2xl font-bold text-red-500">Something went wrong!</h1>
      <pre className="text-sm text-muted-foreground">{error.message}</pre>
      <button onClick={reset} className="text-blue-600 underline">Try Again</button>
    </div>
  )
}
