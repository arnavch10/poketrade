/*
This is the navbar component for both the landing page and the dashboard.

The component includes the title of the app on the left
and the login and signup links on the right.
*/
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';



const Navbar = () => {
  return (
    <Container>
        <Logo href="/">PokeTrade</Logo>
      <RightSection>
        <LoginLink href="/auth/login/">Login</LoginLink>
        <SignupLink href="/auth/signup/">Sign up</SignupLink>
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

const LoginLink = styled(Link)`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover {
    background-color: #f9fafb;
    border-color: #9ca3af;
  }
`;

const SignupLink = styled(Link)`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #000000;
  background-color: #93c5fd;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5);
  transition: all 0.15s ease;

  &:hover {
    background-color: #dbeafe;
  }
`;

export default Navbar;