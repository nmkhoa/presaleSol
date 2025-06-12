import { Box, Image } from "@chakra-ui/react";

interface Props {
  message?: string;
  size?: string;
}

const NoData = ({ message, size }: Props) => {
  return (
    <Box pt={"24px"}>
      <Image
        src="/images/no_data.svg"
        mx={"auto"}
        w={{ base: "120px", md: size ?? "180px" }}
        h={{ base: "120px", md: size ?? "180px" }}
      />
      <Box
        pb={"60px"}
        px={"12px"}
        textAlign={"center"}
        color={"var(--normal-text-color)"}
        fontWeight={500}
      >
        {message ?? "You haven’t made any purchase yet!"}
      </Box>
    </Box>
  );
};

export default NoData;
