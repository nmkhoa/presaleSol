import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import ArrowLeft from "@assets/arrow_left.svg";

export default function GoHomeButton() {
  const navigate = useNavigate();

  return (
    <Button
      p={"8px"}
      rounded={"8px"}
      background="linear-gradient(311.41deg, var(--back-home-bg-light) 9.23%, var(--back-home-bg-normal) 102.79%)"
      _hover={{
        filter: "brightness(1.15)",
      }}
      border={"none"}
      onClick={() => navigate("/")}
    >
      <chakra.img src={ArrowLeft} alt="arrow left" w="25px" h="25px" />
      <Text
        fontSize={"14px"}
        color={"var(--normal-text-color)"}
        fontWeight={"medium"}
      >
        Back to home
      </Text>
    </Button>
  );
}
