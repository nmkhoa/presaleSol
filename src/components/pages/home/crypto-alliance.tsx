import {
  Accordion,
  Box,
  Flex,
  Image,
  Link,
  Span,
  Text,
} from "@chakra-ui/react";
import { askedQuestions, navKey } from "../../../constants/home";

const CryptoAlliance = () => {
  return (
    <Box id={navKey.partners} position={"relative"}>
      <Box
        position={"absolute"}
        w={"100%"}
        h={"692px"}
        backgroundImage={"url(/images/crypto_alliance.svg)"}
        backgroundSize={"cover"}
        backgroundPosition={"center 70px"}
      />
      <Box position={"relative"}>
        <Box maxW={"1240px"} mx={"auto"} mt={"140px"}>
          <Text
            w={"fit-content"}
            className="text-secondary"
            fontSize={"48px"}
            fontWeight={700}
            lineHeight={"140%"}
          >
            LEADING THE FREEDOM
            <br /> CRYPTO ALLIANCE
          </Text>
          <Text mt={"8px"} fontWeight={500}>
            Unich drives the FCA - a network of 30+ trusted innovators.
          </Text>
        </Box>
        <Box mt={"42px"} overflow={"hidden"}>
          <Flex w={"fit-content"} className="animation-alliance">
            <Image
              src="/images/alliance.svg"
              w={"2281px"}
              minW={"2281px"}
              h={"172px"}
            />
            <Image
              src="/images/alliance.svg"
              w={"2281px"}
              minW={"2281px"}
              h={"172px"}
            />
          </Flex>
        </Box>
        <Box id={navKey.faq} maxW={"1240px"} mx={"auto"} mt={"197px"}>
          <Text
            className="text-secondary"
            fontSize={"64px"}
            lineHeight={"64px"}
            fontWeight={300}
          >
            FREQUENTLY
          </Text>
          <Text
            className="text-secondary"
            fontSize={"64px"}
            lineHeight={"64px"}
            fontWeight={700}
          >
            ASKED QUESTIONS
          </Text>
          <Accordion.Root collapsible mt={"52px"} maxW={"863px"}>
            {askedQuestions.map((item, index) => (
              <Accordion.Item
                key={index}
                value={item.question}
                mb={"10px"}
                pb={"28px"}
                background={"#06070A"}
                border={"1px solid #272D3D"}
                borderRadius={"12px"}
              >
                <Accordion.ItemTrigger padding={"28px 28px 0"}>
                  <Span flex="1" fontSize={"24px"} fontWeight={700}>
                    {item.question}
                  </Span>
                  <Accordion.ItemIndicator>
                    <Image
                      src="/images/quest_arrow.svg"
                      w={"40px"}
                      h={"40px"}
                      alt="arrow"
                    />
                  </Accordion.ItemIndicator>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody
                    px={"28px"}
                    pt={"10px"}
                    pb={0}
                    fontWeight={500}
                  >
                    {item.answer}
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
          <Link
            href=""
            className="flex gap-1 items-center"
            p={"12px"}
            fontWeight={700}
            color={"#FF9A0D"}
          >
            View more
            <Image
              src="/images/view_more.svg"
              w={"20px"}
              h={"20px"}
              alt="view more"
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default CryptoAlliance;
