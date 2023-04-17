import React from "react";
import ClientOnly from "../components/ClientOnly";
import Auth from "../components/auth/Auth";

const AuthPage = () => {
  return (
    <ClientOnly>
        <Auth />
    </ClientOnly>
  );
};

export default AuthPage;
