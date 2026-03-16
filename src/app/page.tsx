import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-4xl font-bold text-primary">Digital Mons</h1>
      <p className="max-w-sm text-center text-muted-foreground">
        Discover, collect, and evolve digital monsters across six powerful stages.
      </p>
      <Link href="/dex">
        <Button size="lg">Open the Dex</Button>
      </Link>
    </div>
  );
}
