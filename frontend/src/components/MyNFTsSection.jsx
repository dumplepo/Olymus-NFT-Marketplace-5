import { motion } from 'motion/react';
import { useState } from 'react';
import { NFTCard } from './NFTCard';
import { mockNFTs } from '../data/mockData';
import { DollarSign, Send, Gavel } from 'lucide-react';
import ActionModal from './ActionModal';

export function MyNFTsSection({ walletAddress, onLightning, onNFTClick }) {
  const [actionModal, setActionModal] = useState(null);
  
  // Mock: filter NFTs owned by user
  const myNFTs = mockNFTs.filter(nft => nft.owner === walletAddress || [1, 5, 7].includes(nft.tokenId));

  const handleAction = (type, nft) => {
    onLightning();
    setActionModal({ type, nft });
  };

  const handleCloseModal = () => {
    setActionModal(null);
  };

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
          <p className="text-amber-100/30 mt-2">Acquire NFTs from the Marketplace or mint your own</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myNFTs.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              onLightning={onLightning}
              onClick={() => onNFTClick(nft)}
              actions={
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAction('sell', nft)}
                    className="flex-1 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 
                               rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">Sell</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAction('transfer', nft)}
                    className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white 
                               rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span className="text-sm">Transfer</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAction('auction', nft)}
                    className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white 
                               rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Gavel className="w-4 h-4" />
                    <span className="text-sm">Auction</span>
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
          onClose={handleCloseModal}
          onLightning={onLightning}
        />
      )}
    </motion.div>
  );
}
