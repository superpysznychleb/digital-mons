import { ALL_MONS } from "@/data/mons";
import { MonCard } from "@/components/mon-card";
import Link from "next/link";

export default function DexPage() {
  return (
    <div className="min-h-screen p-4 pb-20">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          &larr; Home
        </Link>
        <h1 className="text-2xl font-bold">Monster Dex</h1>
        <span className="ml-auto text-sm text-muted-foreground">
          {ALL_MONS.length} monsters
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {ALL_MONS.map((mon) => (
          <MonCard key={mon.id} mon={mon} />
        ))}
      </div>
    </div>
  );
}
