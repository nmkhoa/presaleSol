import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { footerLinks, footerSocialLinks } from "../../../constants/home";

const FooterHome = () => {
  return (
    <Box pt={"180px"}>
      <Image
        src="/images/unich.svg"
        w={"1229px"}
        h={"269px"}
        mx={"auto"}
        alt="unich"
      />
      <Flex
        h={"411px"}
        pb={"24px"}
        alignItems={"end"}
        background={"url(/images/footer.svg)"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
      >
        <Box w={"100%"}>
          <Flex
            maxW={"1240px"}
            mx={"auto"}
            py={"24px"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Image src="/images/logo.svg" w={"140px"} h={"35px"} alt="logo" />
            <Flex gap={"27px"}>
              {footerLinks.map((item) => {
                return (
                  <Text key={item.title} p={"8px"}>
                    {item.title}
                  </Text>
                );
              })}
            </Flex>
          </Flex>
          <Box w={"100%"} h={"1px"} background={"#FAFAFA"} opacity={"10%"} />
          <Flex
            maxW={"1240px"}
            mx={"auto"}
            py={"24px"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Flex gap={"16px"}>
              <Text fontSize={"14px"} fontWeight={500}>
                Privacy Policy
              </Text>
              <Text fontSize={"14px"} fontWeight={500}>
                Terms and Conditions
              </Text>
              <Flex gap={"4px"} fontSize={"14px"} fontWeight={500}>
                Contact
                <Text color={"#FF9A0D"}>hi@unich.com</Text>
              </Flex>
            </Flex>
            <Image src="/images/build_solana.svg" w={"171px"} h={"36px"} />
          </Flex>
          <Box w={"100%"} h={"1px"} background={"#FAFAFA"} opacity={"10%"} />
          <Flex
            maxW={"1240px"}
            mx={"auto"}
            py={"16px"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontSize={"12px"} fontWeight={500}>
              © Copyright 2024 by Unich. All rights reserved
            </Text>
            <Flex gap={"12px"} alignItems={"center"}>
              {footerSocialLinks?.map((item) => {
                return (
                  <Link key={item.title} href={item.link} target="_blank">
                    <Image
                      src={item.icon}
                      w={"24px"}
                      h={"24px"}
                      alt={item.title}
                    />
                  </Link>
                );
              })}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default FooterHome;
