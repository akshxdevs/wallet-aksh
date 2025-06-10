"use client";

import { useRecoilValue } from "recoil";
import { themeState } from "../store/themeAtom";
import { generateMnemonic } from "bip39";
import { useEffect, useState } from "react";

export const WalletGenerator = () => {
    const theme = useRecoilValue(themeState);
    const [mnemonic,setMnemonic] = useState("");
    const [walletSelected,setWalletSelected] = useState(false)
    const [WalletName,setWalletName] = useState("")
    const [showMn,setShowMn] = useState(false);
    const [showDownArrow,setShowDownArrow] = useState(false);
    useEffect(()=>{
        const savedMn = localStorage.getItem("mnemonics");
        if (savedMn) setMnemonic(savedMn);
    },[])
    const handleMnemonic = async() => {
        if (!mnemonic) {
            const mn = await generateMnemonic();
            setMnemonic(mn);
            localStorage.setItem("mnemonics",mn)
        }
    }

    return <div>
        {walletSelected ? (
            <div className="max-w-screen-lg mx-auto">
                <div className={`flex justify-between border ${theme === "light" ? "border-gray-900 " :"border-gray-400 "} p-10 rounded-lg`}>
                    <h1 className="text-2xl font-semibold">Your Seed Phrase</h1>
                    {showDownArrow ? (
                        <button onClick={()=>{
                            setShowMn(false);
                            setShowDownArrow(false);
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>
                        </button>
                    ) :(
                    <button onClick={()=>{
                        setShowMn(true);
                        setShowDownArrow(true);
                        handleMnemonic}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                    </button>
                    )}

                </div>
                <div className={``}>
                    {showMn && (
                        <div className="p-10">
                            {mnemonic}
                        </div>
                    )}
                </div>
                <div className={`flex justify-between py-8`}>
                    <div>
                        <h1 className="text-4xl font-semibold">{WalletName}</h1>
                    </div>
                    <div className="flex gap-4">
                        <button className={`px-8 py-2 mb-2 ${theme === "light" ? "bg-black text-white" : "bg-gray-100 text-black" } rounded-lg`}>Add Wallet</button>
                        <button className={`px-8 py-2 mb-2 ${theme === "light" ? "bg-black text-white" : "bg-gray-100 text-black" } rounded-lg`} onClick={()=>{
                            localStorage.clear();
                            setWalletSelected(false);
                        }}>Clear Wallets</button>
                    </div>
                </div>
            </div>
        ):(
            <div className="max-w-screen-lg mx-auto">
                <h1 className="text-4xl font-extrabold pb-1">Aksh supports multiple blockchains</h1>
                <p className={`text-md ${theme === "light" ? "text-gray-900" : "text-gray-100" } pb-3`}>choose a blockchain to get started.</p>
                <div className="flex gap-2">
                    <button className={`px-8 py-2 mb-2 ${theme === "light" ? "bg-black text-white" : "bg-gray-100 text-black" } rounded-lg`} onClick={()=>{
                            setWalletName("Solana")
                            setWalletSelected(true);}}>Solana</button>
                    <button className={`px-8 py-2 mb-2 ${theme === "light" ? "bg-black text-white" : "bg-gray-100 text-black" } rounded-lg`} onClick={()=>{
                        setWalletName("Ethereum")
                        setWalletSelected(true)}}>Ethereum</button>
                </div>
            </div>
        )}
    </div>
}