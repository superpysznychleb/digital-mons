"use client";

import { useRef, useState } from "react";

type Status = "idle" | "uploading" | "success" | "error";

export function MonImageUpload({ monId, currentImage }: { monId: string; currentImage?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [imageSrc, setImageSrc] = useState(currentImage ?? "");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleUpload = async (file: File) => {
    setStatus("uploading");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("monId", monId);

    try {
      const res = await fetch("/api/upload-mon-image", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Upload failed");
      }

      setImgLoaded(true);
      setImageSrc(`${data.path}?t=${Date.now()}`);
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Upload failed");
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const showImage = imageSrc && imgLoaded;

  return (
    <div className="mb-4 flex aspect-square max-h-48 w-full items-center justify-center rounded-[var(--radius)] bg-muted relative overflow-hidden">
      {imageSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt="Mon sprite"
          className={`h-full w-full object-contain ${showImage ? "" : "hidden"}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgLoaded(false); setImageSrc(""); }}
        />
      )}
      {!showImage && (
        <span className="text-xs text-muted-foreground">No image</span>
      )}

      {/* Upload overlay */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={status === "uploading"}
        className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 opacity-0 transition-all hover:bg-black/50 hover:opacity-100"
      >
        <span className="text-sm font-medium text-white">
          {status === "uploading" ? "Uploading..." : "Upload Image"}
        </span>
        {status === "success" && (
          <span className="mt-1 text-xs text-green-400">Saved as WebP</span>
        )}
        {status === "error" && (
          <span className="mt-1 text-xs text-red-400">{errorMsg}</span>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/bmp,image/tiff"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
