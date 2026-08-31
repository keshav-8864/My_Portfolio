import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-9xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6 text-foreground">Page Not Found</h2>
      <p className="text-foreground/70 mb-10 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/"
        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Home
      </Link>
    </div>
  );
}
