import { motion } from 'motion/react';
import { useState } from 'react';
import { NFTCard } from './NFTCard';
import { mockNFTs } from '../data/mockData';
import { Search, Filter, ShoppingBag, X } from 'lucide-react';

export function MarketplaceSection({ walletAddress, onLightning, onNFTClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter listed NFTs
  const listedNFTs = mockNFTs
    .filter(nft => nft.isListed)
    .filter(nft => nft.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(nft => nft.price >= priceRange[0] && nft.price <= priceRange[1])
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const handleBuy = (nft) => {
    onLightning();
    alert(`Purchasing ${nft.name} for ${nft.price} ETH`);
  };

  const handleCancelSale = (nft) => {
    onLightning();
    alert(`Canceling sale of ${nft.name}`);
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
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl text-amber-400 tracking-wider mb-2"
        >
          Divine Marketplace
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-amber-100/60"
        >
          Acquire legendary NFTs blessed by the pantheon
        </motion.p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
            <input
              type="text"
              placeholder="Search NFTs by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-amber-500/20 rounded-lg
                         text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500/40"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onLightning();
              setShowFilters(!showFilters);
            }}
            className="px-6 py-3 bg-slate-900/50 border border-amber-500/20 rounded-lg
                       hover:border-amber-500/40 text-amber-100 flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </motion.button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 bg-slate-900/50 border border-amber-500/20 rounded-lg"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-amber-100 mb-2">Price Range (ETH)</label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
                    className="flex-1 px-4 py-2 bg-slate-800 border border-amber-500/20 rounded-lg
                               text-amber-100 focus:outline-none focus:border-amber-500/40"
                  />
                  <span className="text-amber-100/60">to</span>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                    className="flex-1 px-4 py-2 bg-slate-800 border border-amber-500/20 rounded-lg
                               text-amber-100 focus:outline-none focus:border-amber-500/40"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* NFT Grid */}
      {listedNFTs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-amber-100/40 text-xl">No NFTs found in the marketplace</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {listedNFTs.map((nft, index) => {
            const isOwner = nft.owner === walletAddress;
            
            return (
              <motion.div
                key={nft.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <NFTCard
                  nft={nft}
                  onLightning={onLightning}
                  onClick={() => onNFTClick(nft)}
                  actions={
                    <div className="flex gap-2">
                      {isOwner ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCancelSale(nft)}
                          className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white 
                                     rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel Sale</span>
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleBuy(nft)}
                          className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 
                                     rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Buy Now</span>
                        </motion.button>
                      )}
                    </div>
                  }
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}
