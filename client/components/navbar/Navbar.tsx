import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../../ui/Container";

const Navbar = () => {
  return (
       <div className="flex items-center pt-2">
      <div className="flex justify-start flex-1 gap-8">
        <div>
          <Link href="#">ABOUT</Link>
        </div>
        <div>
          <Link href="#">PRICING</Link>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center text-5xl">
        <Image alt="logo" src="/images/logo.png" width={62} height={65} />
        <span className="">fincare</span>
      </div>

      <div className="flex flex-1 justify-end">
        <div>
          <Link href="/auth" className="bg-color2 p-3 text-color5 font-semibold rounded-md">
            TRY IT OUT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
