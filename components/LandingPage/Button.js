/*
Custom navigate dashboard button component for the landing page.
The button takes the user to the dashboard if they are logged in.
*/

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useStateContext } from "@/context/StateContext";

const NavigateDashboard = () => {
  const { user } = useStateContext();
  return (
    <Container>
      <TravelButton href={user ? "/dashboard" : "/auth/login"}>
        Travel Now
      </TravelButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;

const TravelButton = styled(Link)`
  background-color: #93c5fd;
  padding: 1.25rem 2.5rem;
  border-radius: 1rem;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5);
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #dbeafe;
  }
`;

export default NavigateDashboard;
