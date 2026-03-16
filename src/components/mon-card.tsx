import Link from "next/link";
import { cn } from "@/lib/utils";
import { Mon } from "@/lib/types";
import { ElementBadge } from "./element-badge";
import { RARITY_COLORS, ELEMENT_BORDER } from "@/lib/element-colors";

export function MonCard({ mon }: { mon: Mon }) {
  return (
    <Link href={`/dex/${mon.id}`}>
      <div
        className={cn(
          "group flex flex-col rounded-[var(--radius)] border-2 bg-card p-3 transition-all hover:scale-[1.02] hover:shadow-lg",
          ELEMENT_BORDER[mon.types[0]]
        )}
      >
        {/* Placeholder sprite area */}
        <div className="mb-2 flex aspect-square items-center justify-center rounded-[var(--radius)] bg-muted text-3xl">
          <span className="text-muted-foreground opacity-40 select-none">
            #{String(mon.dexNumber).padStart(3, "0")}
          </span>
        </div>

        {/* Name and number */}
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-bold text-foreground">{mon.name}</span>
          <span className="text-xs text-muted-foreground">
            #{String(mon.dexNumber).padStart(3, "0")}
          </span>
        </div>

        {/* Types */}
        <div className="mb-1 flex gap-1">
          {mon.types.map((t) => (
            <ElementBadge key={t} type={t} />
          ))}
        </div>

        {/* Stage and rarity */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{mon.stage}</span>
          <span className={cn("font-medium", RARITY_COLORS[mon.rarity])}>
            {mon.rarity}
          </span>
        </div>
      </div>
    </Link>
  );
}
