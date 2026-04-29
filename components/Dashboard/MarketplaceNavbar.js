import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useStateContext } from '@/context/StateContext';

const MarketplaceNavbar = ({ page = "marketplace" }) => {
    const router = useRouter();
    const { setAddress, setContract } = useStateContext();

    const handleSignOut = () => {
        setAddress("");
        setContract(null);
        router.push('/');
    }

    const handlePage = () => {
        if (page === "mint") {
          router.push('/marketplace');
        }
        else {
          router.push('/mint');
        }
    }


  return (
    <Container>
      <Logo href="/marketplace">PokeTrade</Logo>

      <RightSection>
        <PageButton onClick={handlePage}>
          Go to {page === "mint" ? "Marketplace" : "Mint"}
        </PageButton>

        <DisconnectButton onClick={handleSignOut}>
          Disconnect Wallet
        </DisconnectButton>
      </RightSection>
    </Container>
  )
};

const Container = styled.header`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #f3f4f6;
  position: sticky;
  top: 0;
  z-index: 50;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;


const Logo = styled(Link)`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #111827;
  text-decoration: none;

  &:hover {
    opacity: 0.75;
  }
`;


const BaseButton = styled.button`
  padding: 0.55rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: 2px solid black;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.15s ease;
`;


const PageButton = styled(BaseButton)`
  background-color: #facc15;
  color: black;
  box-shadow: 3px 3px 0px black;

  &:hover {
    background-color: #fde047;
    transform: translate(1px, 1px);
    box-shadow: 2px 2px 0px black;
  }

  &:active {
    transform: translate(3px, 3px);
    box-shadow: 0px 0px 0px black;
  }
`;


const DisconnectButton = styled(BaseButton)`
  background-color: #f87171;
  color: black;
  box-shadow: 3px 3px 0px black;

  &:hover {
    background-color: #fca5a5;
    transform: translate(1px, 1px);
    box-shadow: 2px 2px 0px black;
  }

  &:active {
    transform: translate(3px, 3px);
    box-shadow: 0px 0px 0px black;
  }
`;

export default MarketplaceNavbar