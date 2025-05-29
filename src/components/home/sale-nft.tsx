import { Box, Link, Text } from "@chakra-ui/react";

const SaleWithoutNFT = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt="100px"
    >
      <Text
        textAlign={"center"}
        fontSize={"14px"}
        fontWeight={500}
        xl={{ mt: "56px", fontSize: "16px" }}
      >
        We can not find any special Unich NFT in your wallet.{" "}
        <Link
          href="https://discord.com/invite/unich"
          target="_blank"
          color={"#FF9A0D"}
        >
          Learn more
        </Link>
      </Text>
    </Box>
  );
};

export default SaleWithoutNFT;
