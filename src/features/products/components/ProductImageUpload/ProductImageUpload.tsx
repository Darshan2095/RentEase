"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
}

export default function ProductImageUpload({
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">
      <CldUploadWidget
        uploadPreset="YOUR_UPLOAD_PRESET"
        onSuccess={(result: any) => {
          onChange([...value, result.info.secure_url]);
        }}
      >
        {({ open }) => (
          <Button
            type="button"
            onClick={() => open()}
          >
            Upload Image
          </Button>
        )}
      </CldUploadWidget>

      <div className="grid grid-cols-4 gap-4">
        {value.map((image) => (
          <img
            key={image}
            src={image}
            alt=""
            className="h-32 w-full rounded-lg object-cover border"
          />
        ))}
      </div>
    </div>
  );
}