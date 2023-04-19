'use client'
import React, {useState} from "react";
import Image from "next/image";
import classNames from "classnames";

interface SidenavProps {
  children: React.ReactNode;
  topElement: React.ReactElement;
}

const Sidenav: React.FC<SidenavProps> = ({ topElement, children }) => {
  const [selected, setSelected] = useState(0);

  console.log(selected)

  return (
    <div className="float-right w-72 bg-color1 rounded-r-xl">
      <div className="fixed h-full w-72">
        <div className="flex flex-col items-center gap-4 mt-8">
          {topElement}
          <div className="flex flex-col items-center mt-4 gap-8 w-full">
            <NavItem id={0} imageUrl="/images/logo-white.png" text="Home" isSelected={selected === 0} setSelected={setSelected}/>
            <NavItem id={1} imageUrl="/images/logo-white.png" text="Home" isSelected={selected === 1} setSelected={setSelected}/>
            <NavItem id={2} imageUrl="/images/logo-white.png" text="Home" isSelected={selected === 2} setSelected={setSelected}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;

interface NavItemProps {
  id: number;
  imageUrl: string;
  text: string;
  isSelected: boolean;
  setSelected: (key: number) => void;
}

const NavItem: React.FC<NavItemProps> = ({ id, imageUrl, text, isSelected, setSelected }) => {
  console.log(id, isSelected)
  return (
    <div onClick={() => {
      console.log("selecting: ", id)
      console.log(isSelected)
      setSelected(id)
    }} className={classNames("flex gap-4 w-full items-center justify-center py-4 transition duration-300 mr-14 rounded-r-full", isSelected && "bg-orange-500 shadow-md")}>
      <Image src={imageUrl} alt="image" width={25} height={25} className="ml-14"/>
      <span className="text-white">{text}</span>
    </div>
  );
};
