import { createContext, use, useContext, useState } from "react";
import { ethers } from "ethers";
import ABI from "../public/abi/PokeContract.json";
const StateContext = createContext();

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const StateContextProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {

    if (typeof window === "undefined") {
      return;
    }


    if (!window.ethereum) return alert("Install MetaMask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const accounts = await provider.send("eth_requestAccounts", []);
    setAddress(accounts[0]);

    const contracts = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    setContract(contracts);
    console.log(contract);
  };

  return (
    <StateContext.Provider value={{ address, connectWallet, contract, setAddress, setContract }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);