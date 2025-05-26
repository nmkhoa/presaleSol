"use client";

import {
  Toaster as ChakraToaster,
  Icon,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});
import { HiOutlineCheckCircle } from "react-icons/hi";
import {
  HiOutlineNoSymbol,
  HiOutlineExclamationTriangle,
  HiOutlineInformationCircle,
} from "react-icons/hi2";

type ToastType = "success" | "error" | "info" | "warning";

export const getToastColor = (type: ToastType) => {
  switch (type) {
    case "success":
      return {
        icon: <HiOutlineCheckCircle />,
        borderColor: "#C8FF6B33",
        color: "#78C000",
        bg: "linear-gradient(276.58deg, rgba(107, 164, 14, 0.5) -37.28%, rgba(20, 32, 1, 0.8) 13.79%, rgba(20, 32, 1, 0.8) 78.76%, #6BA40E 130.23%)",
      };
    case "error":
      return {
        icon: <HiOutlineNoSymbol />,
        borderColor: "#FF7F6B33",
        color: "#F04438",
        bg: "linear-gradient(276.58deg, rgba(78, 2, 2, 0.5) -37.28%, rgba(21, 4, 1, 0.8) 13.79%, rgba(21, 4, 1, 0.8) 78.76%, #A40E0E 130.23%)",
      };
    case "info":
      return {
        icon: <HiOutlineInformationCircle />,
        borderColor: "#6B8EFF33",
        color: "#7FBFFF",
        bg: "linear-gradient(276.58deg, rgba(9, 2, 78, 0.5) -37.28%, rgba(2, 1, 21, 0.8) 13.79%, rgba(2, 1, 21, 0.8) 78.76%, #0E34A4 130.23%)",
      };
    case "warning":
    default:
      return {
        icon: <HiOutlineExclamationTriangle />,
        borderColor: "#FFB56B33",
        color: "#F79009",
        bg: "linear-gradient(276.58deg, rgba(78, 47, 2, 0.5) -37.28%, rgba(21, 13, 1, 0.8) 13.79%, rgba(21, 13, 1, 0.8) 78.76%, #A4680E 130.23%)",
      };
  }
};
export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => {
          const { color, bg, borderColor, icon } = getToastColor(
            toast.type as ToastType
          );

          return (
            <Toast.Root
              width={{ md: "sm" }}
              background={bg}
              border={`1px solid ${borderColor}`}
              borderRadius="md"
              px="16px"
              py="20px"
              maxW="400px"
              color={"#C7CCD9"}
            >
              {toast.type === "loading" ? (
                <Spinner size="sm" color="blue.solid" />
              ) : (
                <Icon boxSize="6" color={color}>
                  {icon}
                </Icon>
              )}
              <Stack gap="1" flex="1" maxWidth="100%">
                {toast.title ? (
                  <Toast.Title
                    fontSize={"18px"}
                    fontWeight={"bold"}
                    color={color}
                  >
                    {toast.title}
                  </Toast.Title>
                ) : (
                  <Toast.Title
                    fontSize={"18px"}
                    fontWeight={"bold"}
                    color={color}
                  >
                    Notification
                  </Toast.Title>
                )}
                {toast.description && (
                  <Toast.Description fontSize={"16px"} fontWeight={"normal"}>
                    {toast.description}
                  </Toast.Description>
                )}
              </Stack>
              {toast.action && (
                <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
              )}
              {toast.meta?.closable && <Toast.CloseTrigger />}
            </Toast.Root>
          );
        }}
      </ChakraToaster>
    </Portal>
  );
};
