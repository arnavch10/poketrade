import React from "react";
import styled from "styled-components";
import Card from "./Card";



const CardGrid = ({ cards = [] }) => {
  return (
    <GridWrapper>
      <Grid>
        {cards.map((card) => (
          <Card key={card.id} name={card.name} image={card.image} rarity={card.rarity} price={card.price} onBuy={() => card.onBuy?.(card.id)} />
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