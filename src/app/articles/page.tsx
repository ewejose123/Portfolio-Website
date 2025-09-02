import Link from "next/link"

export default function ArticlesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Problem-Solving Articles</h1>
      <p className="text-neutral-400 mt-2">Short reads coming soon. We will add content once the approach is finalized.</p>
      <div className="mt-6">
        <Link href="/" className="text-sky-400">Back to home  </Link>
      </div>
    </main>
  )
}


