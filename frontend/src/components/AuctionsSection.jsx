import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { mockAuctions } from '../data/mockData';
import { Clock, Gavel, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const AuctionsSection = ({ walletAddress, onLightning, onNFTClick }) => {
  const [auctions, setAuctions] = useState(mockAuctions);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeRemaining = (endTime) => {
    const remaining = endTime.getTime() - currentTime;
    if (remaining <= 0) return 'Ended';

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleBid = (auction) => {
    onLightning();
    const bid = prompt(`Enter your bid (current: ${auction.currentBid} ETH):`);
    if (bid && parseFloat(bid) > auction.currentBid) {
      alert(`Bid placed: ${bid} ETH`);
    } else if (bid) {
      alert('Bid must be higher than current bid');
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
        <h2 className="text-3xl text-amber-400 tracking-wider mb-2">Sacred Auctions</h2>
        <p className="text-amber-100/60">Compete for legendary artifacts in divine bidding wars</p>
      </div>

      {auctions.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-amber-100/40 text-xl">No active auctions at this time</p>
        </div>
      ) : (
        <div className="space-y-6">
          {auctions.map((auction) => {
            const timeRemaining = formatTimeRemaining(auction.endTime);
            const isEnded = timeRemaining === 'Ended';
            const isOwner = auction.nft.owner === walletAddress;
            const isHighestBidder = auction.highestBidder === walletAddress;

            return (
              <motion.div
                key={auction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-amber-500/20 rounded-xl 
                           overflow-hidden hover:border-amber-500/40 transition-all duration-300
                           shadow-lg hover:shadow-[0_0_40px_rgba(251,191,36,0.2)]"
              >
                <div className="flex flex-col md:flex-row">
                  {/* NFT Image */}
                  <div 
                    className="md:w-1/3 h-64 md:h-auto cursor-pointer relative group"
                    onClick={() => onNFTClick(auction.nft)}
                  >
                    <ImageWithFallback
                      src={auction.nft.image}
                      alt={auction.nft.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-transparent to-transparent" />
                  </div>

                  {/* Auction Details */}
                  <div className="flex-1 p-6 md:p-8 space-y-6">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl text-amber-100 tracking-wide mb-2">
                            {auction.nft.name}
                          </h3>
                          <p className="text-sm text-amber-100/50">Token #{auction.nft.tokenId}</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40">
                          <span className="text-xs text-amber-400 tracking-wider">
                            {auction.nft.category}
                          </span>
                        </div>
                      </div>

                      <p className="text-amber-100/70 leading-relaxed">
                        {auction.nft.description}
                      </p>
                    </div>

                    {/* Auction Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <div className="text-amber-100/50 text-sm mb-1">Starting Price</div>
                        <div className="text-amber-400 text-lg">{auction.startPrice} ETH</div>
                      </div>
                      
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <div className="text-amber-100/50 text-sm mb-1 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Current Bid
                        </div>
                        <div className="text-amber-400 text-lg">{auction.currentBid} ETH</div>
                      </div>
                       
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <div className="text-amber-100/50 text-sm mb-1">Highest Bidder</div>
                        <div className="text-amber-100 text-sm truncate">
                          {auction.highestBidder ? `${auction.highestBidder.slice(0, 6)}...${auction.highestBidder.slice(-4)}` : 'None'}
                        </div>
                      </div>
                       
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <div className="text-amber-100/50 text-sm mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Time Left
                        </div>
                        <div className={`text-lg ${isEnded ? 'text-red-400' : 'text-amber-400'}`}>
                          {timeRemaining}
                        </div>
                      </div>
                    </div>

                    {/* Bid Button */}
                    {!isEnded && !isOwner && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleBid(auction)}
                        disabled={isEnded}
                        className={`
                          w-full px-6 py-3 rounded-lg flex items-center justify-center gap-2
                          transition-all duration-300
                          ${isHighestBidder
                            ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                            : 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.3)]'
                          }
                          hover:shadow-[0_0_30px_rgba(251,191,36,0.5)]
                        `}
                      >
                        <Gavel className="w-5 h-5" />
                        <span className="text-lg tracking-wide">
                          {isHighestBidder ? 'You are winning!' : 'Place Bid'}
                        </span>
                      </motion.button>
                    )}

                    {isEnded && (
                      <div className="text-center py-3 bg-slate-800/50 rounded-lg">
                        <p className="text-amber-100/70">
                          Auction Ended - Winner: {auction.highestBidder ? `${auction.highestBidder.slice(0, 6)}...${auction.highestBidder.slice(-4)}` : 'No bids'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default AuctionsSection;
