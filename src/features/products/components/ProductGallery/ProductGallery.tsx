"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  images: string[];
}

export default function ProductGallery({
  images,
}: Props) {
  const [selected, setSelected] = useState(
    images?.[0] || "/placeholder.png"
  );

  return (
    <div className="space-y-4">

      <div className="relative aspect-square rounded-xl overflow-hidden border">

        <Image
          src={selected}
          alt=""
          fill
          className="object-cover"
        />

      </div>

      <div className="grid grid-cols-4 gap-3">

        {images?.map((image) => (
          <button
            key={image}
            onClick={() => setSelected(image)}
          >
            <Image
              src={image}
              width={100}
              height={100}
              alt=""
              className="rounded-lg border object-cover"
            />
          </button>
        ))}

      </div>

    </div>
  );
}