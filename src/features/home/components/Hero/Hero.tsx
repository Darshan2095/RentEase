import Container from "@/components/layout/Container";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <div className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-muted/50 to-background">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <HeroContent />
          <HeroImage />
        </div>
      </Container>
    </div>
  );
}
