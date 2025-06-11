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
    <div className={`${theme === "light" ? "bg-white text-black" : "bg-#0a0a0a text-white"}`}>
      <Navbar/>
      <WalletGenerator/>
      {/* <div className="fixed sm:top-[130px] md:top-[460px] lg:top-[940px]">
          <BottomText/>
      </div> */}
    </div>
  );
}
