import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import ArrowLeft from "@assets/arrow_left.svg";

export default function GoHomeButton() {
  const navigate = useNavigate();

  return (
    <Button
      size={"xl"}
      rounded={"8px"}
      background="linear-gradient(311.41deg, rgba(255, 255, 255, 0.19) 9.23%, rgba(255, 255, 255, 0.01) 102.79%)"
      _hover={{
        filter: "brightness(1.15)",
      }}
      onClick={() => navigate("/")}
    >
      <chakra.img src={ArrowLeft} alt="arrow left" w="25px" h="25px" />
      <Text fontSize={"14px"} color={"#C7CCD9"} fontWeight={"medium"}>
        Back to home
      </Text>
    </Button>
  );
}
