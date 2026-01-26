import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { NFTCard } from './NFTCard';
import { DollarSign, Send, Gavel } from 'lucide-react';
import ActionModal from './ActionModal';
import { getContract } from '../web3/contract';
import axios from 'axios';

export function MyNFTsSection({ walletAddress, onLightning, onNFTClick }) {
  const [actionModal, setActionModal] = useState(null);
  const [myNFTs, setMyNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyNFTs = async () => {
      if (!walletAddress) return;
      setIsLoading(true);

      try {
        const contract = await getContract();

        // BIGINT FIX: Convert the BigInt result to a standard Number for the loop
        const counter = await contract.tokenCounter();
        const totalTokens = Number(counter); 

        console.log("Found total tokens minted:", totalTokens);

        const tokens = [];
        for (let i = 0; i < totalTokens; i++) {
          try {
            const owner = await contract.ownerOf(i);

            if (owner.toLowerCase() === walletAddress.toLowerCase()) {
              const meta = await contract.nftMetadata(i);
              const tokenURI = await contract.tokenURI(i);

              const gatewayUrl = tokenURI.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
              const response = await axios.get(gatewayUrl);
              const ipfsData = response.data;

              tokens.push({
                tokenId: i,
                name: meta.name || ipfsData.name,
                description: meta.description || ipfsData.description,
                image: ipfsData.image?.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/'),
                category: Number(meta.nftType),
                creator: meta.creator,
                owner: owner
              });
            }
          } catch (e) {
            console.warn(`Token ${i} skip:`, e.message);
          }
        }
        setMyNFTs(tokens);
      } catch (err) {
        console.error("Fetch Error:", err);
        // This alerts you if the address is still 0x
        if (err.message.includes("bad_data")) {
            alert("Contract not found! Did you update the CONTRACT_ADDRESS in contract.js?");
      }
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyNFTs();
  }, [walletAddress]);

  const handleAction = (type, nft) => {
    onLightning();
    setActionModal({ type, nft });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-24 text-center">
        <div className="text-amber-400 text-xl animate-pulse tracking-widest">
          DIVINING YOUR COLLECTION...
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-8 py-12"
    >
      <div className="mb-8">
        <h2 className="text-3xl text-amber-400 tracking-wider mb-2">My Sacred Collection</h2>
        <p className="text-amber-100/60">NFTs blessed by the gods and owned by your wallet</p>
      </div>

      {myNFTs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-amber-100/40 text-xl">Your divine vault is empty</p>
          <p className="text-amber-100/30 mt-2">Forge an NFT to see it here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myNFTs.map((nft) => (
            <NFTCard
              key={nft.tokenId}
              nft={nft}
              onLightning={onLightning}
              onClick={() => onNFTClick(nft)}
              actions={
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => { e.stopPropagation(); handleAction('sell', nft); }}
                    className="flex-1 px-3 py-2 bg-amber-600 text-slate-950 rounded-lg flex items-center justify-center gap-2"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-bold">Sell</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => { e.stopPropagation(); handleAction('transfer', nft); }}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span className="text-sm font-bold">Send</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => { e.stopPropagation(); handleAction('auction', nft); }}
                    className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg flex items-center justify-center gap-2"
                  >
                    <Gavel className="w-4 h-4" />
                    <span className="text-sm font-bold">Auction</span>
                  </motion.button>
                </div>
              }
            />
          ))}
        </div>
      )}

      {actionModal && (
        <ActionModal
          type={actionModal.type}
          nft={actionModal.nft}
          onClose={() => setActionModal(null)}
          onLightning={onLightning}
        />
      )}
    </motion.div>
  );
}


