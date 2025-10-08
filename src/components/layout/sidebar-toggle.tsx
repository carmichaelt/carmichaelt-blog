"use client";

import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect, useRef } from "react";

export function SidebarToggle() {
  const { toggleSidebar, open } = useSidebar();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle hover trigger
  useEffect(() => {
    const handleMouseEnter = () => {
      if (!open) {
        // Clear any existing timeout
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }

        // Set a timeout to open the sidebar after a short delay
        hoverTimeoutRef.current = setTimeout(() => {
          toggleSidebar();
        }, 200);
      }
    };

    const handleMouseLeave = () => {
      // Clear the timeout if mouse leaves before the delay
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };

    // Add event listeners to the hover trigger
    const hoverTrigger = document.getElementById("sidebar-hover-trigger");
    if (hoverTrigger) {
      hoverTrigger.addEventListener("mouseenter", handleMouseEnter);
      hoverTrigger.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        hoverTrigger.removeEventListener("mouseenter", handleMouseEnter);
        hoverTrigger.removeEventListener("mouseleave", handleMouseLeave);
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
      };
    }
  }, [open, toggleSidebar]);

  return (
    <>
      {/* Hover trigger - 10px div on the left edge */}
      <div
        id="sidebar-hover-trigger"
        className="fixed left-0 top-0 z-50 h-screen w-[10px] bg-transparent hover:bg-blue-500/20 transition-colors duration-200"
        style={{ display: open ? "none" : "block" }}
      />

      {/* Toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-20 left-4 z-50 h-8 w-8 bg-background/80 backdrop-blur-sm border shadow-lg hover:bg-accent"
        aria-label="Toggle sidebar"
      >
        <PanelLeft className="h-4 w-4" />
      </Button>
    </>
  );
}
