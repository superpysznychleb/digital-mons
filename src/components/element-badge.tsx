import { cn } from "@/lib/utils";
import { ElementType } from "@/lib/types";
import { ELEMENT_BG } from "@/lib/element-colors";

export function ElementBadge({ type }: { type: ElementType }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold text-white",
        ELEMENT_BG[type]
      )}
    >
      {type}
    </span>
  );
}
