"use client";
import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidenavProps {
  // children: React.ReactNode;
  topElement: React.ReactElement;
}

const Sidenav: React.FC<SidenavProps> = ({ topElement }) => {
  const [selected, setSelected] = useState(0);

  console.log(selected);

  return (
    <div className="float-right w-72 h-screen">
      <div className="fixed h-full w-72 bg-color1 rounded-r-xl">
        <div className="flex flex-col items-center gap-4 mt-8">
          {topElement}
          <div className="flex flex-col items-center mt-4 gap-8 w-full">
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

  console.log(isSelected);
  return (
    <Link
      href={navUrl}
      className={classNames(
        "w-full py-4 transition duration-300 mr-14 rounded-r-full text-center",
        isSelected && "bg-orange-500 shadow-md"
      )}
    >
      <div className="
        flex
        w-full
        items-center
        justify-start
        gap-8
      ">
        <Image
          src={imageUrl}
          alt="image"
          width={22}
          height={22}
          className="ml-14"
        />
        <span className="text-white">{text}</span>
      </div>
    </Link>
  );
};
