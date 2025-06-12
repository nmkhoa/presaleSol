import { Box, Image } from "@chakra-ui/react";

interface Props {
  message?: string;
}

const NoData = ({ message }: Props) => {
  return (
    <Box pt={"24px"}>
      <Image
        src="/images/no_data.svg"
        mx={"auto"}
        w={{ base: "120px", md: "180px" }}
        h={{ base: "120px", md: "180px" }}
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
