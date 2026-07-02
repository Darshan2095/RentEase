export default function FooterBottom() {
  const year = new Date().getFullYear();

  return (
    <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>&copy; {year} RentEase. All rights reserved.</p>
      <p>Made with ♥ in India</p>
    </div>
  );
}
