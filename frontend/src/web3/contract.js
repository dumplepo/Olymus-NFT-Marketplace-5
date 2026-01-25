import { ethers } from 'ethers';
import MarketplaceABI from '../web3/MythicNFTMarketplace.json'; // adjust path

export const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export async function getProvider() {
  if (!window.ethereum) throw new Error('MetaMask not found');
  return new ethers.BrowserProvider(window.ethereum);
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
