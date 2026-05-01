import React from "react";
import styled from "styled-components";
import ConnectWalletButton from "@/components/LandingPage/Button";

const Hero = () => {
  return (
    <Container>
      <ContentWrapper>
        <FlexRow>
          <TextCard>
            <Logo>POKETRADE</Logo>

            <Header>Create, Own, and Sell Digital Collectible Cards.</Header>

            <Slogan>
              Build your collection of custom fantasy-themed trading cards, all stored on a secure blockchain.
            </Slogan>

            <SubSlogan>
              Mint new cards, explore the marketplace, and sell your own custom cards.
            </SubSlogan>
          </TextCard>

          <GraphicWrapper>
            <CardPreview>
              <CardTop>
                <CardTitle>Mythic Card</CardTitle>
                <Hp>HP 120</Hp>
              </CardTop>

              <CardArt></CardArt>

              <CardInfo>
                <CardRarity>SUPER RARE</CardRarity>
                <CardText>Ancient blockchain collectible</CardText>
              </CardInfo>
            </CardPreview>
          </GraphicWrapper>
        </FlexRow>

        <ConnectWalletButton />
      </ContentWrapper>
    </Container>
  );
};

export default Hero;

const Container = styled.div`
  flex: 1;
  background:
    linear-gradient(rgba(255, 255, 255, 0.08) 2px, transparent 2px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 2px, transparent 2px),
    #fef3c7;
  background-size: 48px 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2.5rem;
  }
`;

const TextCard = styled.div`
  background: #111827;
  color: #f9fafb;
  border: 4px solid black;
  border-radius: 0;
  padding: 3rem;
  max-width: 42rem;
  box-shadow: 10px 10px 0 black;
`;

const Logo = styled.div`
  display: inline-block;
  background: #facc15;
  color: #111827;
  border: 3px solid black;
  padding: 0.4rem 0.8rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  letter-spacing: 2px;
`;

const Header = styled.h1`
  font-size: clamp(2.3rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.05;
  margin: 0;
`;

const Slogan = styled.p`
  margin-top: 1.5rem;
  font-size: 1.3rem;
  line-height: 1.6;
  color: #fef3c7;
`;

const SubSlogan = styled.p`
  margin-top: 1.25rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #d1d5db;
`;

const GraphicWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CardPreview = styled.div`
  width: 20rem;
  height: 28rem;
  background: purple;
  border: 4px solid black;
  border-radius: 0;
  padding: 1.5rem;
  color: #111827;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 10px 10px 0 black;
  transform: rotate(3deg);
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fef3c7;
  border: 3px solid black;
  padding: 0.75rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 900;
  margin: 0;
`;

const Hp = styled.div`
  font-weight: 900;
  color: #dc2626;
`;

const CardArt = styled.div`
  background: #fef3c7;
  border: 3px solid black;
  height: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
`;

const CardInfo = styled.div`
  background: #fef3c7;
  border: 3px solid black;
  padding: 1rem;
`;

const CardRarity = styled.div`
  background: #facc15;
  border: 3px solid black;
  padding: 0.4rem;
  text-align: center;
  font-weight: 900;
  margin-bottom: 0.75rem;
`;

const CardText = styled.p`
  margin: 0;
  font-weight: 700;
  text-align: center;
`;