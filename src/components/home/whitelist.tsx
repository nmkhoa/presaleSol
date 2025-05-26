import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";
import { paymentMethods } from "../../constants/home";
import { useContext, useState } from "react";
import { ConnectWalletContext } from "../../contexts/connect-wallet-context";

const Whitelist = () => {
  const [method, setMethod] = useState(paymentMethods[0]);
  const { setShowModal } = useContext(ConnectWalletContext);

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
              onClick={() => setMethod(item)}
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
      <Box
        className="btn-connect-wallet"
        height={"58px"}
        mt={"20px"}
        cursor={"pointer"}
        onClick={() => setShowModal(true)}
      >
        <div>Buy $UN Now</div>
      </Box>
      <Text
        mt={"20px"}
        pb={"10px"}
        color={"#FF9A0D"}
        textAlign={"center"}
        fontWeight={700}
      >
        Get rewards of 25%
      </Text>
    </Box>
  );
};

export default Whitelist;
