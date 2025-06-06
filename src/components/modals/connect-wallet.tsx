import { Box, Dialog, Flex, Grid, Image, Link, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import {
  allWalletsSupported,
  walletDetectStatus,
} from "../../constants/wallets";
import { useWallet } from "@solana/wallet-adapter-react";
import { policyLink } from "@/constants/home";

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
    <Dialog.Root placement={"center"} size={"md"} open={showModal}>
      <Dialog.Backdrop
        pointerEvents={"all"}
        onClick={() => setShowModal(false)}
      />
      <Dialog.Positioner pointerEvents={"none"}>
        <Dialog.Content
          padding={"1px"}
          background={
            "linear-gradient(171.2deg, var(--connect-wallet-border-light) 13.37%, var(--connect-wallet-border-normal) 93.3%)"
          }
          borderRadius={"12px"}
        >
          <Box
            p={"20px"}
            background={
              "linear-gradient(182.62deg, var(--connect-wallet-bg-light) -11.16%, var(--connect-wallet-bg-normal) 100%)"
            }
            borderRadius={"11px"}
          >
            <Flex gap={"4px"} justifyContent={"space-between"}>
              <Box>
                <Text fontSize={"18px"} color={"white"} fontWeight={700}>
                  Connect wallet
                </Text>
                <Text mt={"4px"} fontWeight={500}>
                  Start by connecting with one of the wallets below
                </Text>
              </Box>
              <Image
                src="/images/close.svg"
                w={"28px"}
                minW={"28px"}
                h={"28px"}
                cursor={"pointer"}
                alt="close"
                onClick={() => setShowModal(false)}
              />
            </Flex>
            <Box h={"1px"} my={"20px"} bg={"white"} opacity={"0.1"} />
            <Text fontSize={"14px"} fontWeight={700}>
              Popular wallet
            </Text>
            <Grid gap={"8px"} maxH={"230px"} pt={"8px"} overflow={"auto"}>
              {allWallets?.map((w) => {
                return (
                  <Flex
                    gap={"12px"}
                    p={"4px"}
                    bg={"var(--progress-out-bg)"}
                    borderRadius={"12px"}
                    alignItems={"center"}
                    cursor={"pointer"}
                    _hover={{ color: "var(--select-hover-color)" }}
                    onClick={() => onConnectWallet(w.adapter.name)}
                  >
                    <Image
                      src={w.adapter.icon}
                      w={"60px"}
                      h={"60px"}
                      objectFit={"contain"}
                      alt={w.adapter.name}
                    />
                    <Text fontSize={"14px"} fontWeight={500}>
                      {w.adapter.name}
                    </Text>
                  </Flex>
                );
              })}
            </Grid>
            <Box h={"1px"} my={"20px"} bg={"white"} opacity={"0.1"} />
            <Text fontSize={"14px"} fontWeight={500} letterSpacing={"0%"}>
              By connecting your wallet, you agree to the{" "}
              <Link
                href={policyLink.termAndConditions}
                textDecoration={"underline"}
                target="_blank"
              >
                Terms of Service
              </Link>
              , and have read and aknowledge our
              <Link
                href={policyLink.privacyPolicy}
                textDecoration={"underline"}
                target="_blank"
              >
                Privacy Policy
              </Link>
              .
            </Text>
          </Box>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default ConnectWalletModal;
