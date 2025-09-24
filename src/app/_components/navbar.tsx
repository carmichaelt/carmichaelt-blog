import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { NavbarAuth } from "./navbar-auth";

// Server component for static navbar structure
const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center p-4">
        <div>
          <Link href="/">
            <Image src="/tc-logo.png" alt="logo" width={100} height={100} />
          </Link>
        </div>
        <NavbarAuth />
      </div>
      <Separator />
    </>
  );
};

export default Navbar;
