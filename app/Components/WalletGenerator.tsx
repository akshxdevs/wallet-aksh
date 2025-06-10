"use client";

import { useRecoilValue } from "recoil";
import { themeState } from "../store/themeAtom";
import { generateMnemonic } from "bip39";
import { useEffect, useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from 'bs58'; 

interface WalletInfo {
  publicKey: PublicKey;
  privateKey: Uint8Array;
}

export const WalletGenerator = () => {
    const theme = useRecoilValue(themeState);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [wallets, setWallets] = useState<WalletInfo[]>([]);
    const [mnemonic,setMnemonic] = useState<string>("");
    const [WalletName,setWalletName] = useState<string>("")
    const [privateKeyVisibility, setPrivateKeyVisibility] = useState<boolean[]>([]);
    const [showMn,setShowMn] = useState(false);
    const [showDownArrow,setShowDownArrow] = useState(false);
    const Uint8ArrayToBase58 = (arr: Uint8Array): string => {
        return bs58.encode(arr);
    };

      const addWallet = async () => {
        const mnemonic = await generateMnemonic();
        try {
          if (!mnemonic || typeof mnemonic !== 'string' || mnemonic.trim() === "") {
            console.log("Mnemonic cannot be empty or invalid.");
            return;
          }
    
          const seedBuffer: Buffer = mnemonicToSeedSync(mnemonic);
          const seedHex: string = seedBuffer.toString("hex");
          const path: string = `m/44'/501'/${currentIndex}'/0'`;
          const { key: derivedSeed }: { key: Buffer } = derivePath(path, seedHex);
    
          const secretKey: Uint8Array = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair: Keypair = Keypair.fromSecretKey(secretKey);
    
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setWallets((prevWallets) => [
            ...prevWallets,
            {
              publicKey: keypair.publicKey,
              privateKey: keypair.secretKey,
            },
          ]);
        } catch (err) {
          console.error("Error adding wallet:", err);
        }
      };

    useEffect(()=>{
        const savedWalletName = localStorage.getItem("walletName");
        if (savedWalletName) setWalletName(savedWalletName)
        const savedMn = localStorage.getItem("mnemonics");
        if (savedMn) setMnemonic(savedMn)
    },[]);
    const handleMnemonic = async() => {
        if (!mnemonic) {
            const mn = await generateMnemonic();
            setMnemonic(mn);
            localStorage.setItem("mnemonics",mn)
        }
    }
    const togglePrivateKeyVisibility = (index: number) => {
        setPrivateKeyVisibility(prevVisibility => {
        const newVisibility = [...prevVisibility];
        newVisibility[index] = !newVisibility[index]; 
        return newVisibility;
        });
    };
    const deleteWallet = (indexToDelete: number) => {
    setWallets(prevWallets => prevWallets.filter((_, i) => i !== indexToDelete));
    setPrivateKeyVisibility(prevVisibility => prevVisibility.filter((_, i) => i !== indexToDelete));
    };
    return <div>
        {WalletName ? (
            <div className="max-w-screen-lg mx-auto">
                <div className={`flex justify-between border ${theme === "light" ? "" :"border-gray-400 "} p-10 rounded-lg`}>
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
                        handleMnemonic()}}>
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
                        <button className={`px-8 py-2 mb-2 ${theme === "light" ? "bg-black text-white" : "bg-gray-100 text-black" } rounded-lg`} onClick={()=>{
                        addWallet();
                        }}>Add Wallet</button>
                        <button className={`px-8 py-2 mb-2 ${theme === "light" ? "bg-green-800 text-white" : "bg-green-800 text-black" } rounded-lg`} onClick={()=>{
                            localStorage.clear();
                            setWalletName("");
                        }}>Clear Wallets</button>
                    </div>
                </div>
                {wallets.length === 0 && <p>No wallets added yet.</p>}
                {wallets.map((wallet, index) => (
                    <div key={index} className="flex my-5 flex-col gap-5 border border-gray-800 rounded-xl">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-3xl px-8 pt-5">Wallet {index + 1}</h1>
                            </div>
                            <div>
                                <button className="px-8 pt-5" onClick={()=>{ deleteWallet(index)}}>
                                    <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/40C057/waste.png" alt="waste"/>
                                </button>
                            </div>
                        </div>
                        <div className={`${theme ==="light" ? "bg-gray-100": "bg-black"} rounded-xl`}>
                            <div className="px-8 py-4">
                                <h1 className="text-xl pb-2">Public Key</h1>
                                <p className="text-gray-400">{wallet.publicKey.toBase58()}</p>
                            </div>
                            <div className="px-8"> 
                                <h1 className="text-xl pb-2">Private key</h1>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-gray-400 break-all">
                                            {privateKeyVisibility[index] ? Uint8ArrayToBase58(wallet.privateKey) : "********************************************************************************"}
                                        </p>
                                    </div>
                                    <div>
                                        <button
                                        onClick={() => togglePrivateKeyVisibility(index)}
                                        className="ml-2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                                        aria-label={privateKeyVisibility[index] ? "Hide Private Key" : "Show Private Key"}
                                        >
                                        {privateKeyVisibility[index] ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ):(
            <div className="max-w-screen-lg mx-auto">
                <h1 className="text-4xl font-extrabold pb-1">Aksh supports multiple blockchains</h1>
                <p className={`text-md ${theme === "light" ? "text-gray-900" : "text-gray-100" } pb-3`}>choose a blockchain to get started.</p>
                <div className="flex gap-2">
                    <button className={`px-8 py-2 mb-2 ${theme === "light" ? "bg-black text-white" : "bg-gray-100 text-black" } rounded-lg`} onClick={()=>{
                        const name = "Solana"
                        setWalletName(name)
                        localStorage.setItem("walletName",name);}}>Solana</button>
                    <button className={`px-8 py-2 mb-2 ${theme === "light" ? "bg-black text-white" : "bg-gray-100 text-black" } rounded-lg`} onClick={()=>{
                        const name = "Ethereum"
                        setWalletName(name)
                        localStorage.setItem("walletName",name);}}>Ethereum</button>
                </div>
            </div>
        )}
        <div>

        </div>
    </div>
}