import React from 'react'
import styled from "styled-components";
import { ethers } from "ethers";
import MarketplaceNavbar from '@/components/Dashboard/MarketplaceNavbar';

const Inventory = () => {
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;






    return (
        <Container>
            <MarketplaceNavbar page="mint" />
            <Title>Inventory</Title>
        </Container>
    )
}

export default Inventory

const Container = styled.div`
  min-height: 100vh;
  background: #fff7cc;
  padding-bottom: 50px;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
`;