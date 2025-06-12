/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Grid, Image, Input, Text } from "@chakra-ui/react";
import { allowedKeys, navKey, paymentMethods } from "../../constants/home";
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
  userAccountSeed,
} from "@/constants/contract";
import { BN, type Address } from "@coral-xyz/anchor";
import {
  formatAmount,
  getErrorToast,
  getNumberFixed,
  getTxHashLink,
  onScrollView,
  roundDownFixed,
  roundUpFixed,
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
  const [inputReceive, setInputReceive] = useState("");
  const [inputType, setInputType] = useState(0);
  const program = useUnichProgram();
  const provider = useAnchorProvider();
  const [loadingPurchase, setLoadingPurchase] = useState(false);
  const endpoint = clusterApiUrl(network);
  const pythSolanaReceiver = new PythSolanaReceiver({
    connection: new Connection(endpoint),
    wallet: wallet as any,
  });
  const { user } = useAuthStore();
  const { tokensPrice, tokenBalanceSol, tokenBalanceUsdc, tokenBalanceUsdt } =
    useTokenStore();

  const fetchReferralAccount = async (referrer: string | undefined) => {
    if (!program) return;
    try {
      const [account] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(userAccountSeed),
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
          Buffer.from(userAccountSeed),
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
          buyer: publicKey as Address | undefined,
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
          buyer: publicKey as Address | undefined,
          referrer: referrer,
          referrerAccount: referralAccount,
        })
        .instruction();
    }
    if (method.key === paymentMethods[2].key) {
      return await program!.methods
        .purchaseTokensWithUsdt(new BN(+inputAmount * baseNumbTokenValue))
        .accounts({
          buyer: publicKey as Address | undefined,
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
      if (purchaseIx) {
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
      }
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

  const validateInput = (value: string) => {
    if (value === "") {
      setInputAmount("");
      setInputReceive("");
      return false;
    }
    if (value.length > 30) return false;
    const idxDot = value.indexOf(".");
    if (idxDot !== -1) {
      const decimalPart = value.slice(idxDot + 1);
      if (decimalPart.length > 4) return false;
    }
    return true;
  };

  const getReceive = (value: string) => {
    if (!value) return "0";
    const priceByMethod = getPriceByMethod();
    return roundDownFixed(
      (+value * priceByMethod) / (solSaleAccountInfo?.currentPrice || 1)
    );
  };

  const getInputAmount = (value: string) => {
    if (!value) return "0";
    const priceByMethod = getPriceByMethod();
    return roundUpFixed(
      (+value * (solSaleAccountInfo?.currentPrice || 0)) / (priceByMethod || 1)
    );
  };

  const onHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validate = validateInput(value);
    if (!validate) return;
    const receive = getReceive(value);
    console.log("input: ", value);
    setInputReceive(receive?.toString());
    setInputAmount(value);
    setInputType(0);
  };

  const onHandleInputReceive = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validate = validateInput(value);
    if (!validate) return;
    const input = getInputAmount(value);
    setInputAmount(input?.toString());
    setInputReceive(value);
    setInputType(1);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const getPriceByMethod = () => {
    if (method.key === paymentMethods[0].key) return tokensPrice?.sol || 0;
    if (method.key === paymentMethods[1].key) return tokensPrice?.usdc || 0;
    if (method.key === paymentMethods[2].key) return tokensPrice?.usdt || 0;
    return 0;
  };

  const balanceByMethod = useMemo(() => {
    if (method.key === paymentMethods[0].key) return tokenBalanceSol;
    if (method.key === paymentMethods[1].key) return tokenBalanceUsdc;
    if (method.key === paymentMethods[2].key) return tokenBalanceUsdt;
    return 0;
  }, [method, tokenBalanceSol, tokenBalanceUsdc, tokenBalanceUsdt]);

  const isBalanceDisable = useMemo(() => {
    return balanceByMethod < +inputAmount;
  }, [inputAmount, balanceByMethod]);

  const errorMessage = useMemo(() => {
    if (!inputAmount || !connected) return "";
    const priceByMethod = getPriceByMethod();
    const minToken =
      +(solSaleAccountInfo?.minUsdAmount || 0) / (priceByMethod || 1);
    const maxToken =
      +(solSaleAccountInfo?.maxUsdAmount || 0) / (priceByMethod || 1);
    if (!inputType) {
      if (getNumberFixed(inputAmount) < getNumberFixed(minToken)) {
        return `The minimum amount should be ${formatAmount(
          getNumberFixed(minToken)
        )} ${method?.title?.toUpperCase()}`;
      }
      if (getNumberFixed(inputAmount) > getNumberFixed(maxToken)) {
        return `The maximum amount can't exceed ${formatAmount(
          getNumberFixed(maxToken)
        )} ${method?.title?.toUpperCase()}`;
      }
    } else {
      if (getNumberFixed(inputAmount) < getNumberFixed(minToken)) {
        return `The minimum amount should be ${formatAmount(
          getNumberFixed(
            (solSaleAccountInfo?.minUsdAmount || 0) /
              (solSaleAccountInfo?.currentPrice || 1)
          )
        )} $UN`;
      }
      if (getNumberFixed(inputAmount) > getNumberFixed(maxToken)) {
        return `The maximum amount can't exceed ${formatAmount(
          getNumberFixed(
            (solSaleAccountInfo?.maxUsdAmount || 0) /
              (solSaleAccountInfo?.currentPrice || 1)
          )
        )} $UN`;
      }
    }
    if (isBalanceDisable) {
      const balanceMust = +inputAmount - balanceByMethod;
      return `Insufficient balance. Please deposit ${getNumberFixed(
        balanceMust < 0 ? 0 : balanceMust
      )} ${method?.title?.toUpperCase()} more to purchase.`;
    }
    return "";
  }, [inputAmount, solSaleAccountInfo, tokensPrice, method, isBalanceDisable]);

  const rewardRate = useMemo(() => {
    if (!solSaleAccountInfo || !solSaleAccountInfo?.denominator) return 0;
    return (
      ((solSaleAccountInfo.refCurrencyRate + solSaleAccountInfo.refTokenRate) *
        100) /
      solSaleAccountInfo.denominator
    );
  }, [solSaleAccountInfo, balanceByMethod]);

  return (
    <Box>
      <Text
        mt={"16px"}
        fontSize={"12px"}
        color={"var(--normal-text-color)"}
        fontWeight={500}
        xl={{ mt: "36px", fontSize: "14px" }}
      >
        Payment Method
      </Text>
      <Grid
        gap={"12px"}
        mt={"12px"}
        className="grid-cols-3"
        md={{ gap: "16px" }}
      >
        {paymentMethods?.map((item) => {
          return (
            <Flex
              key={item.key}
              gap={"6px"}
              p={"8px"}
              border={
                method.key === item.key
                  ? "1px solid var(--border-method-active)"
                  : "1px solid var(--border-method-normal)"
              }
              background={
                method.key === item.key
                  ? "var(--btn-white-color)"
                  : "transparent"
              }
              alignItems={"center"}
              justifyContent={"center"}
              lineHeight={"20px"}
              borderRadius={"8px"}
              fontWeight={700}
              fontSize={"12px"}
              cursor={"pointer"}
              color={
                method.key === item.key
                  ? "var(--border-method-active)"
                  : "var(--color-white)"
              }
              onClick={() => {
                setMethod(item);
                setInputAmount("");
                setInputReceive("");
              }}
              md={{
                fontSize: "14px",
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
            color={"var(--normal-text-color)"}
            fontWeight={500}
            xl={{
              fontSize: "14px",
            }}
          >
            You Pay
          </Text>
          <Flex
            gap={"8px"}
            mt={"8px"}
            p={"12px"}
            fontSize={"12px"}
            alignItems={"center"}
            borderRadius={"8px"}
            background={"var(--bg-input-amount)"}
            border={
              !inputType && errorMessage
                ? "1px solid var(--Color-Red-600, var(--input-error-border))"
                : "1px solid var(--Color-Neutral-600, var(--border-method-normal))"
            }
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
              color={"white"}
              fontWeight={700}
              _placeholder={{
                color: "var(--table-head-color)",
                fontWeight: 700,
              }}
              onChange={onHandleInput}
              onKeyDown={onKeyDown}
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
            color={"var(--normal-text-color)"}
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
            background={"var(--bg-input-amount)"}
            border={
              inputType && errorMessage
                ? "1px solid var(--Color-Red-600, var(--input-error-border))"
                : "1px solid var(--Color-Neutral-600, var(--border-method-normal))"
            }
            xl={{
              p: "16px",
              fontSize: "16px",
            }}
          >
            <Input
              height={"20px"}
              p={0}
              type="number"
              lineHeight={"20px"}
              border={"none"}
              outline={"none"}
              value={inputReceive}
              color={"white"}
              fontWeight={700}
              _placeholder={{
                color: "var(--table-head-color)",
                fontWeight: 700,
              }}
              onChange={onHandleInputReceive}
              onKeyDown={onKeyDown}
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
        minH={"16px"}
        mt={"8px"}
        fontSize={"12px"}
        fontWeight={"16px"}
        color={"var(--error-message-color)"}
      >
        {errorMessage}
      </Text>
      <Button
        className="btn-connect-wallet"
        w={"100%"}
        height={"44px"}
        mt={"4px"}
        loading={loadingPurchase}
        disabled={connected && !!errorMessage}
        xl={{
          h: "58px",
        }}
      >
        <Box
          w={"100%"}
          height={"100%"}
          fontSize={"12px !important"}
          md={{ fontSize: "16px !important" }}
          onClick={() => (connected ? handleBuyUn() : setShowModal(true))}
        >
          {connected ? "Buy $UN Now" : "Connect wallet & Buy"}
        </Box>
      </Button>
      <Text
        mt={"18px"}
        pb={"10px"}
        color={"var(--text-primary-link-color)"}
        textAlign={"center"}
        fontWeight={700}
        fontSize={"12px"}
        cursor={"pointer"}
        md={{
          fontSize: "14px",
        }}
        xl={{
          mt: "20px",
          fontSize: "16px",
        }}
        _hover={{ color: "var(--border-method-active)" }}
        onClick={() => onScrollView(navKey.invite)}
      >
        Get rewards of {rewardRate}%
      </Text>
    </Box>
  );
};

export default PublicSale;
