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
        <BuyButton onClick={onBuy}>Buy</BuyButton>
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
  margin-top: 0.75rem;
  padding: 0.6rem 1rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  background-color: #facc15;
  font-weight: 600;
  color: #1f2937;
  transition: 0.2s ease;

  &:hover {
    background-color: #fde047;
  }
`;