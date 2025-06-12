import {
  Accordion,
  Box,
  Flex,
  Image,
  Link,
  Span,
  Text,
} from "@chakra-ui/react";
import { askedQuestions, navKey, partners } from "../../../constants/home";

const CryptoAlliance = () => {
  return (
    <Box
      id={navKey.partners}
      position={"relative"}
      pt={"64px"}
      md={{ pt: "140px" }}
    >
      <Box
        position={"absolute"}
        w={"100%"}
        h={"400px"}
        backgroundImage={"url(/images/crypto_alliance_tablet.jpg)"}
        backgroundSize={"auto 100%"}
        backgroundPosition={"center 70px"}
        backgroundRepeat={"no-repeat"}
        md={{ h: "530px" }}
        xl={{
          h: "692px",
          backgroundImage: "url(/images/crypto_alliance.jpg)",
        }}
      />
      <Box position={"relative"}>
        <Box maxW={"1240px"} mx={"auto"}>
          <Text
            maxW={"720px"}
            mx={"auto"}
            pt={"20px"}
            px={"12px"}
            className="text-secondary"
            fontSize={"28px"}
            fontWeight={700}
            lineHeight={"140%"}
            md={{ fontSize: "36px" }}
            xl={{
              maxW: "1240px",
              pt: 0,
              fontSize: "48px",
            }}
          >
            LEADING THE FREEDOM
            <br /> CRYPTO ALLIANCE
          </Text>
          <Text
            maxW={"720px"}
            mx={"auto"}
            pt={"20px"}
            px={"12px"}
            fontSize={"14px"}
            fontWeight={500}
            lineHeight={"140%"}
            md={{ fontSize: "14px" }}
            xl={{
              maxW: "1240px",
              pt: 0,
              fontSize: "4 16px",
            }}
          >
            Unich drives the FCA - a network of 30+ trusted innovators.
          </Text>
        </Box>
        <Box
          mt={"36px"}
          overflow={"hidden"}
          xl={{
            mt: "42px",
          }}
        >
          <Flex
            w={"fit-content"}
            mt={{ base: "20px", xl: "80px" }}
            gap={"24px"}
            className="animation-alliance"
          >
            {[...partners, ...partners]?.map((partner, index) => {
              return (
                <Link
                  key={index}
                  w={"fit-content"}
                  href={partner.url}
                  outline={"none"}
                  target="_blank"
                >
                  <Image
                    src={partner.img}
                    w={{
                      base: `calc(${partner.width} / 1.2)`,
                      md: partner.width,
                    }}
                    minW={{
                      base: `calc(${partner.width} / 1.2)`,
                      md: partner.width,
                    }}
                    h={"auto"}
                    borderRadius={{ base: "14px", md: "17px" }}
                    alt="partner"
                  />
                </Link>
              );
            })}
          </Flex>
        </Box>
        <Box
          id={navKey.faq}
          maxW={"720px"}
          mx={"auto"}
          pt={"120px"}
          px={"12px"}
          xl={{ maxW: "1240px", px: "0" }}
          md={{ pt: "200px" }}
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
                background={"var(--progress-out-bg)"}
                border={"1px solid var(--question-border-color)"}
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
              href="https://docs.unich.com/welcome-to-unich/unich-tokenomics"
              className="flex gap-1 items-center"
              p={"12px"}
              fontWeight={700}
              color={"var(--text-primary-link-color)"}
              fontSize={"14px"}
              xl={{
                fontSize: "16px",
              }}
              target="_blank"
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
