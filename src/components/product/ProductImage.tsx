"use client";

import { useState } from "react";
import Image from "next/image";
import { Package } from "lucide-react";

interface ProductImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  aspectRatio?: "square" | "video" | "auto" | "portrait";
}

export default function ProductImage({ 
  src, 
  alt, 
  className = "", 
  aspectRatio = "square" 
}: ProductImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // High-end ratio map definitions matching standard ecommerce structures
  const ratioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    auto: "h-full w-full"
  };

  return (
    <div 
      className={`relative w-full overflow-hidden bg-[#F8FAFC] rounded-2xl group border border-slate-100/60 ${ratioClasses[aspectRatio]} ${className}`}
    >
      {/* Premium Loading Skeleton Layer */}
      {isLoading && !error && (
        <div className="absolute inset-0 z-10 w-full h-full bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 animate-pulse bg-[length:200%_100%]" />
      )}

      {/* Fallback Missing Image State Container */}
      {error || !src ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-[#6B7280] p-4 text-center">
          <div className="h-10 w-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-2">
            <Package className="h-5 w-5 text-slate-400 stroke-[1.5]" />
          </div>
          <span className="text-[12px] font-medium tracking-tight text-slate-400">
            Preview Unavailable
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized={src.startsWith("data:")} // Gracefully handle inline mock buffers
          className={`object-cover transform duration-500 ease-out group-hover:scale-102
            ${isLoading ? "opacity-0 scale-98" : "opacity-100 scale-100"}
          `}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setIsLoading(false)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}