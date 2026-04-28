import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Navbar = () => {
  return (
    <Container>
      <Logo href="/">PokeTrade</Logo>
      <RightSection>
        <ConnectButton>Connect Wallet</ConnectButton>
      </RightSection>
    </Container>
  );
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

const RightSection = styled.nav`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #111827;
  text-decoration: none;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.75;
  }
`;

const ConnectButton = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: #facc15;
  color: #000;
  border: 2px solid #000; 
  border-radius: 0;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: #fcd34d; 
  }
`;

export default Navbar;