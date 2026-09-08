"use client";

import dynamic from "next/dynamic";

import { TFlareFallback } from "@/components/t-flare/fallback";

const TFlare = dynamic(() => import("@/components/t-flare").then((module) => module.TFlare), {
  ssr: false,
  loading: () => <TFlareFallback />,
});

export function TFlareHero() {
  return (
    <div className="absolute inset-0">
      <TFlare />
    </div>
  );
}
