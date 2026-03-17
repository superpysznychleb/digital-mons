import sharp from "sharp";

/**
 * Converts any image buffer to WebP format.
 * All mon images MUST be stored as WebP — this is enforced at upload time.
 */
export async function convertToWebp(
  input: Buffer,
  opts?: { width?: number; height?: number; quality?: number }
): Promise<Buffer> {
  let pipeline = sharp(input);

  if (opts?.width || opts?.height) {
    pipeline = pipeline.resize(opts.width, opts.height, { fit: "inside", withoutEnlargement: true });
  }

  return pipeline.webp({ quality: opts?.quality ?? 80 }).toBuffer();
}
