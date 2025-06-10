"use client";
import { useRecoilValue } from "recoil";
import { Navbar } from "./Components/NavBar";
import { WalletGenerator } from "./Components/WalletGenerator";
import { themeState } from "./store/themeAtom";
export default function Home() {
  const theme = useRecoilValue(themeState);
  console.log(theme);
  
  return (
    <div className={`${theme === "light" ? "bg-white text-black" : "bg-#0a0a0a text-white"}`}>
      <Navbar/>
      <WalletGenerator/>
    </div>
  );
}
