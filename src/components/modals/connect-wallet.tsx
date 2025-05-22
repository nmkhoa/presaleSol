import { Box, Dialog, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import {
  allWalletsSupported,
  walletDetectStatus,
} from "../../constants/wallets";
import { useWallet } from "@solana/wallet-adapter-react";

interface Props {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const ConnectWalletModal = ({ showModal, setShowModal }: Props) => {
  const { wallets, select, connect } = useWallet();

  const allWallets = useMemo(
    () =>
      wallets?.filter((w) =>
        allWalletsSupported?.some((aw) => aw === w.adapter.name)
      ),
    [wallets]
  );

  const onConnectWallet = (wallet: string) => {
    const selectedWallet = allWallets?.find(
      (w) => w.adapter.name === wallet
    )?.adapter;
    if (
      selectedWallet &&
      (selectedWallet.readyState === walletDetectStatus.installed ||
        selectedWallet.readyState === walletDetectStatus.loadable)
    ) {
      select(selectedWallet.name);
      connect();
      setShowModal(false);
    } else if (selectedWallet) {
      window.open(selectedWallet.url, "_blank");
      select(null);
    }
  };

  return (
    <Dialog.Root placement={"center"} size={"xs"} open={showModal}>
      <Dialog.Backdrop
        pointerEvents={"all"}
        onClick={() => setShowModal(false)}
      />
      <Dialog.Positioner pointerEvents={"none"}>
        <Dialog.Content
          padding={"1px"}
          background={
            "linear-gradient(171.2deg, rgba(81, 88, 96, 0.07) 13.37%, #31353A 93.3%)"
          }
          borderRadius={"30px"}
        >
          <Box
            padding={"30px 0"}
            background={
              "linear-gradient(182.62deg, #151515 -11.16%, #1D1D1D 100%)"
            }
            borderRadius={"29px"}
          >
            <Text
              textAlign={"center"}
              fontSize={"24px"}
              lineHeight={"24px"}
              fontWeight={600}
            >
              Connect a wallet
            </Text>
            <Box pt={"12px"}>
              {allWallets?.map((w) => {
                return (
                  <div
                    className="flex gap-2 items-center justify-start !py-[10px] !px-7 cursor-pointer hover:bg-gray-600"
                    onClick={() => onConnectWallet(w.adapter.name)}
                  >
                    <img
                      src={w.adapter.icon}
                      className="w-[24px] h-[24px]"
                      alt={w.adapter.name}
                    />
                    <span className="!text-[16px] leading-[24px] !font-medium">
                      {w.adapter.name}
                    </span>
                    <span className="!ml-auto !text-xs !text-gray-400">
                      {w.adapter.readyState === walletDetectStatus.installed &&
                        "Detected"}
                    </span>
                  </div>
                );
              })}
            </Box>
          </Box>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default ConnectWalletModal;
