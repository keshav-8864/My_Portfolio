import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <Loader2 size={40} className="text-primary animate-spin mb-4" />
      <h2 className="text-xl font-medium text-foreground tracking-tight animate-pulse">Loading Portfolio...</h2>
    </div>
  );
}
