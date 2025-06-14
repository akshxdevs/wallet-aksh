"use client";
import { useRecoilValue } from "recoil";
import { Navbar } from "./Components/NavBar";
import { WalletGenerator } from "./Components/WalletGenerator";
import { themeState } from "./store/themeAtom";
import { BottomText } from "./Components/BottomText";
export default function Home() {
  const theme = useRecoilValue(themeState);
  console.log(theme);
  
  return (
    <div
      className={`
        min-h-screen flex flex-col
        ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}
      `}
    >
      <Navbar />
      <div className="flex-grow">
        <WalletGenerator />
      </div>
      <BottomText />
    </div>
  );
}
