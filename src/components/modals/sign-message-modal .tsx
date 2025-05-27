import { Flex, Image, Spinner, Text, VStack, Dialog } from "@chakra-ui/react";

interface Props {
  showModal: boolean;
}
import DigitalSignature from "@assets/digital_signature.svg";

export const SignMessageModal = ({ showModal }: Props) => {
  return (
    <Dialog.Root placement={"center"} size={"xs"} open={showModal}>
      <Dialog.Backdrop pointerEvents={"all"} />
      <Dialog.Positioner pointerEvents={"none"}>
        <Dialog.Content borderRadius="2xl">
          <Flex
            direction="column"
            align="center"
            justify="center"
            gap={3}
            position="relative"
            bg="linear-gradient(143.45deg, #17191F 10.97%, #1B1D24 56.87%)"
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

            <VStack gap={"12px"}>
              <Text fontSize="3xl" fontWeight="semibold" color="white">
                Signature Required
              </Text>
              <Text fontSize="sm" color="white">
                Please sign the message to login
              </Text>
            </VStack>

            <Spinner size="xl" color="blue.500" w="48px" h="48px" />
          </Flex>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
