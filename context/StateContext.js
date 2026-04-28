import { createContext, use, useContext, useState } from "react";
import { ethers } from "ethers";

const StateContext = createContext();

const CONTRACT_ADDRESS = "";
const ABI = [];

export const StateContextProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {

    if (typeof window === "undefined") {
      return;
    }


    if (!window.ethereum) return alert("Install MetaMask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAddress(accounts[0]);

    const contracts = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider.getSigner());
    setContract(contracts);
  };

  return (
    <StateContext.Provider value={{ address, connectWallet, contract }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);