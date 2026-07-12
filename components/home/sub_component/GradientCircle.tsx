// components/GradientCircle.tsx
import { cn } from "@/lib/utils";

type GradientCircleProps = {
  className?: string;
};

export default function GradientCircle({ className }: GradientCircleProps) {
  return (
    <div
      className={cn(
        `
        absolute
        w-24
        aspect-square
        rounded-full
        bg-linear-to-b
        from-[#7B3F98]
      via-[#A77BD6]
      to-[#F7E7AE]
        animate-spin-slow
        opacity-80
        blur-2xs
        origin-[55%_55%]
        z-10
        `,
        className,
      )}
    />
  );
}
