import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Props = {
    name: string;
    picture: string;
  };
  
  const Avatar = ({ name, picture }: Props) => {
    return (
      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Image src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} width={12} height={12} />
          </TooltipTrigger>
          <TooltipContent>
            {name}
          </TooltipContent>
        </Tooltip>
        <div className="flex flex-col text-black">
        <span className="font-medium text-sm">{name ?? "Unknown Author"}</span>
        <span className="text-xs text-muted-foreground">@{name?.toLowerCase().replace(/\s+/g, '') ?? "unknown"}</span>
      </div>
      </div>
    );
  };
  
  export default Avatar;