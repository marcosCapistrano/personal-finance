"use client";
import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidenav = () => {
  return (
    <div
      className="
      h-full
      w-72
      fixed
      top-0
      left-0
      bg-color2
      overflow-x-hidden
      pt-4
      transition
      duration-150
    "
    >
      <div className="flex flex-col items-center">
        <Image src="/images/sidebar/avatar.png" alt="avatar image" width={60} height={60} 
        className="pb-8"/>
        <NavItem
          imageUrl="/images/logo-white.png"
          text="Home"
          navUrl="/dashboard"
        />
        <NavItem
          imageUrl="/images/sidebar/accounts.png"
          text="Accounts"
          navUrl="/dashboard/accounts"
        />
        <NavItem
          imageUrl="/images/sidebar/transactions.png"
          text="Transactions"
          navUrl="/dashboard/transactions"
        />
      </div>
    </div>
  );
};

export default Sidenav;

interface NavItemProps {
  imageUrl: string;
  text: string;
  navUrl: string;
}

const NavItem: React.FC<NavItemProps> = ({ imageUrl, text, navUrl }) => {
  const pathname = usePathname();
  const isSelected = pathname === navUrl;

  return (
    <div className="w-full py-6">
      <Link href={navUrl}>
        <div className="relative">
          <div className="flex items-center justify-between px-8 z-10">
            <Image src={imageUrl} alt="image" width={22} height={22} />
            <div className="text-white flex-1 text-center text-lg">{text}</div>
          </div>
          <div
            className={`
        absolute 
        h-full 
        w-full
        top-1/2 
        -left-8
        py-8 
        -translate-y-1/2
        -translate-x-full
        z-[-1]
        mr-8
        rounded-full
        transition
        duration-300
        ${isSelected && "bg-orange-500 && translate-x-0"}
        `}
          ></div>
        </div>
      </Link>
    </div>
  );
};
