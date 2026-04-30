import Hero from "@/components/LandingPage/Hero";
import styled from "styled-components";
import Navbar from "@/components/Dashboard/Navbar";

export default function Home() {
  return (
    <LandingPageContainer>
      <Navbar />
      <Main>
        <Hero />
      </Main>
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
  display: flex;
`;