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
  Flex,
  Clipboard,
  Input,
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
import { clusterApiUrl, Connection, Transaction } from "@solana/web3.js";
import { useSolUser } from "@/core/hook/use-sol-user";
import { tokenUsdc, tokenUsdt } from "@/constants/environment";
import { network } from "@/components/providers/solana-provider";
import { createATAInstruction } from "@/utils/wallet";
import { useAuthStore } from "@/stores/auth.store";

export default function RewardClaimPanel() {
  const { solUserAccountInfo, tokensPrice, setSolUserAccountInfo } =
    useTokenStore();
  const program = useUnichProgram();
  const { publicKey } = useWallet();
  const provider = useAnchorProvider();
  const [loadingClaim, setLoadingClaim] = useState(false);
  const { mutateAsync: getSolUserAccount } = useSolUser();
  const endpoint = clusterApiUrl(network);
  const connection = new Connection(endpoint);
  const { user } = useAuthStore();

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
  }, [solUserAccountInfo, tokensPrice, publicKey]);

  const handleClaim = async () => {
    try {
      if (!publicKey || !program) return;
      setLoadingClaim(true);
      await createATAInstruction(tokenUsdc, publicKey, connection, provider);
      await createATAInstruction(tokenUsdt, publicKey, connection, provider);
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

  const earnedValues = useMemo(() => {
    let totalUNEarned = 0;
    let totalUSDEarned = 0;
    myRewards?.forEach((reward) => {
      totalUNEarned += reward.value;
      totalUSDEarned += reward.price;
    });
    return { totalUNEarned, totalUSDEarned };
  }, [myRewards]);

  return (
    <>
      <Box
        w={"full"}
        minH={"136px"}
        p={"20px"}
        mb={"12px"}
        background={"url(/images/invite_bg2.svg)"}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        borderRadius={"12px"}
        display={{ base: "block", md: "none" }}
      >
        <Stack>
          <Text
            fontSize={{ base: "18px", md: "20px", "2xl": "24px" }}
            fontWeight={700}
            color={"var(--color-white)"}
          >
            Your Network = Your Reward!
          </Text>

          <Flex
            gap={"12px"}
            flexDirection={{ base: "column", xl: "row" }}
            justifyContent={"start"}
          >
            <Box flex={"1 1 50%"}>
              <Text
                fontSize={{ base: "12px", md: "14px", "2xl": "16px" }}
                color={"var(--progress-out-bg)"}
                fontWeight={500}
                textAlign={"left"}
              >
                Earn 3% in $UN + 8% in USD based on total purchases of your
                invitees.
              </Text>
            </Box>
            <Flex
              w={{ base: "100%", xl: "317px" }}
              alignItems="center"
              gap="8px"
            >
              <Input
                h={"40px"}
                background={"var(--bg-super-dark)"}
                color={"var(--color-input)"}
                borderRadius={"8px"}
                border={"none"}
                disabled
                fontSize={"12px"}
                fontWeight={500}
                opacity={1}
                value={
                  user
                    ? `${window.location.origin}/?affiliateCode=${user.affiliateCode}`
                    : "Connect wallet to see your code"
                }
              />

              <Clipboard.Root
                value={
                  user
                    ? `${window.location.origin}/?affiliateCode=${user.affiliateCode}`
                    : ""
                }
                timeout={1000}
              >
                <Clipboard.Trigger asChild>
                  <Button
                    minW="auto"
                    px="12px"
                    h="40px"
                    background="var(--color-white)"
                    rounded="8px"
                    color="var(--btn-white-color)"
                    fontWeight={700}
                    fontSize="12px"
                    _hover={{ filter: "brightness(1.2)" }}
                  >
                    <Clipboard.CopyText />
                  </Button>
                </Clipboard.Trigger>
              </Clipboard.Root>
            </Flex>
          </Flex>
        </Stack>
      </Box>
      <Box
        background={
          "linear-gradient(143.45deg, var(--card-bg-light) 10.97%, var(--card-bg-normal) 56.87%)"
        }
        w="full"
        h="full"
        minH={{ base: "0", md: "720px" }}
        borderRadius="12px"
        color="white"
        padding={{ base: "16px", xl: "28px", "2xl": "36px" }}
      >
        <Stack direction="column" gap={{ base: "12px", xl: "24px" }}>
          <Box>
            <HStack gap={"8px"}>
              <Text
                fontWeight="bold"
                fontSize={{ base: "12px", md: "14px", xl: "18px" }}
                color="var(--color-white)"
              >
                $UN Earned
              </Text>
              <Image src="/images/tag_3.svg" alt="tag 3" />
            </HStack>
            <HStack gap="12px" mt="2">
              <Image
                src="/logo_token.svg"
                w={{ base: "20px", md: "24px", xl: "32px" }}
                h={{ base: "20px", md: "24px", xl: "32px" }}
                alt="logo"
              />
              <Text
                fontWeight="bold"
                fontSize={{ base: "20px", md: "28px", xl: "36px" }}
                color="var(--color-white)"
              >
                {solUserAccountInfo?.tokenRefEarned
                  ? formatAmount(
                      getNumberFixed(solUserAccountInfo?.tokenRefEarned, 2)
                    )
                  : "0.00"}
              </Text>
            </HStack>
          </Box>

          <Box w="full" h="1px" bg="var(--color-line)" />

          <Box>
            <HStack gap={"8px"}>
              <Text
                fontWeight="bold"
                fontSize={{ base: "12px", md: "14px", xl: "18px" }}
                color="var(--color-white)"
              >
                USD Earned
              </Text>
              <Image src="/images/tag_8.svg" alt="tag 8" />
            </HStack>
            <HStack gap="12px" mt="2">
              <Text
                fontWeight="bold"
                fontSize={{ base: "20px", md: "28px", xl: "36px" }}
                color="var(--color-white)"
              >
                $
                {earnedValues?.totalUSDEarned
                  ? formatAmount(
                      getNumberFixed(earnedValues?.totalUSDEarned, 2)
                    )
                  : "0.00"}
              </Text>
            </HStack>
          </Box>

          <Box w="full" h="1px" bg="var(--color-line)" />

          <Text
            fontSize={{ base: "12px", md: "14px" }}
            color="var(--claim-reward-color)"
            fontWeight="normal"
          >
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
                  background={"var(--reward-item-bg)"}
                  pointerEvents={"none"}
                >
                  <RadioCard.ItemHiddenInput />
                  <RadioCard.ItemControl w="full" p={"8px 12px"}>
                    <HStack justify="space-between" align="center" w="full">
                      <HStack gap="6px">
                        <chakra.img
                          src={item.icon}
                          alt={`Icon of ${item.method.title}`}
                          w={{ base: "24px", xl: "28px" }}
                          h={{ base: "24px", xl: "28px" }}
                        />
                        <Text
                          fontWeight="medium"
                          fontSize={{ base: "14px", xl: "16px" }}
                          color="white"
                        >
                          {item.method.title}
                        </Text>
                      </HStack>
                      <Box textAlign="right">
                        <Text
                          fontWeight="bold"
                          fontSize={{ base: "14px", xl: "16px" }}
                          color="white"
                        >
                          {formatAmount(getNumberFixed(item.value, 4))}
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
            h={{ base: "44px", xl: "58px" }}
            border="1px solid transparent"
            borderRadius="8px"
            fontSize="16px"
            fontWeight="bold"
            color="var(--btn-white-color)"
            disabled={!isDisabled}
            loading={loadingClaim}
            background={`
            linear-gradient(94.13deg, var(--btn-yellow-normal) -3.77%, var(--btn-orange-light) 19.01%, var(--btn-orange-extra) 119.2%) padding-box,
            linear-gradient(271.06deg, var(--btn-yellow-semi) 8.52%, var(--btn-yellow-extra) 104.75%) border-box
          `}
            _disabled={{
              opacity: 1,
              border: "1px solid var(--btn-secondary-border-medium)",
              background:
                "linear-gradient(0deg, var(--btn-disable-light) 9.78%, var(--btn-disbale-normal) 100%)",
              color: "var(--btn-secondary-border-medium)",
            }}
            onClick={() => handleClaim()}
          >
            Claim Now
          </Button>
        </Stack>
      </Box>
    </>
  );
}
