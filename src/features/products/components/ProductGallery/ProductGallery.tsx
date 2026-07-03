"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  const [selected, setSelected] = useState(images?.[0] || "/placeholder.jpg");

  return (
    <div className="flex flex-col gap-4">
      {/* Main Preview Frame */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner">
        <Image
          src={selected}
          alt="Product detail view"
          fill
          priority
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Thumbnails Grid */}
      <div className="grid grid-cols-4 gap-3">
        {images?.map((image) => (
          <button
            key={image}
            onClick={() => setSelected(image)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl border-2 transition-all duration-200",
              selected === image 
                ? "border-blue-600 ring-2 ring-blue-600/20" 
                : "border-transparent hover:border-slate-300"
            )}
          >
            <Image
              src={image}
              fill
              alt="Product thumbnail"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}