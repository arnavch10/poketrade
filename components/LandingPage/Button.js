import React from "react";
import styled from "styled-components";
import { useStateContext } from "@/context/StateContext";
import { useRouter } from "next/router";

const ConnectWalletButton = () => {
  const { address, connectWallet } = useStateContext();
  const router = useRouter();

  const handleClick = async () => {
    if (!address) {
      await connectWallet();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Container>
      <ButtonStyled onClick={handleClick}>
        {address ? "Go to Dashboard" : "Connect Wallet"}
      </ButtonStyled>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;

const ButtonStyled = styled.button`
  background-color: #93c5fd;
  padding: 1.25rem 2.5rem;
  border-radius: 1rem;
  cursor: pointer;
  color: inherit;
  border: none;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5);
  transition: background-color 0.15s ease;
  font-size: 1.1rem;

  &:hover {
    background-color: #dbeafe;
  }
`;

export default ConnectWalletButton;