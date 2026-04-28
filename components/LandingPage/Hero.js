import React from "react";
import styled from "styled-components";
import Button from "@/components/LandingPage/Button";
import ConnectWalletButton from "@/components/LandingPage/Button";

const Hero = () => {
  return (
    <Container>

      <ContentWrapper>

        <FlexRow>

          
          <TextCard>
            <Header>
              Create, Own, and Trade Digital Collectible Cards.
            </Header>

            <Slogan>
              Build your collection of unique fantasy-themed trading cards, all 
              securely stored and authenticated on the blockchain.
            </Slogan>

            <SubSlogan>
              Mint new cards, explore the marketplace, and trade with other collectors —
              all from your connected wallet.
            </SubSlogan>
          </TextCard>

         
          <GraphicWrapper>
            <CardPreview>
              <CardTitle>Mythic Card</CardTitle>
              <CardArt>🎴</CardArt>
              <CardRarity>Ultra Rare</CardRarity>
            </CardPreview>
          </GraphicWrapper>

        </FlexRow>

        
        <ConnectWalletButton />

      </ContentWrapper>

    </Container>
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  padding-top: 12rem;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const TextCard = styled.div`
  background-color: #111827;
  color: #f9fafb;
  border-radius: 0.75rem;
  padding: 4rem;
  max-width: 42rem;
  margin-left: 12rem;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
`;

const Header = styled.h1`
  text-align: left;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
`;

const Slogan = styled.p`
  margin-top: 1.25rem;
  font-size: 1.4rem;
  max-width: 30rem;
  opacity: 0.95;
`;

const SubSlogan = styled.p`
  margin-top: 1.75rem;
  font-size: 1.2rem;
  opacity: 0.85;
  max-width: 28rem;
`;

const GraphicWrapper = styled.div`
  margin-right: 4rem;
  display: flex;
`;

const CardPreview = styled.div`
  width: 20rem;
  height: 28rem;
  background: linear-gradient(145deg, #3b82f6, #9333ea);
  border-radius: 1rem;
  padding: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 15px 30px rgba(0,0,0,0.4);
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
`;

const CardArt = styled.div`
  font-size: 5rem;
  text-align: center;
`;

const CardRarity = styled.div`
  text-align: center;
  padding: 0.5rem 1rem;
  background: rgba(255,255,255,0.2);
  border-radius: 0.5rem;
  font-size: 1rem;
  backdrop-filter: blur(4px);
`;

export default Hero;