import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { revalidatePath } from "next/cache";
import { getMonById } from "@/data/mons";
import { convertToWebp } from "@/lib/convert-to-webp";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/bmp", "image/tiff"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const monId = formData.get("monId") as string | null;

  if (!file || !monId) {
    return NextResponse.json({ error: "Missing file or monId" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported image format" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 10 MB)" }, { status: 400 });
  }

  const mon = getMonById(monId);
  if (!mon) {
    return NextResponse.json({ error: "Mon not found" }, { status: 404 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const webpBuffer = await convertToWebp(buffer);

  const monsDir = path.join(process.cwd(), "public", "mons");
  await mkdir(monsDir, { recursive: true });

  const filename = `${mon.id}.webp`;
  await writeFile(path.join(monsDir, filename), webpBuffer);

  revalidatePath(`/dex/${mon.id}`);

  return NextResponse.json({ path: `/mons/${filename}` });
}
