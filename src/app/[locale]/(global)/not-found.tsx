"use client";

import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 – Page Not Found</h1>
        <p className="mt-4">The page you are looking for does not exist.</p>
        <Link href="/" className="mt-6 inline-block text-primary hover:underline">
          Go back Home
        </Link>
      </div>
    </div>
  );
}
