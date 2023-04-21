import React from "react";
import ClientOnly from "@/ui/ClientOnly";
import Auth from "@/components/auth/Auth";

const AuthPage = () => {
  return (
    <ClientOnly>
        <Auth />
    </ClientOnly>
  );
};

export default AuthPage;
