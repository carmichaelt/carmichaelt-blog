"use client";

import { useEffect, useRef, useState } from "react";

import { TFlareFallback } from "./fallback";
import { createRenderer } from "./renderer";

function canUseWebGpu() {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}

export function TFlare() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(() => !canUseWebGpu());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || failed) return;

    const renderer = createRenderer({ canvas });
    void renderer.ready.catch(() => {
      setFailed(true);
    });

    return () => renderer.dispose();
  }, [failed]);

  if (failed) {
    return <TFlareFallback />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="block h-full w-full touch-none" aria-hidden="true" />
    </div>
  );
}

export { TFlareFallback };
