import {
  Stack,
  RadioCard,
  chakra,
  HStack,
  Text,
  Box,
  Button,
  Image,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";

import IconSOL from "@assets/icon/icon_SOL.svg";
import IconUSDC from "@assets/icon/icon_USDC.svg";
import IconUSDT from "@assets/icon/icon_USDT.svg";
export default function RewardClaimPanel() {
  const sunEarned = 1468.56;
  const usdEarned = 12278.56;

  const items = [
    { key: "1", value: 24.524, title: "SOL", icon: IconSOL },
    { key: "2", value: 245.5, title: "USDC", icon: IconUSDC },
    { key: "3", value: 45.5, title: "USDT", icon: IconUSDT },
  ];

  const valueMap = useMemo(() => {
    return new Map(items.map((item) => [item.key, item.value]));
  }, [items]);

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selectedValue = selectedKey ? valueMap.get(selectedKey) : null;
  return (
    <Box
      bg="linear-gradient(152.22deg,#14161B 38.95%,#15161C 96.26%)"
      w="full"
      h="full"
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
              {sunEarned}
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
              $
              {usdEarned.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </Text>
          </HStack>
        </Box>

        <Box w="full" h="1px" bg="#FFFFFF1A" />

        {/* Claim title */}
        <Text fontSize="14px" color="#C7CCD9" fontWeight="normal">
          Claim Your Reward
        </Text>

        {/* Radio Group */}
        <RadioCard.Root
          value={selectedKey ?? ""}
          onValueChange={(e) => setSelectedKey(e.value)}
          defaultValue="1"
        >
          <Stack direction="column" gap="12px">
            {items.map((item, index) => (
              <RadioCard.Item
                key={index}
                value={item.key}
                border="1px solid transparent"
                borderRadius="8px"
                background={
                  selectedKey === item.key
                    ? `linear-gradient(rgba(27, 17, 0, 0.95), rgba(27, 17, 0, 0.95)) padding-box,
                       linear-gradient(180deg, #FFAF40 0%, #FF9A0D 100%) border-box`
                    : "#0D0D0D"
                }
              >
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl w="full">
                  <HStack justify="space-between" align="center" w="full">
                    <HStack gap="6px">
                      <chakra.img
                        src={item.icon}
                        alt={`Icon of ${item.title}`}
                        w="28px"
                        h="28px"
                      />
                      <Text fontWeight="medium" fontSize="16px" color="white">
                        {item.title}
                      </Text>
                    </HStack>
                    <Box textAlign="right">
                      <Text fontWeight="bold" fontSize="16px" color="white">
                        {item.value}
                      </Text>
                      <Text
                        fontWeight="medium"
                        fontSize="12px"
                        color="whiteAlpha.700"
                      >
                        ${item.key}
                      </Text>
                    </Box>
                  </HStack>
                </RadioCard.ItemControl>
              </RadioCard.Item>
            ))}
          </Stack>
        </RadioCard.Root>

        {/* Claim Button */}
        <Button
          mt="67px"
          h="58px"
          border="1px solid transparent"
          borderRadius="8px"
          fontSize="16px"
          fontWeight="bold"
          color="#1A1001"
          background={`
            linear-gradient(94.13deg, #FFDE91 -3.77%, #FFAE00 19.01%, #FF7700 119.2%) padding-box,
            linear-gradient(271.06deg, #FFA023 8.52%, #FFF8E8 104.75%) border-box
          `}
          _hover={{
            filter: "brightness(1.15)",
          }}
        >
          Claim Now
        </Button>
      </Stack>
    </Box>
  );
}
