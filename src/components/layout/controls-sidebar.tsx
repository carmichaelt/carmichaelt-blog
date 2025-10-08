import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { SearchAndFilters } from "@/app/_components/search-and-filters";

export function ControlsSidebar({ ...props }: React.ComponentProps<"div">) {
  return (
    <Sidebar
      variant="inset"
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SearchAndFilters />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
