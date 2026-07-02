import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full rounded-2xl overflow-hidden bg-muted shadow-2xl">
      <Image
        src="/hero-furniture.png"
        alt="Stunning premium modern living room furniture"
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  );
}
