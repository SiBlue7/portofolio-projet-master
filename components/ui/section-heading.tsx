import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-sm font-semibold tracking-[0.2em] text-sky-700 uppercase">
        {eyebrow}
      </p>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}
