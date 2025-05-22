import { Box } from "@chakra-ui/react";
import HeroSection from "../components/pages/home/hero-section";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Box
        h={"806px"}
        mt={"64px"}
        backgroundImage={"url(/images/token_utilities.svg)"}
        backgroundSize={"auto 100%"}
        backgroundPosition={"center"}
      />
    </>
  );
};

export default Home;
