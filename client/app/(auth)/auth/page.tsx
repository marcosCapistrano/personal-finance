import React from "react";
import Image from "next/image";
import Auth from "@/components/auth/Auth";

const AuthPage = () => {
  const bgImages = [];
  for (let i = 0; i < 10; i++) bgImages.push({ id: i });

  return (
    <>
      <div
        className="
        absolute
        w-full
        h-screen
      "
      >
        <div
          className="
      flex justify-around items-center h-screen
    "
        >
          <div className="flex flex-col items-center w-1/3">
            <Image src="/images/logo.png" alt="logo" width={160} height={160} />
            <span className="text-8xl">fincare</span>
          </div>

          <div className="w-2/3">
            <Auth/>
          </div>
        </div>
      </div>

      <div
        className="
        bg-gradient-to-b from-color5 to-color1
        w-full
        h-screen
      "
      >
        <div
          className="
          w-full
          h-screen
          bg-[url('/images/auth-bg.png')]
        "
        ></div>
      </div>
    </>
  );
};

export default AuthPage;
