"use client";

import { useMutation, useQuery } from "convex/react";
import { Brain, CirclePause, Octagon, type LucideIcon } from "lucide-react";

import { api } from "../../../convex/_generated/api";
import { useVisitorKey } from "@/hooks/use-visitor-key";
import { cn } from "@/lib/utils";

const reactions: {
  kind: "stop" | "pause" | "think";
  label: string;
  Icon: LucideIcon;
}[] = [
  { kind: "stop", label: "Stop", Icon: Octagon },
  { kind: "pause", label: "Pause", Icon: CirclePause },
  { kind: "think", label: "Think", Icon: Brain },
];

type ReactionKind = (typeof reactions)[number]["kind"];

function ReactionCount({ value }: { value: number }) {
  const digits = String(value).length;
  const width = Math.max(8, digits * 7);

  return (
    <svg
      aria-hidden
      className="h-4 shrink-0 text-zinc-500"
      width={width}
      height={16}
      viewBox={`0 0 ${width} 16`}
    >
      <text
        x={width / 2}
        y={12.5}
        textAnchor="middle"
        dominantBaseline="alphabetic"
        fontSize="12"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fill="currentColor"
      >
        {value}
      </text>
    </svg>
  );
}

export function PostReactions({ slug }: { slug: string }) {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) return null;
  return <PostReactionsButtons slug={slug} />;
}

function PostReactionsButtons({ slug }: { slug: string }) {
  const visitorKey = useVisitorKey();
  const counts = useQuery(api.reactions.getForSlug, { slug });
  const mine = useQuery(api.reactions.listMine, visitorKey ? { slug, visitorKey } : "skip");
  const toggle = useMutation(api.reactions.toggle);

  const mineSet = new Set(mine ?? []);

  async function onToggle(kind: ReactionKind) {
    if (!visitorKey) return;
    await toggle({ slug, visitorKey, kind });
  }

  return (
    <section className="mt-16 border-t border-white/10 pt-8">
      <p className="mb-4 text-sm tracking-[0.16em] text-zinc-500 uppercase">React</p>
      <div className="flex flex-wrap gap-3">
        {reactions.map((reaction) => {
          const selected = mineSet.has(reaction.kind);
          const count = counts?.[reaction.kind] ?? 0;
          const { Icon } = reaction;
          return (
            <button
              key={reaction.kind}
              type="button"
              aria-label={`${reaction.label}${count > 0 ? `, ${count}` : ""}`}
              aria-pressed={selected}
              onClick={() => void onToggle(reaction.kind)}
              disabled={!visitorKey}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 leading-none transition-colors",
                selected
                  ? "border-emerald-400/70 bg-emerald-400/10 text-emerald-300"
                  : "border-white/15 text-zinc-300 hover:border-emerald-400/40 hover:text-zinc-100",
              )}
            >
              <Icon className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
              <ReactionCount value={count} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
