import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import CardGrid from "@/components/Dashboard/CardGrid";
import MarketplaceNavbar from "@/components/Dashboard/MarketplaceNavbar";
import ABI from "../public/abi/PokeContract.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const Marketplace = () => {
  const [cards, setCards] = useState([]);

  const loadCards = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

      const total = await contract.getTokenCount();
      const totalNumber = Number(total);

      console.log("Total minted:", totalNumber);

      const loadedCards = [];

      for (let tokenId = 0; tokenId < totalNumber; tokenId++) {
        try {

          // check for listed cards
          const lists = await contract.listings(tokenId);

          if (!lists.active) {
            continue
          }


          const tokenURI = await contract.tokenURI(tokenId);
          console.log("Token URI:", tokenURI);

          const metadata = await fetch(tokenURI).then((res) => res.json());
          console.log("Metadata:", metadata);

          const rarity =
            metadata.attributes?.find(
              (attr) => attr.trait_type.toLowerCase() === "rarity"
            )?.value || "common";

          const price =
            metadata.attributes?.find(
              (attr) => attr.trait_type.toLowerCase() === "price"
            )?.value || "0";

          loadedCards.push({
            tokenId,
            name: metadata.name,
            image: metadata.image,
            rarity,
            price: ethers.formatEther(lists.price),
          });
        } catch (err) {
          console.log(`Error loading token ${tokenId}:`, err);
        }
      }

      setCards(loadedCards);
    } catch (err) {
      console.error("Error loading marketplace cards:", err);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);


  // buying a card


  const buyCard = async (tokenId, price) => {
    try {
      if (!window.ethereum) {
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      
      const tx = await contract.buyCard(tokenId, {value: ethers.parseEther(price)});
      alert("Buying card");
      await tx.wait();
      alert("Card bought!");
      loadCards();

    } catch (err) {
      console.log("Unable to purchase card!");
    }
  }

  return (
    <Container>
      <MarketplaceNavbar page="marketplace" />
      <Title>Marketplace</Title>
      <CardGrid cards={cards} onBuy={(tokenId, price) => buyCard(tokenId, price)} />
    </Container>
  );
};

export default Marketplace;

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