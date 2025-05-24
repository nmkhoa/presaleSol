import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { paymentMethods } from "../../constants/home";
import { useContext, useMemo, useState } from "react";
import { ConnectWalletContext } from "../../contexts/connect-wallet-context";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUnichProgram } from "@/hooks/use-program";
import { Transaction } from "@solana/web3.js";
import { useAnchorProvider } from "@/hooks/use-anchor-provider";
import { baseNumbTokenValue } from "@/constants/contract";
import { BN } from "@coral-xyz/anchor";
import type { SaleAccountInfoType } from "@/types/home";
import { formatAmount } from "@/utils";
import SaleWithoutConnectWallet from "./sale-connect";

interface Props {
  saleAccountInfo: SaleAccountInfoType | null;
  tokenBalanceSol: number;
  tokenBalanceUsdc: number;
  tokenBalanceUsdt: number;
}

const PublicSale = ({
  saleAccountInfo,
  tokenBalanceSol,
  tokenBalanceUsdc,
  tokenBalanceUsdt,
}: Props) => {
  const { connected, publicKey } = useWallet();
  const [method, setMethod] = useState(paymentMethods[0]);
  const { setShowModal } = useContext(ConnectWalletContext);
  const [inputAmount, setInputAmount] = useState("");
  const program = useUnichProgram();
  const provider = useAnchorProvider();
  const [loadingPurchase, setLoadingPurchase] = useState(false);

  const handleBuyUn = async () => {
    if (!inputAmount || !publicKey || errorMessage) return;
    try {
      setLoadingPurchase(true);
      const transaction = new Transaction();
      const purchaseIx = await program!.methods
        .purchaseTokensWithUsdc(new BN(+inputAmount * baseNumbTokenValue))
        .accounts({
          buyer: publicKey,
          referrer: null,
          referrerAccount: null,
        })
        .instruction();
      transaction.add(purchaseIx);
      await provider!.sendAndConfirm(transaction, []);
    } catch (error) {
      console.error("Error during purchase:", error);
    } finally {
      setLoadingPurchase(false);
    }
  };

  const onHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setInputAmount("");
      return;
    }
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      setInputAmount("");
      return;
    }
    const numb = numberValue.toString();
    if (numb.length > 30) return;
    const idxDot = numb.indexOf(".");
    if (idxDot !== -1) {
      const decimalPart = numb.slice(idxDot + 1);
      if (decimalPart.length > 4) return;
    }
    setInputAmount(numb);
  };

  const balanceByMethod = useMemo(() => {
    if (method.key === paymentMethods[0].key) return tokenBalanceSol;
    if (method.key === paymentMethods[1].key) return tokenBalanceUsdc;
    if (method.key === paymentMethods[2].key) return tokenBalanceUsdt;
  }, [method.key, tokenBalanceSol, tokenBalanceUsdc, tokenBalanceUsdt]);

  const errorMessage = useMemo(() => {
    if (!inputAmount) return "";
    if (
      +inputAmount < +(saleAccountInfo?.minUsdAmount || 0) ||
      +inputAmount > +(saleAccountInfo?.maxUsdAmount || 0)
    )
      return `Please enter a number between ${formatAmount(
        saleAccountInfo?.minUsdAmount || 0
      )} and ${formatAmount(saleAccountInfo?.maxUsdAmount || 0)}.`;
    return "";
  }, [inputAmount, saleAccountInfo]);

  const receiveToken = useMemo(() => {
    if (!inputAmount) return "0";
    return +inputAmount / (saleAccountInfo?.firstRoundPrice || 1);
  }, [inputAmount, saleAccountInfo?.firstRoundPrice]);

  if (!connected) {
    return <SaleWithoutConnectWallet />;
  }

  return (
    <Box>
      <Text mt={"36px"} fontSize={"14px"} color={"#C7CCD9"} fontWeight={500}>
        Payment method
      </Text>
      <Box mt={"12px"} className="grid grid-cols-3 gap-4">
        {paymentMethods?.map((item) => {
          return (
            <Flex
              key={item.key}
              gap={"6px"}
              p={"12px"}
              border={
                method.key === item.key
                  ? "1px solid #FFAF40"
                  : "1px solid #40475C"
              }
              background={method.key === item.key ? "#1A1001" : "transparent"}
              alignItems={"center"}
              justifyContent={"center"}
              lineHeight={"20px"}
              borderRadius={"8px"}
              fontWeight={700}
              cursor={"pointer"}
              color={method.key === item.key ? "#FFAF40" : "#FFFFFF"}
              onClick={() => {
                setMethod(item);
                setInputAmount("");
              }}
            >
              <img
                src={item.icon}
                className="w-[20px] h-[20px]"
                alt={item.title}
              />
              <Text>{item.title}</Text>
            </Flex>
          );
        })}
      </Box>
      <Box className="grid grid-cols-2 gap-[10px]">
        <Box>
          <Text
            mt={"24px"}
            fontSize={"14px"}
            color={"#C7CCD9"}
            fontWeight={500}
          >
            You pay
          </Text>
          <Flex
            gap={"8px"}
            mt={"8px"}
            p={"16px"}
            alignItems={"center"}
            borderRadius={"8px"}
            background={"rgba(0, 0, 0, 0.35)"}
            border={"1px solid var(--Color-Neutral-600, #40475C)"}
          >
            <Input
              type="number"
              placeholder="Enter amount"
              height={"20px"}
              p={0}
              lineHeight={"20px"}
              border={"none"}
              outline={"none"}
              disabled={!balanceByMethod}
              value={inputAmount}
              onChange={onHandleInput}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Image
              src={method.icon}
              w={"24px"}
              minW={"24px"}
              h={"24px"}
              alt={method.title}
            />
          </Flex>
        </Box>
        <Box>
          <Text
            mt={"24px"}
            fontSize={"14px"}
            color={"#C7CCD9"}
            fontWeight={500}
          >
            You Receive
          </Text>
          <Flex
            gap={"8px"}
            mt={"8px"}
            p={"16px"}
            alignItems={"center"}
            borderRadius={"8px"}
            background={"rgba(0, 0, 0, 0.35)"}
            border={"1px solid var(--Color-Neutral-600, #40475C)"}
          >
            <Input
              type="number"
              height={"20px"}
              p={0}
              lineHeight={"20px"}
              border={"none"}
              outline={"none"}
              disabled
              value={receiveToken}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Image
              src={"/images/token.svg"}
              w={"24px"}
              minW={"24px"}
              h={"24px"}
              alt="token"
            />
          </Flex>
        </Box>
      </Box>
      <Text mt={"2px"} fontSize={"10px"} color={"red.400"}>
        {errorMessage}
      </Text>
      <Box
        className="btn-connect-wallet"
        height={"58px"}
        mt={"20px"}
        cursor={"pointer"}
        onClick={() => (connected ? handleBuyUn() : setShowModal(true))}
      >
        <Button w={"100%"} height={"100%"} loading={loadingPurchase}>
          {connected ? "Buy $UN Now" : "Connect wallet & Buy"}
        </Button>
      </Box>
      <Text
        mt={"20px"}
        pb={"10px"}
        color={"#FF9A0D"}
        textAlign={"center"}
        fontWeight={700}
      >
        Get rewards of 11%
      </Text>
    </Box>
  );
};

export default PublicSale;
