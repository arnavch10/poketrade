import React from "react";
import styled from "styled-components";

const rarityColors = {
  common: "#9CA3AF",
  rare: "#3B82F6",
  super_rare: "#8B5CF6",
  legendary: "#FACC15",
};

const Card = ({ name, image, rarity, price, onBuy }) => {
  return (
    <CardWrapper rarity={rarity}>
      <ImageWrapper>
        <CardImage src={image} alt={name} />
      </ImageWrapper>

      <CardInfo>
        <CardName>{name}</CardName>
        <CardPrice>Price: {price} BNB</CardPrice>
        <CardRarity>Rarity: {rarity}</CardRarity>
        {onBuy && <BuyButton onClick={onBuy}>Buy</BuyButton>}
      </CardInfo>
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  background: #fef3c7;
  border-radius: 0;
  padding: 1.25rem;
  width: 16rem;
  border: 3px solid black;
  box-shadow:
    0 0 20px ${({ rarity }) => rarityColors[rarity] || "#9CA3AF"},
    0px 8px 16px rgba(0,0,0,0.25);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 12rem;
  background: #fcd34d;
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardInfo = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const CardName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
`;

const CardPrice = styled.p`
  font-size: 1rem;
  margin-top: 0.5rem;
  color: #4b5563;
`;

const CardRarity = styled.p`
  font-size: 1rem;
  margin-top: 0.5rem;
  color: #4b5563;
`;

const BuyButton = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1.2rem;
  background: #ef4444; /* red */
  color: #1f2937;
  font-weight: 800;
  border: 3px solid #1f2937;
  border-radius: 0;
  cursor: pointer;
  transition: 0.2s ease;
  box-shadow: 4px 4px 0px #1f2937;
  &:hover {
    background: #f87171;
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px #1f2937;
  }
  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #1f2937;
  }
`;