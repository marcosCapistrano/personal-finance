'use client'
import React from "react";
import * as Avatar from "@radix-ui/react-avatar";

const UserAvatar = () => {
  return (
    <Avatar.Root>
      <Avatar.Image 
      className=""
      src="/images/avatar.png"
      alt="avatar image"
      width={40}
      height={40}/>

      {/* <Avatar.Fallback /> */}
    </Avatar.Root>
  );
};

export default UserAvatar;
