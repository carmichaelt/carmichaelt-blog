import Link from "next/link";
//import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { NavbarAuth } from "./navbar-auth";

// Server component for static navbar structure
const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center p-4">
        <div>
          <Link href="/">
            {/* <Image src="/tc-logo.png" alt="logo" width={100} height={100} /> */}
            <span className="flex items-center text-purple-500 hover:text-amber-600">
            <h1 className="text-5xl md:text-xl font-bold text-black hover:text-black tracking-tighter leading-tight">
              Carmichael
            </h1>
            <h1 className="text-5xl md:text-xl font-bold font-italic tracking-tighter leading-tight">
              t.
            </h1>
            </span>
          </Link>
        </div>
        <NavbarAuth />
      </div>
      <Separator />
    </>
  );
};

export default Navbar;
