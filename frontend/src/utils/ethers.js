import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import MarketplaceABI from "../../../artifacts/contracts/MythicNFTMarketplace.sol/MythicNFTMarketplace.json";

export const useEthereum = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const contractABI = MarketplaceABI.abi;

  useEffect(() => {
    if (window.ethereum) {
      // Ethers v6 BrowserProvider
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);

      // Get signer for transactions
      ethProvider.getSigner().then((ethSigner) => {
        setSigner(ethSigner);

        // Connect contract with signer
        const contractInstance = new ethers.Contract(contractAddress, contractABI, ethSigner);
        setContract(contractInstance);
      });
    }
  }, []);

  return { provider, signer, contract };
};
