import Hero from "@/components/LandingPage/Hero";
import styled from "styled-components";
import Navbar from "@/components/Dashboard/Navbar";
import Footer from "@/components/LandingPage/Footer";

export default function Home() {
  return (
    <LandingPageContainer>
      <Navbar />
      <Main>
        <Hero />
      </Main>
      <Footer />
    </LandingPageContainer>
  );
}

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;