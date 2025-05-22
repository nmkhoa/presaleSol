import { Box, Flex, Popover } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useContext } from "react";
import { getAddressFormat } from "../../../utils";
import { ConnectWalletContext } from "../../../contexts/connect-wallet-context";

const ConnectWalletButton = () => {
  const { setShowModal, onDisconnectWallet } = useContext(ConnectWalletContext);
  const { publicKey, connected } = useWallet();

  return (
    <div className="flex">
      {connected ? (
        <Popover.Root>
          <Popover.Trigger>
            <Flex className="!border !border-neutral-600 !rounded-[8px]">
              <div className="bg-neutral-700 !px-3 !py-2 !text-sm !font-medium rounded-l-[8px]">
                {getAddressFormat(publicKey?.toBase58() ?? "")}
              </div>
              <Flex
                gap={"4px"}
                className="!px-2 !py-[10px] bg-neutral-900 rounded-r-[8px]"
              >
                <img src="/images/solana.svg" className="w-[16px] h-[16px]" alt="" />
                <img
                  src="/images/arrow_down.svg"
                  className="w-[16px] h-[16px]"
                  alt=""
                />
              </Flex>
            </Flex>
          </Popover.Trigger>
          <Popover.Positioner>
            <Popover.Content w={"fit-content"}>
              <Popover.Body
                w={"fit-content"}
                p={"12px 20px"}
                cursor={"pointer"}
                onClick={() => onDisconnectWallet()}
              >
                Disconnect
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Popover.Root>
      ) : (
        <Box
          className="btn-connect-wallet"
          cursor={"pointer"}
          onClick={() => setShowModal(true)}
        >
          <div>Connect wallet</div>
        </Box>
      )}
    </div>
  );
};

export default ConnectWalletButton;
