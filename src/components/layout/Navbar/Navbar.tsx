import NavbarLogo from "./NavbarLogo";
import NavbarMenu from "./NavbarMenu";
import NavbarActions from "./NavbarActions";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <NavbarLogo />
        <NavbarMenu />
        <NavbarActions />
        <NavbarMobile />
      </div>
    </header>
  );
}
