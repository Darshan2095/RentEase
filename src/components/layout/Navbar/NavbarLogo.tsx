import Link from "next/link";

export default function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
      <span className="text-primary">Rent</span>
      <span>Ease</span>
    </Link>
  );
}
