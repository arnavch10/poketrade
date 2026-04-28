import React from 'react'
import styled from 'styled-components'
import { useStateContext } from '@/context/StateContext';
import CardGrid from '@/components/Dashboard/CardGrid';
import MarketplaceNavbar from '@/components/Dashboard/MarketplaceNavbar';
import { useState } from 'react';

const Marketplace = () => {

    // cards
    const [cards, setCards] = useState([]);

  return (
    <>
        <MarketplaceNavbar />
        <div>marketplace</div>
        <CardGrid  cards={cards} />
    </>
    
  )
}

export default Marketplace