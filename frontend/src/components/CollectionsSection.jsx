import { motion } from 'motion/react';
import { useState } from 'react';
import { NFTCard } from './NFTCard';
import { mockNFTs } from '../data/mockData';
import { Search, DollarSign, ShoppingBag, MessageSquare } from 'lucide-react';

const categories = ['All', 'Gods', 'Titans', 'Heroes', 'Creatures', 'Artifacts'];

export function CollectionsSection({ walletAddress, onLightning, onNFTClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredNFTs = mockNFTs
    .filter(nft => selectedCategory === 'All' || nft.category === selectedCategory)
    .filter(nft => nft.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSell = (nft) => {
    onLightning();
    alert(`Listing ${nft.name} for sale`);
  };

  const handlePurchaseRequest = (nft) => {
    onLightning();
    const offer = prompt(`Enter your offer for ${nft.name} (ETH):`);
    if (offer) {
      alert(`Purchase request sent to owner for ${offer} ETH`);
    }
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
        <h2 className="text-3xl text-amber-400 tracking-wider mb-2">Sacred Collections</h2>
        <p className="text-amber-100/60">All divine NFTs ever blessed upon the blockchain</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-amber-500/20 rounded-lg
                       text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500/40"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex gap-3 flex-wrap">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onLightning();
              setSelectedCategory(category);
            }}
            className={`
              px-6 py-2 rounded-lg transition-all duration-300
              ${selectedCategory === category
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.3)]'
                : 'bg-slate-900/50 text-amber-100 border border-amber-500/20 hover:border-amber-500/40'
              }
            `}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* NFT Grid */}
      {filteredNFTs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-amber-100/40 text-xl">No NFTs found in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNFTs.map((nft) => {
            const isOwner = nft.owner === walletAddress;
            const isListed = nft.isListed;
            
            return (
              <NFTCard
                key={nft.id}
                nft={nft}
                onLightning={onLightning}
                onClick={() => onNFTClick(nft)}
                actions={
                  <div className="flex gap-2">
                    {isOwner ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSell(nft)}
                        className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 
                                   rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <DollarSign className="w-4 h-4" />
                        <span>Sell</span>
                      </motion.button>
                    ) : isListed ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {}}
                        className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 
                                   rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Buy</span>
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePurchaseRequest(nft)}
                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white 
                                   rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Request Purchase</span>
                      </motion.button>
                    )}
                  </div>
                }
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
