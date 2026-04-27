/*
This is the dashboard navbar component.

Very similar to the regular navbar component, but incorporates the sign out functionaly
from the useStateContext.
*/

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useStateContext } from '@/context/StateContext';

const DashboardNavbar = () => {
  const { signOutUser } = useStateContext();

  return (
    <Container>
      <Logo href="/dashboard">Travelify</Logo>

      <RightSection>
        <SignOutButton onClick={signOutUser}>
          Sign Out
        </SignOutButton>
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

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SignOutButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f87171;
  border-radius: 9999px;
  border: none;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(248, 113, 113, 0.5);
  transition: all 0.15s ease;

  &:hover {
    background-color: #fecaca;
  }
`;

export default DashboardNavbar;