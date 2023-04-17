import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../Container";

const Navbar = () => {
  return (
       <div className="flex items-center">
      <div className="flex justify-start flex-1 gap-8">
        <div>
          <Link href="#">ABOUT</Link>
        </div>
        <div>
          <Link href="#">PRICING</Link>
        </div>
      </div>
      <div>
        <Image alt="logo" src="/images/logo-big.png" width={220} height={70} />
      </div>

      <div className="flex flex-1 justify-end">
        <div>
          <Link href="/auth" className="bg-[#fc4c69] p-3 text-white font-semibold rounded-md">
            TRY IT OUT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
