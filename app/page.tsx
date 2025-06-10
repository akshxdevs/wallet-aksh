"use client";
import { Navbar } from "./Components/NavBar";
import { WalletGenerator } from "./Components/WalletGenerator";
import { useState } from "react";

export default function Home() {
  const [theme,] = useState("black");
  return (
    <div>
      <Navbar theme={theme}/>
      <WalletGenerator/>
    </div>
  );
}
