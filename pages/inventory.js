import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { ethers } from "ethers";
import MarketplaceNavbar from '@/components/Dashboard/MarketplaceNavbar';
import ABI from "../public/abi/PokeContract.json"
import CardGrid from '@/components/Dashboard/CardGrid';
const Inventory = () => {
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    const [cards, setCards] = useState([]);

    const getInventory = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.etheruem);
            const signer = await provider.getSigner();

            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

            const tot = await contract.getTokenCount();
            const totNum = Number(tot);

            const invenCards = [];

            for (let tokenID = 0; tokenID < totNum; tokenID++) {
                try {

                    const tokenURI = await contract.tokenURI(tokenID);
                    const metadata = await fetch(tokenURI).then((res) => res.json());
                    const rarity = metadata.attributes?.find(
                    (attr) => attr.trait_type.toLowerCase() === "rarity")?.value || "common";

                    invenCards.push({
                        tokenID, 
                        name: metadata.name,
                        image: metadata.image,
                        rarity,
                        price: "Not Listed"
                    })
                    
                } catch (err) {
                    console.log("Couldn't get card", err)
                }
            }

            setCards(invenCards);

        } catch (err) {
            console.log("Couldn't load your cards", err);
        }
    };

     useEffect(() => {
        getInventory();
      }, []);


    return (
        <Container>
            <MarketplaceNavbar page="mint" />
            <Title>Inventory</Title>
            <CardGrid cards={cards} />
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