import { cn } from "@/lib/utils";

export function BrandIcon({ className, imgClassName }: { className?: string; imgClassName?: string }) {
  return (
    <span className={cn("grid place-items-center overflow-hidden rounded-xl bg-[image:var(--gradient-primary)] shadow-[var(--shadow-soft)]", className)}>
      <img src="/favicon.svg" alt="" aria-hidden="true" className={cn("h-full w-full", imgClassName)} />
    </span>
  );
}
