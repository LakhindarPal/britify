export function formatDuration(sec: number, format: "pretty" | "colon" = "colon") {
  if (Number.isNaN(sec)) return "--:--";

  const h = ~~(sec / 3600);
  const m = ~~((sec % 3600) / 60);
  const s = sec % 60;

  const pad = (n: number) => String(n).padStart(2, "0");

  if (format === "colon") {
    return [h && pad(h), pad(m), pad(s)].filter(Boolean).join(":");
  }

  return [h ? `${h}h` : "", m ? `${m}m` : "", `${s}s`].filter(Boolean).join(" ");
}
