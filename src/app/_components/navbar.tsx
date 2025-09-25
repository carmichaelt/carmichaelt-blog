import Link from "next/link";
//import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { NavbarAuth } from "./navbar-auth";
import { MessageCircle } from "lucide-react";
//import { SidebarTrigger } from "@/components/ui/sidebar";

// Server component for static navbar structure
const Navbar = () => {
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <div className="flex justify-between w-full gap-2">
          <div className="flex items-center gap-2">
            {/*<SidebarTrigger />*/}
              <span className="flex items-center text-purple-500 hover:text-amber-600 transition-colors">
            <Link href="/">
                <h1 className="text-5xl md:text-xl font-bold text-black hover:text-black tracking-tighter leading-tight">
                  Carmichael
                </h1>
            </Link>
            <Link href="/sign-in">
                <h1 className="text-5xl md:text-xl font-bold font-italic tracking-tighter leading-tight">
                  t.
                </h1>
            </Link>
              </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hidden sm:flex"
            >
              <Link
                href="https://linkedin.com/in/tomcarmichael"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Feedback
              </Link>
            </Button>
            <NavbarAuth />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
