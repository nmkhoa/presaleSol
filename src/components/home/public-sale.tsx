/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Grid, Image, Input, Text } from "@chakra-ui/react";
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
import {
  baseNumbSolValue,
  baseNumbTokenValue,
  USER_ACCOUNT_SEED,
} from "@/constants/contract";
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
import { useAuthStore } from "@/stores/auth.store";

interface Props {
  fetchSaleAccount: () => Promise<void>;
  fetchUserAccount: () => Promise<void>;
}

const PublicSale = ({ fetchSaleAccount, fetchUserAccount }: Props) => {
  const { solSaleAccountInfo } = useTokenStore();
  const { connected, publicKey, wallet } = useWallet();
  const [method, setMethod] = useState(paymentMethods[0]);
  const { setShowModal } = useContext(ConnectWalletContext);
  const [inputAmount, setInputAmount] = useState("");
  const program = useUnichProgram();
  const provider = useAnchorProvider();
  const [loadingPurchase, setLoadingPurchase] = useState(false);
  const endpoint = clusterApiUrl(network);
  const pythSolanaReceiver = new PythSolanaReceiver({
    connection: new Connection(endpoint),
    wallet: wallet as any,
  });
  const { user } = useAuthStore();
  const { tokensPrice } = useTokenStore();

  const fetchReferralAccount = async (referrer: string | undefined) => {
    try {
      const [account] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(USER_ACCOUNT_SEED),
          new PublicKey(referrer || "").toBuffer(),
        ],
        program.programId
      );
      const accountData = await program.account.userAccount.fetch(account);
      return !!accountData;
    } catch (error: any) {
      console.error("Error fetching referral account:", error);
      return false;
    }
  };

  const getPurchaseToken = async () => {
    const referrerAddress = user?.referrer?.walletAddress;
    let referralAccount = null;
    let referrer = null;
    const referralAccountExists = await fetchReferralAccount(referrerAddress);
    if (referrerAddress && referralAccountExists) {
      const [referAccount] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(USER_ACCOUNT_SEED),
          new PublicKey(referrerAddress).toBuffer(),
        ],
        program!.programId
      );
      referralAccount = referAccount || null;
      referrer = new PublicKey(referrerAddress);
    }
    if (method.key === paymentMethods[0].key) {
      const solUsdPriceFeedAccount = pythSolanaReceiver
        .getPriceFeedAccountAddress(0, feedIdSolana)
        .toBase58();
      const solUsdPriceFeedAccountPubkey = new PublicKey(
        solUsdPriceFeedAccount
      );
      return await program!.methods
        .purchaseTokensWithSol(new BN(+inputAmount * baseNumbSolValue))
        .accounts({
          buyer: publicKey,
          referrer: referrer,
          referrerAccount: referralAccount,
          priceUpdate: solUsdPriceFeedAccountPubkey,
        })
        .instruction();
    }
    if (method.key === paymentMethods[1].key) {
      return await program!.methods
        .purchaseTokensWithUsdc(new BN(+inputAmount * baseNumbTokenValue))
        .accounts({
          buyer: publicKey,
          referrer: referrer,
          referrerAccount: referralAccount,
        })
        .instruction();
    }
    if (method.key === paymentMethods[2].key) {
      return await program!.methods
        .purchaseTokensWithUsdt(new BN(+inputAmount * baseNumbTokenValue))
        .accounts({
          buyer: publicKey,
          referrer: referrer,
          referrerAccount: referralAccount,
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
  }, [inputAmount, solSaleAccountInfo, tokensPrice, method]);

  const receiveToken = useMemo(() => {
    if (!inputAmount) return "0";
    const priceByMethod = getPriceByMethod();
    return formatAmount(
      getNumberFixed(
        (+inputAmount * priceByMethod) /
          (solSaleAccountInfo?.firstRoundPrice || 1)
      )
    );
  }, [inputAmount]);

  const rewardRate = useMemo(() => {
    if (!solSaleAccountInfo || !solSaleAccountInfo?.denominator) return 0;
    return (
      (solSaleAccountInfo.refCurrencyRate * 100) /
      solSaleAccountInfo.denominator
    );
  }, []);

  return (
    <Box>
      <Text
        mt={"16px"}
        fontSize={"12px"}
        color={"#C7CCD9"}
        fontWeight={500}
        xl={{ mt: "36px", fontSize: "14px" }}
      >
        Payment method
      </Text>
      <Grid gap={"16px"} mt={"12px"} className="grid-cols-3">
        {paymentMethods?.map((item) => {
          return (
            <Flex
              key={item.key}
              gap={"6px"}
              p={"8px"}
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
              fontSize={"14px"}
              cursor={"pointer"}
              color={method.key === item.key ? "#FFAF40" : "#FFFFFF"}
              onClick={() => {
                setMethod(item);
                setInputAmount("");
              }}
              xl={{
                p: "12px",
                fontSize: "16px",
              }}
            >
              <Image src={item.icon} w={"20px"} h={"20px"} alt={item.title} />
              <Text>{item.title}</Text>
            </Flex>
          );
        })}
      </Grid>
      <Box className="grid grid-cols-2 gap-[10px]">
        <Box>
          <Text
            mt={"24px"}
            fontSize={"12px"}
            color={"#C7CCD9"}
            fontWeight={500}
            xl={{
              fontSize: "14px",
            }}
          >
            You pay
          </Text>
          <Flex
            gap={"8px"}
            mt={"8px"}
            p={"12px"}
            fontSize={"12px"}
            alignItems={"center"}
            borderRadius={"8px"}
            background={"rgba(0, 0, 0, 0.35)"}
            border={"1px solid var(--Color-Neutral-600, #40475C)"}
            xl={{
              p: "16px",
              fontSize: "16px",
            }}
          >
            <Input
              type="number"
              placeholder="Enter amount"
              height={"20px"}
              p={0}
              lineHeight={"20px"}
              border={"none"}
              outline={"none"}
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
            fontSize={"12px"}
            color={"#C7CCD9"}
            fontWeight={500}
            xl={{
              fontSize: "14px",
            }}
          >
            You Receive
          </Text>
          <Flex
            gap={"8px"}
            mt={"8px"}
            p={"12px"}
            fontSize={"12px"}
            alignItems={"center"}
            borderRadius={"8px"}
            background={"rgba(0, 0, 0, 0.35)"}
            border={"1px solid var(--Color-Neutral-600, #40475C)"}
            xl={{
              p: "16px",
              fontSize: "16px",
            }}
          >
            <Input
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
      <Text
        h={"16px"}
        mt={"8px"}
        fontSize={"12px"}
        fontWeight={"16px"}
        color={"#F04438"}
      >
        {errorMessage}
      </Text>
      <Box
        className="btn-connect-wallet"
        height={"44px"}
        mt={"4px"}
        cursor={"pointer"}
        xl={{
          h: "58px",
        }}
        onClick={() => (connected ? handleBuyUn() : setShowModal(true))}
      >
        <Button w={"100%"} height={"100%"} loading={loadingPurchase}>
          {connected ? "Buy $UN Now" : "Connect wallet & Buy"}
        </Button>
      </Box>
      <Text
        mt={"18px"}
        pb={"10px"}
        color={"#FF9A0D"}
        textAlign={"center"}
        fontWeight={700}
        fontSize={"14px"}
        xl={{
          mt: "20px",
          fontSize: "16px",
        }}
      >
        Get rewards of ${rewardRate}%
      </Text>
    </Box>
  );
};

export default PublicSale;
