import React, { useState } from "react";
import styled from "styled-components";
import { useStateContext } from "@/context/StateContext";
import MarketplaceNavbar from '@/components/Dashboard/MarketplaceNavbar';
import { uploadToPinata } from "./storage/storage.js";
import ABI from "../public/abi/PokeContract.json";
import { ethers } from "ethers";

// BSC Testnet Configuration
const BSC_TESTNET_PARAMS = {
    chainId: "0x61", // 97 in hexadecimal
    chainName: "BNB Smart Chain Testnet",
    nativeCurrency: {
        name: "Binance Coin",
        symbol: "tBNB",
        decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
};

const Mint = () => {
    // Pasted from your Remix screenshot
    const CONTRACT_ADDRESS = "0x23EcD1cb9e30Be4E14282Db0D2385Dd3f5549299"; 

    const { address, connectWallet } = useStateContext();

    const [form, setForm] = useState({
        name: "",
        rarity: "common",
        price: "",
        image: null,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };

    // Helper to force MetaMask to the correct network
    const switchNetwork = async () => {
        if (!window.ethereum) return;
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: BSC_TESTNET_PARAMS.chainId }],
            });
        } catch (error) {
            // Error code 4902 means the network isn't added to MetaMask yet
            if (error.code === 4902) {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [BSC_TESTNET_PARAMS],
                });
            } else {
                throw error;
            }
        }
    };

    const handleMint = async () => {
        try {
            // 1. Ensure wallet is connected
            if (!address) {
                await connectWallet();
                return; 
            }

            // 2. Ensure we are on BSC Testnet (Fixes the "ETH" popup issue)
            await switchNetwork();

            // 3. Upload to IPFS via Pinata
            console.log("Uploading to Pinata...");
            const tokenURI = await uploadToPinata(form);
            
            if (!tokenURI) {
                alert("IPFS Upload failed");
                return;
            }

            // 4. Initialize Ethers and Contract
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

            // 5. Trigger the transaction
            console.log("Requesting Mint...");
            const tx = await contract.mintCard(tokenURI);
            
            alert("Transaction sent! Waiting for confirmation...");
            await tx.wait();

            console.log("Minting successful! TokenURI:", tokenURI);
            alert("Success! Card Minted.");

        } catch (error) {
            console.error("Minting Error:", error);
            alert("Transaction failed or was rejected.");
        }
    };

    return (
        <Container>
            <MarketplaceNavbar page="mint" />
            <Title>Mint Your Card</Title>

            <FormCard>
                <Label>Card Name</Label>
                <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Thunder Pikachu"
                />

                <Label>Rarity</Label>
                <Select name="rarity" value={form.rarity} onChange={handleChange}>
                    <option value="common">Common</option>
                    <option value="rare">Rare</option>
                    <option value="super_rare">Super Rare</option>
                    <option value="legendary">Legendary</option>
                </Select>

                <Label>Price (BNB)</Label>
                <Input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0.05"
                />

                <Label>Card Image</Label>
                <FileInput type="file" onChange={handleImage} />

                <MintButton onClick={handleMint}>
                    {address ? "Mint Card" : "Connect Wallet"}
                </MintButton>
            </FormCard>
        </Container>
    );
};

export default Mint;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: #fff7cc;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const FormCard = styled.div`
  width: 30rem;
  background: #fff3a6;
  border: 3px solid #facc15;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0;
  box-shadow: 8px 8px 0px #1f2937;
`;

const Label = styled.label`
  font-weight: 700;
  color: #1f2937;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #facc15;
  border-radius: 0;
  outline: none;
  &:focus {
    border-color: #f59e0b;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #facc15;
  border-radius: 0;
  background: white;
`;

const FileInput = styled.input`
  border: 2px dashed #facc15;
  padding: 0.75rem;
  border-radius: 0;
`;

const MintButton = styled.button`
  margin-top: 1rem;
  padding: 1rem;
  background: #facc15;
  color: #1f2937;
  font-weight: 800;
  border: 3px solid #1f2937;
  border-radius: 0;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    background: #fde047;
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0px #1f2937;
  }
`;