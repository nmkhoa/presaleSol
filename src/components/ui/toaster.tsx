"use client";

import {
  Toaster as ChakraToaster,
  Icon,
  Link,
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
        borderColor: "var(--success-boder-toast)",
        color: "var(--success-color-toast)",
        bg: "linear-gradient(276.58deg, var(--success-bg-light) -37.28%, var(--success-bg-normal) 13.79%, var(--success-bg-semi) 78.76%, var(--suceess-bg-extra) 130.23%)",
      };
    case "error":
      return {
        icon: <HiOutlineNoSymbol />,
        borderColor: "var(--error-border-toast)",
        color: "var(--error-message-color)",
        bg: "linear-gradient(276.58deg, var(--error-bg-light) -37.28%, var(--error-bg-normal) 13.79%, var(--error-bg-semi) 78.76%, var(--error-bg-extra) 130.23%)",
      };
    case "info":
      return {
        icon: <HiOutlineInformationCircle />,
        borderColor: "var(--info-border-toast)",
        color: "var(--info-color-toast)",
        bg: "linear-gradient(276.58deg, var(--info-bg-light) -37.28%, var(--info-bg-normal) 13.79%, var(--info-bg-semi) 78.76%, var(--info-bg-extra) 130.23%)",
      };
    case "warning":
    default:
      return {
        icon: <HiOutlineExclamationTriangle />,
        borderColor: "var(--warning-border-toast)",
        color: "var(--warning-color-toast)",
        bg: "linear-gradient(276.58deg, var(--warning-bg-light) -37.28%, var(--warning-bg-normal) 13.79%, var(--warning-bg-semi) 78.76%, var(--warning-bg-extra) 130.23%)",
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
                    {toast.meta?.url && toast?.meta?.urlTile && (
                      <Link
                        color={"white"}
                        href={toast.meta?.url}
                        target="_blank"
                        pl={"4px"}
                        textDecoration={"underline"}
                      >
                        {toast?.meta?.urlTile}
                      </Link>
                    )}
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
