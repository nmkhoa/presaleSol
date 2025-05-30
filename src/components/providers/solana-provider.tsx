/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
  TrustWalletAdapter,
  WalletConnectWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { BackpackWalletAdapter } from "../wallets/backpack-wallet-adapter";
import { GlowWalletAdapter } from "../wallets/glow-wallet-adapter";
import { networkEnpoint, networkKey } from "@/constants/environment";
import { clusterApiUrl } from "@solana/web3.js";

export const network =
  networkKey === "devnet"
    ? WalletAdapterNetwork.Devnet
    : WalletAdapterNetwork.Mainnet;

export const SolanaProvider = ({ children }: any) => {
  const endpoint =
    networkKey === "devnet" ? clusterApiUrl(network) : networkEnpoint;

  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new BackpackWalletAdapter(),
    new GlowWalletAdapter(),
    new LedgerWalletAdapter(),
    new TrustWalletAdapter(),
    new WalletConnectWalletAdapter({
      network,
      options: {
        projectId: "63fa01b3e1644ed2f5a06e4747cc81ca",
      },
    }),
  ];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
