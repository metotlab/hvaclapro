"use client";
import { PhoneButton } from "@/components/ui/PhoneButton";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-primary mb-3">Something went wrong</h1>
      <p className="text-muted mb-6">We hit a snag. Try again, or call us directly.</p>
      <div className="flex justify-center gap-3">
        <PhoneButton />
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center font-semibold rounded-lg px-5 py-3 border border-primary text-primary hover:bg-primary hover:text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
