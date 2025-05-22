/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode } from "react";
import ConnectWalletModal from "../components/modals/connect-wallet";
import { useWallet } from "@solana/wallet-adapter-react";

interface ProviderProps {
  children: ReactNode;
}

interface ContextProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  onDisconnectWallet: () => void;
}

export const ConnectWalletContext = createContext<ContextProps>({
  showModal: false,
  setShowModal: () => {},
  onDisconnectWallet: () => {},
});

export const ConnectWalletProvider = ({ children }: ProviderProps) => {
  const [showModal, setShowModal] = useState(false);
  const { select, disconnect } = useWallet();

  const onDisconnectWallet = () => {
    disconnect();
    select(null);
  };

  return (
    <ConnectWalletContext.Provider
      value={{ showModal, setShowModal, onDisconnectWallet }}
    >
      {children}
      <ConnectWalletModal showModal={showModal} setShowModal={setShowModal} />
    </ConnectWalletContext.Provider>
  );
};
