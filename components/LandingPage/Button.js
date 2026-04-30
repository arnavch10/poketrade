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
      router.push("/marketplace");
    }
  };

  return (
    <Container>
      <ButtonStyled onClick={handleClick}>
        {address ? "Go to Marketplace" : "Connect Wallet"}
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
  background: #facc15;
  color: #111827;
  padding: 1rem 2.5rem;
  border: 3px solid black;
  border-radius: 0;
  cursor: pointer;
  font-size: 1.15rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 6px 6px 0 black;
  transition: all 0.15s ease;
  &:hover {
    background: #fef3c7;
    transform: translate(3px, 3px);
    box-shadow: 3px 3px 0 black;
  }
  &:active {
    transform: translate(6px, 6px);
    box-shadow: none;
  }
`;

export default ConnectWalletButton;