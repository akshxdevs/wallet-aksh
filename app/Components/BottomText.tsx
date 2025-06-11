"use client";
import { useRecoilValue } from "recoil"
import { themeState } from "../store/themeAtom"

export const BottomText = () => {
    const theme =useRecoilValue(themeState)
    return <div className={`${theme === "light" ? "bg-white text-black" : "bg-black text-white" }`}> 
        <div className={`px-4 py-8 border ${theme == "light" ? "border-gray-400" : "border-gray-700"}`}>
            <p className="text-xl font-normal">Designed and Developed by Akash</p>
        </div>
    </div>
}