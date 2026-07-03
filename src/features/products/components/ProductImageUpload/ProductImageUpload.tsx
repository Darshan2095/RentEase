"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, X, UploadCloud } from "lucide-react";
import Image from "next/image";

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
}

export default function ProductImageUpload({ value, onChange }: Props) {
  const onRemove = (url: string) => {
    onChange(value.filter((current) => current !== url));
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
        onSuccess={(result: any) => {
          onChange([...value, result.info.secure_url]);
        }}
      >
        {({ open }) => (
          <div
            onClick={() => open()}
            className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 transition hover:border-blue-500 hover:bg-blue-50"
          >
            <UploadCloud className="mb-2 h-8 w-8 text-slate-400 group-hover:text-blue-500" />
            <p className="text-sm font-medium text-slate-600">Click to upload assets</p>
            <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
          </div>
        )}
      </CldUploadWidget>

      {/* Grid Display */}
      <div className="grid grid-cols-4 gap-4">
        {value.map((url) => (
          <div key={url} className="group relative aspect-square overflow-hidden rounded-lg border bg-slate-100">
            <Image
              fill
              src={url}
              alt="Uploaded product"
              className="object-cover"
            />
            {/* Remove Action */}
            <button
              type="button"
              onClick={() => onRemove(url)}
              className="absolute right-1 top-1 rounded-full bg-red-500/80 p-1 text-white opacity-0 transition group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}