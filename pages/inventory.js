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
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

            // get current user
            const userAdd = await signer.getAddress();


            const tot = await contract.getTokenCount();
            const totNum = Number(tot);

            const invenCards = [];

            for (let tokenId = 0; tokenId < totNum; tokenId++) {
                try {


                    // check for user
                    const owner = await contract.ownerOf(tokenId);

                    if (owner.toLowerCase() !== userAdd.toLowerCase()) {
                        continue;
                    }

                    // get listing of the minted cards
                    const list = await contract.listings(tokenId);
                    if (list.active) {
                        continue;
                    }   

                    const tokenURI = await contract.tokenURI(tokenId);
                    const metadata = await fetch(tokenURI).then((res) => res.json());
                    const rarity = metadata.attributes?.find(
                    (attr) => attr.trait_type.toLowerCase() === "rarity")?.value || "common";

                    invenCards.push({
                        tokenId, 
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