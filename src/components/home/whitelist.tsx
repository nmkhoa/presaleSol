/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { paymentMethods } from "../../constants/home";
import { useContext, useMemo, useState } from "react";
import { ConnectWalletContext } from "../../contexts/connect-wallet-context";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUnichProgram } from "@/hooks/use-program";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import { useAnchorProvider } from "@/hooks/use-anchor-provider";
import { baseNumbSolValue, baseNumbTokenValue } from "@/constants/contract";
import { BN } from "@coral-xyz/anchor";
import {
  formatAmount,
  getErrorToast,
  getNumberFixed,
  getTxHashLink,
} from "@/utils";
import { toaster } from "../ui/toaster";
import { PythSolanaReceiver } from "@pythnetwork/pyth-solana-receiver";
import { feedIdSolana } from "@/constants/environment";
import { network } from "../providers/solana-provider";
import { useTokenStore } from "@/stores/token.store";
import { useNftStore } from "@/stores/whitelist.store";

interface Props {
  fetchSaleAccount: () => Promise<void>;
  fetchUserAccount: () => Promise<void>;
}

const Whitelist = ({ fetchSaleAccount, fetchUserAccount }: Props) => {
  const { nft } = useNftStore();
  const [method, setMethod] = useState(paymentMethods[0]);
  const { setShowModal } = useContext(ConnectWalletContext);
  const { solSaleAccountInfo } = useTokenStore();
  const { connected, publicKey, wallet } = useWallet();
  const [inputAmount, setInputAmount] = useState("");
  const program = useUnichProgram();
  const provider = useAnchorProvider();
  const [loadingPurchase, setLoadingPurchase] = useState(false);
  const endpoint = clusterApiUrl(network);
  const pythSolanaReceiver = new PythSolanaReceiver({
    connection: new Connection(endpoint),
    wallet: wallet as any,
  });
  const { tokensPrice, tokenBalanceSol, tokenBalanceUsdc, tokenBalanceUsdt } =
    useTokenStore();

  const getPurchaseToken = async () => {
    if (method.key === paymentMethods[0].key) {
      const solUsdPriceFeedAccount = pythSolanaReceiver
        .getPriceFeedAccountAddress(0, feedIdSolana)
        .toBase58();
      const solUsdPriceFeedAccountPubkey = new PublicKey(
        solUsdPriceFeedAccount
      );
      return await program!.methods
        .purchaseTokensWithSolWhitelist(new BN(+inputAmount * baseNumbSolValue))
        .accounts({
          buyer: publicKey,
          priceUpdate: solUsdPriceFeedAccountPubkey,
        })
        .instruction();
    }
    if (method.key === paymentMethods[1].key) {
      return await program!.methods
        .purchaseTokensWithUsdcWhitelist(
          new BN(+inputAmount * baseNumbTokenValue)
        )
        .accounts({
          buyer: publicKey,
        })
        .instruction();
    }
    if (method.key === paymentMethods[2].key) {
      return await program!.methods
        .purchaseTokensWithUsdtWhitelist(
          new BN(+inputAmount * baseNumbTokenValue)
        )
        .accounts({
          buyer: publicKey,
        })
        .instruction();
    }
  };

  const handleBuyUn = async () => {
    if (!inputAmount || !publicKey || errorMessage) return;
    try {
      setLoadingPurchase(true);
      const transaction = new Transaction();
      const purchaseIx = await getPurchaseToken();
      transaction.add(purchaseIx);
      const txHash = await provider!.sendAndConfirm(transaction, []);
      toaster.create({
        title: "Transaction Successful!",
        description: `You have successfully purchased ${formatAmount(
          +inputAmount
        )} ${method.title}. View your balance now!`,
        type: "success",
        meta: {
          url: getTxHashLink(txHash),
          urlTile: "View your balance",
        },
      });
    } catch (error: any) {
      console.error("Error during purchase:", error, error?.message);
      const errorObj = getErrorToast(error);
      toaster.create({
        title: errorObj.title,
        description: errorObj.message,
        type: errorObj.type,
      });
    } finally {
      setLoadingPurchase(false);
      fetchSaleAccount();
      fetchUserAccount();
    }
  };

  const onHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setInputAmount("");
      return;
    }
    if (value.length > 30) return;
    const idxDot = value.indexOf(".");
    if (idxDot !== -1) {
      const decimalPart = value.slice(idxDot + 1);
      if (decimalPart.length > 4) return;
    }
    setInputAmount(value);
  };

  const balanceByMethod = useMemo(() => {
    if (method.key === paymentMethods[0].key) return tokenBalanceSol;
    if (method.key === paymentMethods[1].key) return tokenBalanceUsdc;
    if (method.key === paymentMethods[2].key) return tokenBalanceUsdt;
  }, [method.key, tokenBalanceSol, tokenBalanceUsdc, tokenBalanceUsdt]);

  const getPriceByMethod = () => {
    if (method.key === paymentMethods[0].key) return tokensPrice?.sol || 0;
    if (method.key === paymentMethods[1].key) return tokensPrice?.usdc || 0;
    if (method.key === paymentMethods[2].key) return tokensPrice?.usdt || 0;
    return 0;
  };

  const errorMessage = useMemo(() => {
    if (!inputAmount) return "";
    const priceByMethod = getPriceByMethod();
    const inputUsdAmount = +inputAmount * priceByMethod;
    const minToken =
      +(solSaleAccountInfo?.minUsdAmount || 0) / (priceByMethod || 1);
    const maxToken =
      +(solSaleAccountInfo?.maxUsdAmount || 0) / (priceByMethod || 1);
    if (+inputUsdAmount < +(solSaleAccountInfo?.minUsdAmount || 0)) {
      return `The minimum amount should be ${formatAmount(
        getNumberFixed(minToken)
      )}`;
    }
    if (+inputUsdAmount > +(solSaleAccountInfo?.maxUsdAmount || 0)) {
      return `The maximum amount should be ${formatAmount(
        getNumberFixed(maxToken)
      )}`;
    }
    return "";
  }, [inputAmount, solSaleAccountInfo]);

  const receiveToken = useMemo(() => {
    if (!inputAmount) return "0";
    const priceByMethod = getPriceByMethod();
    const priceAfterDiscount =
      (solSaleAccountInfo?.firstRoundPrice || 0) * 0.75;
    const receive = (+inputAmount * priceByMethod) / (priceAfterDiscount || 1);
    return getNumberFixed(receive);
  }, [inputAmount, solSaleAccountInfo?.firstRoundPrice]);

  const rewardRate = useMemo(() => {
    if (!solSaleAccountInfo || !solSaleAccountInfo?.denominator) return 0;
    return (
      (solSaleAccountInfo.refCurrencyRate * 100) /
      solSaleAccountInfo.denominator
    );
  }, []);

  if (!nft) {
    return (
      <Box>
        <Text mt={"84px"} textAlign={"center"} fontWeight={500} color={"white"}>
          Special Unich NFT is required for whitelist purchase.
        </Text>
      </Box>
    );
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
        Get rewards of ${rewardRate}%
      </Text>
    </Box>
  );
};

export default Whitelist;
