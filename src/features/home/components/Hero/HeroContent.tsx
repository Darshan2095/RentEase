import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

export default function HeroContent() {
  return (
    <div className="flex flex-col justify-center space-y-6 max-w-xl">
      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          Rent Premium Furniture & Appliances
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Upgrade your home without the commitment of buying. Choose flexible tenures, get free delivery & setup, and cancel anytime.
        </p>
      </div>

      <HeroButtons />
      <HeroStats />
    </div>
  );
}
