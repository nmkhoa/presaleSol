import {
  Box,
  Button,
  Dialog,
  Flex,
  Grid,
  Image,
  Text,
  Clipboard,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useContext, useMemo } from "react";
import { getAddressFormat } from "../../../utils";
import { ConnectWalletContext } from "../../../contexts/connect-wallet-context";
import { walletsIcon } from "@/constants/wallets";

const ConnectWalletButton = () => {
  const { setShowModal, onDisconnectWallet } = useContext(ConnectWalletContext);
  const { publicKey, connected, wallet } = useWallet();

  const currentWalletIcon = useMemo(() => {
    if (!wallet?.adapter?.name) return "";
    return walletsIcon?.[wallet?.adapter?.name] || "";
  }, [wallet?.adapter?.name]);

  return (
    <Flex>
      {connected ? (
        <Dialog.Root placement={"center"} size={"xs"}>
          <Dialog.Trigger>
            <Flex
              overflow={"hidden"}
              border={"1px solid var(--border-method-normal)"}
              borderRadius={"6px"}
            >
              <Box
                display={{ base: "none", xl: "block" }}
                px={"12px"}
                py={"8px"}
                fontSize={"14px"}
                fontWeight={500}
                className="bg-neutral-700 rounded-l-[5px]"
              >
                {getAddressFormat(publicKey?.toBase58() ?? "")}
              </Box>
              <Flex
                gap={"4px"}
                className="!px-2 !py-[10px] bg-neutral-900 rounded-r-[8px]"
              >
                <img
                  src="/images/solana.png"
                  className="w-[16px] h-[16px]"
                  alt=""
                />
                <img
                  src="/images/arrow_down.svg"
                  className="w-[16px] h-[16px]"
                  alt=""
                />
              </Flex>
            </Flex>
          </Dialog.Trigger>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Box
                p={"20px"}
                background={
                  "linear-gradient(145.6deg, var(--bg-sold-light) 40.65%, var(--bg-sold-normal) 95.33%)"
                }
                borderRadius={"8px"}
              >
                <Text fontSize={"20px"} fontWeight={700}>
                  Your Wallet
                </Text>
                <Flex
                  gap={"12px"}
                  my={"8px"}
                  padding={"8px"}
                  alignItems={"center"}
                  border={
                    "1px solid var(--Color-Neutral-600, var(--border-method-normal))"
                  }
                  borderRadius={"12px"}
                >
                  <Image
                    src={currentWalletIcon}
                    w={"80px"}
                    minW={"80px"}
                    h={"80px"}
                    borderRadius={"12px"}
                    alt="wallet"
                  />
                  <Box>
                    <Text fontSize={"18px"} fontWeight={600}>
                      {wallet?.adapter?.name || ""}
                    </Text>
                    <Text color={"var(--table-head-color)"} fontWeight={600}>
                      {getAddressFormat(publicKey?.toBase58() ?? "")}
                    </Text>
                  </Box>
                </Flex>
                <Grid gap={"8px"} className="grid-cols-5">
                  <Clipboard.Root
                    value={publicKey?.toBase58()}
                    className="col-span-3"
                  >
                    <Clipboard.Trigger asChild>
                      <Button w={"100%"}>
                        <Clipboard.Indicator />
                        Copy address
                      </Button>
                    </Clipboard.Trigger>
                  </Clipboard.Root>
                  <Button
                    className="col-span-2"
                    background={
                      "linear-gradient(90deg, var(--btn-secondary-bg-medium) 0%, var(--bnt-secondary-bg-semi) 111.06%)"
                    }
                    color={"white"}
                    onClick={() => onDisconnectWallet()}
                  >
                    Disconnect
                  </Button>
                </Grid>
              </Box>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      ) : (
        <Box
          className="btn-connect-wallet"
          cursor={"pointer"}
          onClick={() => setShowModal(true)}
        >
          <Box
            px={"12px !important"}
            py={"8px !important"}
            fontSize={"12px !important"}
            md={{
              px: "20px !important",
              py: "12px !important",
              fontSize: "16px !important",
            }}
          >
            Connect wallet
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default ConnectWalletButton;
