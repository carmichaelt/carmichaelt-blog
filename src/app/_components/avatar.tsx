"use client";

import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  name: string;
  picture?: string | null;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            {picture && typeof picture === "string" && picture.trim() !== "" ? (
              <Image
                src={picture}
                className="w-12 h-12 rounded-full object-cover border-2 border-border"
                alt={name}
                width={48}
                height={48}
              />
            ) : (
              <div className="w-12 h-12 rounded-full object-cover border-2 border-border bg-muted flex items-center justify-center">
                <span className="text-sm font-medium text-muted-foreground">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>{name}</TooltipContent>
      </Tooltip>
      <div className="flex flex-col">
        <span className="font-medium text-sm text-foreground">
          {name ?? "Unknown Author"}
        </span>
        <span className="text-xs text-muted-foreground">
          @{name?.toLowerCase().replace(/\s+/g, "") ?? "unknown"}
        </span>
      </div>
    </div>
  );
};

export default Avatar;
