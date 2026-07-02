import FooterLinks from "./FooterLinks";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-12 space-y-10">

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 justify-between">
          <div className="max-w-xs">
            <span className="text-xl font-bold">
              <span className="text-primary">Rent</span>Ease
            </span>
            <p className="mt-3 text-sm text-muted-foreground">
              Rent quality furniture and appliances at affordable monthly prices.
              Delivery, setup, and pickup included.
            </p>
          </div>

          <FooterLinks />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}
