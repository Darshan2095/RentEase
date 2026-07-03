"use client";

const stats = [
  { value: "10k+", label: "Verified Lessees" },
  { value: "500+", label: "Premium Assets" },
  { value: "99.4%", label: "Fulfillment Rate" },
];

export default function HeroStats() {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex items-center gap-6">
          {/* Stat Content Stack */}
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-mono">
              {stat.value}
            </p>
            <p className="text-[11px] font-medium tracking-wide uppercase text-slate-400">
              {stat.label}
            </p>
          </div>

          {/* Elegant Structural Divider Line (Omitted on the final asset item) */}
          {idx < stats.length - 1 && (
            <div className="hidden sm:block h-8 w-[1px] bg-slate-200/80 shrink-0 self-center" />
          )}
        </div>
      ))}
    </div>
  );
}