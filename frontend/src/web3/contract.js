import { ethers } from 'ethers';
import MarketplaceABI from './MythicNFTMarketplace.json'; 

// 1. MAKE SURE THIS MATCHES YOUR TERMINAL OUTPUT
export const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
export async function getProvider() {
  if (!window.ethereum) throw new Error('MetaMask not found');
  const provider = new ethers.BrowserProvider(window.ethereum);
  
  // 2. FORCE CHECK: Ensure MetaMask is on Localhost (Chain ID 31337)
  const network = await provider.getNetwork();
  if (network.chainId !== 31337n) {
    alert("Please switch MetaMask to Localhost 8545");
  }

  return provider;
}

export async function getSigner() {
  const provider = await getProvider();
  return provider.getSigner();
}

export async function getContract(withSigner = false) {
  const provider = await getProvider();
  const signer = withSigner ? await provider.getSigner() : null;

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    MarketplaceABI.abi,
    withSigner ? signer : provider
  );
}