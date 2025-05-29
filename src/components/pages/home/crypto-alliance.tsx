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
        h={"400px"}
        backgroundImage={"url(/images/crypto_alliance_tablet.svg)"}
        backgroundSize={"auto 100%"}
        backgroundPosition={"center 70px"}
        md={{ h: "530px" }}
        xl={{
          h: "692px",
          backgroundImage: "url(/images/crypto_alliance.svg)",
        }}
      />
      <Box position={"relative"}>
        <Box maxW={"1240px"} mx={"auto"} mt={"64px"} md={{ mt: "140px" }}>
          <Text
            maxW={"720px"}
            mx={"auto"}
            pt={"20px"}
            px={"24px"}
            className="text-secondary"
            fontSize={"28px"}
            fontWeight={700}
            lineHeight={"140%"}
            md={{ px: "0", fontSize: "36px" }}
            xl={{
              maxW: "900px",
              pt: 0,
              fontSize: "48px",
            }}
          >
            Experience Top-Tier Decentralized Platforms Backed By
          </Text>
        </Box>
        <Box
          mt={"36px"}
          overflow={"hidden"}
          xl={{
            mt: "42px",
          }}
        >
          <Flex w={"fit-content"} className="animation-alliance">
            <Image
              src="/images/alliance.svg"
              w={"1500px"}
              minW={"1500px"}
              h={"auto"}
              md={{ w: "2281px", minW: "2281px" }}
            />
            <Image
              src="/images/alliance.svg"
              w={"1500px"}
              minW={"1500px"}
              h={"auto"}
              md={{ w: "2281px", minW: "2281px" }}
            />
          </Flex>
        </Box>
        <Box
          id={navKey.faq}
          maxW={"720px"}
          mx={"auto"}
          mt={"68px"}
          px={"12px"}
          xl={{ maxW: "1240px", px: "0" }}
          md={{ mt: "197px" }}
        >
          <Text
            className="text-secondary"
            fontSize={"28px"}
            lineHeight={"28px"}
            fontWeight={300}
            md={{ fontSize: "42px", lineHeight: "42px" }}
            xl={{ fontSize: "64px", lineHeight: "64px" }}
          >
            FREQUENTLY
          </Text>
          <Text
            className="text-secondary"
            fontSize={"28px"}
            lineHeight={"28px"}
            fontWeight={700}
            md={{ fontSize: "42px", lineHeight: "42px" }}
            xl={{ fontSize: "64px", lineHeight: "64px" }}
          >
            ASKED QUESTIONS
          </Text>
          <Accordion.Root
            collapsible
            mt={"28px"}
            maxW={"863px"}
            md={{ mt: "52px" }}
          >
            {askedQuestions.map((item, index) => (
              <Accordion.Item
                key={index}
                value={item.question}
                mb={"10px"}
                pb={"20px"}
                background={"#06070A"}
                border={"1px solid #272D3D"}
                borderRadius={"12px"}
                xl={{
                  pb: "28px",
                }}
              >
                <Accordion.ItemTrigger
                  padding={"20px 20px 0"}
                  xl={{
                    p: "28px 28px 0",
                  }}
                >
                  <Span
                    flex="1"
                    fontSize={"16px"}
                    fontWeight={700}
                    xl={{
                      fontSize: "24px",
                    }}
                  >
                    {item.question}
                  </Span>
                  <Accordion.ItemIndicator>
                    <Image
                      src="/images/quest_arrow.svg"
                      w={"32px"}
                      h={"32px"}
                      alt="arrow"
                      xl={{
                        w: "40px",
                        h: "40px",
                      }}
                    />
                  </Accordion.ItemIndicator>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody
                    px={"20px"}
                    pt={"10px"}
                    pb={0}
                    fontWeight={500}
                    fontSize={"14px"}
                    whiteSpace={"break-spaces"}
                    xl={{
                      px: "28px",
                      fontSize: "16px",
                    }}
                  >
                    {item.answer}
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
          <Flex
            justifyContent={"center"}
            xl={{
              justifyContent: "left",
            }}
          >
            <Link
              href=""
              className="flex gap-1 items-center"
              p={"12px"}
              fontWeight={700}
              color={"#FF9A0D"}
              fontSize={"14px"}
              xl={{
                fontSize: "16px",
              }}
            >
              View more
              <Image
                src="/images/view_more.svg"
                w={"20px"}
                h={"20px"}
                alt="view more"
              />
            </Link>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default CryptoAlliance;
