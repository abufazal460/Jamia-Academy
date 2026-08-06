import React from "react";
import SpaceBackground from "../components/contactBackground/SpaceBackground";

// Login.jsx — Placeholder page.
// WHY alag route /login: Pehle Contact aur Login same route share karte the,
// jis se Contact link galat active ho jaata tha. Ab dono clearly alag hain.
function Login() {
  return (
    <main className="h-screen w-full flex justify-center items-center flex-col text-slate-100">
      <h1 className="text-3xl font-bold text-red-300">Login</h1>
      <p className="mt-2 text-slate-800">Login page — placeholder content.</p>
      <SpaceBackground />
    </main>
  );
}

export default Login;
