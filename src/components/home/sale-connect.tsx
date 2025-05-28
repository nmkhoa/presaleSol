import { Box, Link, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { ConnectWalletContext } from "../../contexts/connect-wallet-context";

const SaleWithoutConnectWallet = () => {
  const { setShowModal } = useContext(ConnectWalletContext);

  return (
    <Box>
      <Text
        mt={"36px"}
        textAlign={"center"}
        fontSize={"14px"}
        fontWeight={500}
        xl={{ mt: "56px", fontSize: "16px" }}
      >
        Whitelist round is only eligible for users who own special UNICH NFT.
        Please connect your wallet, or{" "}
        <Link href="" target="_blank" color={"#FF9A0D"}>
          Learn more
        </Link>
      </Text>
      <Box
        className="btn-connect-wallet"
        w={"fit-content"}
        mt={"36px"}
        mx={"auto"}
        cursor={"pointer"}
        onClick={() => setShowModal(true)}
      >
        <div>Connect Wallet</div>
      </Box>
    </Box>
  );
};

export default SaleWithoutConnectWallet;
