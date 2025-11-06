# Wallet-Aksh

A Solana wallet management dApp for connecting, viewing balances, and performing basic transactions. Powered by Next.js and Solana Web3.js.

## Overview

Wallet-Aksh is a personalized Solana wallet interface that enables seamless connection to popular wallets like Phantom, displays real-time balances, facilitates airdrops on devnet, and supports token transfers and message signing. Designed as a customizable starter for Akash's Web3 projects, it provides an intuitive UI for testing and integrating wallet functionalities in Solana dApps.

## Getting Started

1\. Install the dependencies:

```bash

npm install

# or

yarn install

# or

pnpm install

```

2\. Run the development server:

```bash

npm run dev

# or

yarn dev

# or

pnpm dev

```

3\. Open [http://localhost:3000](http://localhost:3000) to see the demo app.

## Integration Guide

### 1. Configure Wallet Adapters

Update `app/providers.tsx` to define supported wallets:

```typescript

// app/providers.tsx

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';

import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

export default function Providers({ children }: { children: React.ReactNode }) {

  const network = WalletAdapterNetwork.Devnet;

  const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';

  const wallets = [new PhantomWalletAdapter()];

  return (

    <ConnectionProvider endpoint={endpoint}>

      <WalletProvider wallets={wallets} autoConnect>

        {children}

      </WalletProvider>

    </ConnectionProvider>

  );

}

```

### 2. Embed the Wallet Component

Incorporate the wallet features into your page.

```tsx

// In app/page.tsx

import { useWallet } from '@solana/wallet-adapter-react';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { BalanceView, AirdropBtn, TransferForm } from '@/components/wallet';

export default function WalletPage() {

  const { publicKey } = useWallet();

  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-8">

      <h1 className="text-4xl font-bold text-white mb-8">Wallet Aksh - Solana Hub</h1>

      <WalletMultiButton className="mb-4" />

      {publicKey && (

        <div className="space-y-4">

          <BalanceView />

          <AirdropBtn />

          <TransferForm />

        </div>

      )}

    </div>

  );

}

```

### 3. Customize the Look

Built with Tailwind CSS and Geist font. Customize through:

- Tailwind classes in `globals.css`

- Theme props on components

- Vercel previews for live tweaks

## Features

- 👛 Wallet connection with auto-detect

- 💰 Live SOL and token balance fetching

- 🪂 One-click devnet airdrops

- 📱 Mobile-responsive design

- 🔐 Secure message signing

- 🎨 Custom Aksh-themed gradients

- 🚀 Quick transaction builder

- ⚡️ Real-time notifications

## Learn More

- [Project Demo](https://wallet-aksh.vercel.app)

- [Solana Wallet Docs](https://docs.solana.com/wallet-guide)

- [Next.js Solana Integration](https://nextjs.org/docs)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
