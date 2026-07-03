import NavbarLogo from "./NavbarLogo";
import NavbarMenu from "./NavbarMenu";
import NavbarActions from "./NavbarActions";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100/80 bg-[#FFFFFF]/80 backdrop-blur-xl transition-all duration-300">
      {/* Structural constraint balancing layout density */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between relative">
          
          {/* Left Wing: Branding Anchor */}
          <div className="flex items-center">
            <NavbarLogo />
          </div>

          {/* Central Wing: Center Interactive Menu */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            <NavbarMenu />
          </div>

          {/* Right Wing: User Configurations & Call-To-Actions */}
          <div className="flex items-center space-x-2">
            <NavbarActions />
            <NavbarMobile />
          </div>

        </div>
      </div>
    </header>
  );
}