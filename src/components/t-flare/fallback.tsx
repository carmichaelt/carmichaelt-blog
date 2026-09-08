export function TFlareFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,139,0.22),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(179,191,255,0.18),transparent_42%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          aria-hidden="true"
          className="select-none text-[min(72vw,68vh)] leading-none font-bold tracking-tighter text-zinc-100"
          style={{
            textShadow: "0 0 40px rgba(179,191,255,0.45), 0 0 120px rgba(34,197,139,0.28)",
          }}
        >
          T
        </span>
      </div>
    </div>
  );
}
