import { notFound } from "next/navigation";
import Link from "next/link";
import { existsSync } from "fs";
import path from "path";
import { ALL_MONS, getMonById, getEvolutionChain } from "@/data/mons";
import { ElementBadge } from "@/components/element-badge";
import { RARITY_COLORS, ELEMENT_BORDER } from "@/lib/element-colors";
import { cn } from "@/lib/utils";
import { EVOLUTION_STAGES } from "@/lib/types";
import { CopyButton } from "@/components/copy-button";
import { MonImageUpload } from "@/components/mon-image-upload";

export function generateStaticParams() {
  return ALL_MONS.map((mon) => ({ id: mon.id }));
}

function StatBar({ label, value, max = 120 }: { label: string; value: number; max?: number }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-16 text-muted-foreground">{label}</span>
      <span className="w-8 text-right font-mono font-bold">{value}</span>
      <div className="h-2 flex-1 rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default async function MonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mon = getMonById(id);
  if (!mon) notFound();

  const chain = getEvolutionChain(mon.id);

  return (
    <div className="min-h-screen p-4 pb-20">
      {/* Back nav */}
      <Link
        href="/dex"
        className="mb-4 inline-block text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; Back to Dex
      </Link>

      {/* Header card */}
      <div
        className={cn(
          "mb-6 rounded-[var(--radius)] border-2 bg-card p-5",
          ELEMENT_BORDER[mon.types[0]]
        )}
      >
        {/* Mon sprite with upload */}
        <MonImageUpload
          monId={mon.id}
          currentImage={
            mon.image ||
            (existsSync(path.join(process.cwd(), "public", "mons", `${mon.id}.webp`))
              ? `/mons/${mon.id}.webp`
              : undefined)
          }
        />

        {/* Name row */}
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{mon.name}</h1>
          <span className="text-sm text-muted-foreground">
            #{String(mon.dexNumber).padStart(3, "0")}
          </span>
        </div>

        {/* Types */}
        <div className="mb-2 flex gap-2">
          {mon.types.map((t) => (
            <ElementBadge key={t} type={t} />
          ))}
        </div>

        {/* Stage & rarity */}
        <div className="mb-3 flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">
            Stage: <strong>{mon.stage}</strong> ({EVOLUTION_STAGES.indexOf(mon.stage) + 1}/6)
          </span>
          <span className={cn("font-medium", RARITY_COLORS[mon.rarity])}>
            {mon.rarity}
          </span>
        </div>

        <p className="text-sm text-foreground">{mon.description}</p>
      </div>

      {/* Stats */}
      <section className="mb-6">
        <h2 className="mb-3 text-lg font-bold">Stats</h2>
        <div className="flex flex-col gap-2 rounded-[var(--radius)] border bg-card p-4">
          <StatBar label="HP" value={mon.stats.hp} max={170} />
          <StatBar label="ATK" value={mon.stats.attack} max={120} />
          <StatBar label="DEF" value={mon.stats.defense} max={100} />
          <StatBar label="SPD" value={mon.stats.speed} max={100} />
          <StatBar label="SPC" value={mon.stats.special} max={120} />
        </div>
      </section>

      {/* Abilities */}
      <section className="mb-6">
        <h2 className="mb-3 text-lg font-bold">Abilities</h2>
        <div className="flex flex-col gap-2">
          {mon.abilities.map((ability) => (
            <div
              key={ability.name}
              className="rounded-[var(--radius)] border bg-card p-3"
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="font-semibold">{ability.name}</span>
                <ElementBadge type={ability.element} />
              </div>
              <p className="text-sm text-muted-foreground">
                {ability.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Lore & Habitat */}
      <section className="mb-6">
        <h2 className="mb-3 text-lg font-bold">Lore</h2>
        <div className="rounded-[var(--radius)] border bg-card p-4">
          <p className="mb-3 text-sm text-foreground">{mon.lore}</p>
          <p className="text-xs text-muted-foreground">
            <strong>Habitat:</strong> {mon.habitat}
          </p>
        </div>
      </section>

      {/* Image Prompt */}
      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Image Prompt</h2>
          <CopyButton text={mon.imagePrompt} />
        </div>
        <div className="rounded-[var(--radius)] border bg-card p-4">
          <p className="text-xs leading-relaxed text-muted-foreground font-mono break-words">
            {mon.imagePrompt}
          </p>
        </div>
      </section>

      {/* Evolution Chain */}
      {chain.length > 1 && (
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-bold">Evolution Chain</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {chain.map((evo, i) => (
              <div key={evo.id} className="flex items-center gap-2">
                <Link
                  href={`/dex/${evo.id}`}
                  className={cn(
                    "flex min-w-[80px] flex-col items-center rounded-[var(--radius)] border p-2 text-center transition-colors",
                    evo.id === mon.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <span className="text-xs text-muted-foreground">
                    {evo.stage}
                  </span>
                  <span className="text-sm font-bold">{evo.name}</span>
                </Link>
                {i < chain.length - 1 && (
                  <span className="text-muted-foreground">&rarr;</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
