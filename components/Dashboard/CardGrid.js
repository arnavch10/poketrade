import React from "react";
import styled from "styled-components";
import Card from "./Card";

/*
This is the cardgrid component that is displayed in the marketplace that places the cards generated in a grid format

This page also makes sure that cards on the marketplace don't have a buy button if the user that currently minted the cards is logged in.
*/


const CardGrid = ({ cards = [], onBuy, currentUser }) => {
  return (
    <GridWrapper>
      <Grid>
        {cards.map((card) => (
          <Card key={card.tokenId} name={card.name} image={card.image} rarity={card.rarity} price={card.price} onBuy={onBuy ? () => onBuy(card.tokenId, card.price) : undefined} isOwner={card.seller?.toLowerCase() === currentUser?.toLowerCase()}/>
        ))}
      </Grid>
    </GridWrapper>
  );
};

export default CardGrid;



const GridWrapper = styled.div`
  width: 100%;
  padding: 2rem 4rem;
  display: flex;
  justify-content: center;
`;

const Grid = styled.div`
  width: 100%;
  max-width: 1400px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }
`;