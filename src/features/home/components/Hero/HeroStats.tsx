export default function HeroStats() {
  const stats = [
    { value: "10k+", label: "Happy Customers" },
    { value: "500+", label: "Premium Products" },
    { value: "24/7", label: "Support Service" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 pt-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="space-y-1">
          <p className="text-2xl md:text-3xl font-extrabold text-primary">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
