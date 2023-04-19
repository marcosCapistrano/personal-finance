import React from "react";
import Image from "next/image";
import UserAvatar from "@/components/navbar/UserAvatar";

const PrimaryNavbar = () => {
  return (
    <div className="flex justify-between pt-4">
      <div className="w-24 flex flex-col items-center">
        <Image alt="logo" src="/images/logo.png" width={50} height={50} />
      </div>
      <div className="w-24 flex flex-col items-center">
        <UserAvatar />
      </div>
    </div>
  );
};

export default PrimaryNavbar;
