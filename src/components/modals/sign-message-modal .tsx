import { Box, Flex, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import DigitalSignature from "@assets/digital_signature.svg";

export const SignMessageModal = () => {
  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      zIndex={50}
    >
      <Box position="absolute" inset={0} bg="blackAlpha.500" />

      <Flex
        direction="column"
        align="center"
        justify="center"
        gap={3}
        position="relative"
        bg="white"
        w="500px"
        h="290px"
        borderRadius="2xl"
        boxShadow="xl"
        zIndex={1}
      >
        <Image
          src={DigitalSignature}
          alt="Digital Signature"
          w="64px"
          h="64px"
        />

        <VStack gap={1}>
          <Text fontSize="3xl" fontWeight="semibold" color="gray.800">
            Signature Required
          </Text>
          <Text fontSize="sm" color="gray.600">
            Please sign the message to login
          </Text>
        </VStack>

        <Spinner size="xl" color="blue.500" w="48px" h="48px" />
      </Flex>
    </Flex>
  );
};
