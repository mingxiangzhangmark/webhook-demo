import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-violet-300 to-blue-300">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Webhook DEMO</h1>
      <p className="mb-6 text-sm md:text-lg ">Submit messages and view them in real-time via webhook updates.</p>
      <Link
        href="/dashboard"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}