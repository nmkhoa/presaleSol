/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Stack,
  RadioCard,
  chakra,
  HStack,
  Text,
  Box,
  Button,
  Image,
  Spacer,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";

import IconSOL from "@assets/icon/icon_SOL.svg";
import IconUSDC from "@assets/icon/icon_USDC.svg";
import IconUSDT from "@assets/icon/icon_USDT.svg";
import { useTokenStore } from "@/stores/token.store";
import {
  formatAmount,
  getErrorToast,
  getNumberFixed,
  getTxHashLink,
} from "@/utils";
import { paymentMethods } from "@/constants/home";
import { toaster } from "@/components/ui/toaster";
import { useUnichProgram } from "@/hooks/use-program";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAnchorProvider } from "@/hooks/use-anchor-provider";
import { Transaction } from "@solana/web3.js";
import { useSolUser } from "@/core/hook/useSolUser";

export default function RewardClaimPanel() {
  const {
    solUserAccountInfo,
    solSaleAccountInfo,
    tokensPrice,
    setSolUserAccountInfo,
  } = useTokenStore();
  const program = useUnichProgram();
  const { publicKey } = useWallet();
  const provider = useAnchorProvider();
  const [loadingClaim, setLoadingClaim] = useState(false);
  const { mutateAsync: getSolUserAccount } = useSolUser();

  const myRewards = useMemo(() => {
    const availableSol =
      (solUserAccountInfo?.solRefEarned || 0) -
      (solUserAccountInfo?.solRefClaimed || 0);
    const availableUsdc =
      (solUserAccountInfo?.usdcRefEarned || 0) -
      (solUserAccountInfo?.usdcRefClaimed || 0);
    const availableUsdt =
      (solUserAccountInfo?.usdtRefEarned || 0) -
      (solUserAccountInfo?.usdtRefClaimed || 0);

    return [
      {
        method: paymentMethods[0],
        value: availableSol,
        price: availableSol * (tokensPrice?.sol || 0),
        icon: IconSOL,
      },
      {
        method: paymentMethods[1],
        value: availableUsdc,
        price: availableUsdc * (tokensPrice?.usdc || 0),
        icon: IconUSDC,
      },
      {
        method: paymentMethods[2],
        value: availableUsdt,
        price: availableUsdt * (tokensPrice?.usdt || 0),
        icon: IconUSDT,
      },
    ];
  }, [solUserAccountInfo, tokensPrice]);

  const usdEarned = useMemo(() => {
    if (!solUserAccountInfo || !solSaleAccountInfo) return 0;
    const earned =
      solUserAccountInfo.tokenRefEarned * solSaleAccountInfo.firstRoundPrice;
    return getNumberFixed(earned);
  }, [solSaleAccountInfo, solUserAccountInfo]);

  const handleClaim = async () => {
    try {
      if (!publicKey || !program) return;
      setLoadingClaim(true);
      const transaction = new Transaction();
      const purchaseIx = await program!.methods
        .claimReward()
        .accounts({
          user: publicKey,
        })
        .instruction();
      transaction.add(purchaseIx);
      const txHash = await provider!.sendAndConfirm(transaction, []);
      await getSolUserAccount({
        program,
        publicKey,
        callBack: setSolUserAccountInfo,
      });
      toaster.create({
        title: "Transaction Successful!",
        description: `You have successfully claimed. View your balance now!`,
        type: "success",
        meta: {
          url: getTxHashLink(txHash),
          urlTile: "View your balance",
        },
      });
    } catch (error: any) {
      console.error("Error claiming reward:", error);
      const errorObj = getErrorToast(error);
      toaster.create({
        title: errorObj.title,
        description: errorObj.message,
        type: errorObj.type,
      });
    } finally {
      setLoadingClaim(false);
    }
  };

  const isDisabled = useMemo(() => {
    return myRewards?.some((item) => !!item.value);
  }, [myRewards]);

  return (
    <Box
      background={"linear-gradient(143.45deg, #17191F 10.97%, #1B1D24 56.87%)"}
      w="full"
      h="full"
      minH={"720px"}
      borderRadius="12px"
      color="white"
      p="36px"
    >
      <Stack direction="column" gap="24px">
        <Box>
          <Text fontWeight="bold" fontSize="18px" color="#FFFFFF">
            $UN Earned
          </Text>
          <HStack gap="12px" mt="2">
            <Image src="/logo_token.svg" w="32px" h="32px" alt="logo" />
            <Text fontWeight="bold" fontSize="36px" color="#FFFFFF">
              {solUserAccountInfo?.tokenRefEarned
                ? formatAmount(
                    getNumberFixed(solUserAccountInfo?.tokenRefEarned, 2)
                  )
                : "-.--"}
            </Text>
          </HStack>
        </Box>

        <Box w="full" h="1px" bg="#FFFFFF1A" />

        <Box>
          <Text fontWeight="bold" fontSize="18px" color="#FFFFFF">
            USD Earned
          </Text>
          <HStack gap="12px" mt="2">
            <Text fontWeight="bold" fontSize="36px" color="#FFFFFF">
              ${usdEarned ? formatAmount(getNumberFixed(usdEarned, 2)) : "-.--"}
            </Text>
          </HStack>
        </Box>

        <Box w="full" h="1px" bg="#FFFFFF1A" />

        <Text fontSize="14px" color="#C7CCD9" fontWeight="normal">
          Claim Your Reward
        </Text>

        <RadioCard.Root>
          <Stack direction="column" gap="12px">
            {myRewards.map((item) => (
              <RadioCard.Item
                cursor={"pointer"}
                key={item.method.key}
                value={item.method.key}
                border="1px solid transparent"
                borderRadius="8px"
                background={"#0D0D0D"}
                pointerEvents={"none"}
              >
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl w="full">
                  <HStack justify="space-between" align="center" w="full">
                    <HStack gap="6px">
                      <chakra.img
                        src={item.icon}
                        alt={`Icon of ${item.method.title}`}
                        w="28px"
                        h="28px"
                      />
                      <Text fontWeight="medium" fontSize="16px" color="white">
                        {item.method.title}
                      </Text>
                    </HStack>
                    <Box textAlign="right">
                      <Text fontWeight="bold" fontSize="16px" color="white">
                        {formatAmount(getNumberFixed(item.value, 2))}
                      </Text>
                      <Text
                        fontWeight="medium"
                        fontSize="12px"
                        color="whiteAlpha.700"
                      >
                        ${formatAmount(getNumberFixed(item.price, 2))}
                      </Text>
                    </Box>
                  </HStack>
                </RadioCard.ItemControl>
              </RadioCard.Item>
            ))}
          </Stack>
        </RadioCard.Root>
        <Spacer />
        {/* Claim Button */}
        <Button
          w="full"
          h="58px"
          border="1px solid transparent"
          borderRadius="8px"
          fontSize="16px"
          fontWeight="bold"
          color="#1A1001"
          disabled={!isDisabled}
          loading={loadingClaim}
          background={`
            linear-gradient(94.13deg, #FFDE91 -3.77%, #FFAE00 19.01%, #FF7700 119.2%) padding-box,
            linear-gradient(271.06deg, #FFA023 8.52%, #FFF8E8 104.75%) border-box
          `}
          onClick={() => handleClaim()}
        >
          Claim Now
        </Button>
      </Stack>
    </Box>
  );
}
