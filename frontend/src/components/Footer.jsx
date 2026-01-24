import { motion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { NFTCard } from './NFTCard';
import { mockNFTs, mockAuctions } from '../data/mockData';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Footer({ onLightning, onNFTClick }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(null);

  // Mock price data
  const [priceData, setPriceData] = useState([
    { time: '10:00', avgPrice: 3.2 },
    { time: '10:01', avgPrice: 3.5 },
    { time: '10:02', avgPrice: 3.8 },
    { time: '10:03', avgPrice: 4.1 },
    { time: '10:04', avgPrice: 4.5 },
    { time: '10:05', avgPrice: 4.3 },
    { time: '10:06', avgPrice: 4.7 },
  ]);

  // Simulate price updates every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      const newPrice = 3 + Math.random() * 3;
      
      setPriceData(prev => {
        const updated = [...prev.slice(1), { time: timeStr, avgPrice: parseFloat(newPrice.toFixed(2)) }];
        return updated;
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => prev + 1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const recentNFTs = mockNFTs.slice(0, 4);
  const highestPriced = [...mockNFTs].sort((a, b) => b.price - a.price).slice(0, 4);
  const auctionNFTs = mockAuctions.map(a => a.nft).slice(0, 4);

  return (
    <div className="border-t border-amber-500/20 bg-slate-950/80 backdrop-blur-md mt-20">
      <div className="max-w-7xl mx-auto px-8 py-12 space-y-12">
        {/* Recently Issued */}
        <div>
          <h3 className="text-2xl text-amber-400 tracking-wider mb-6 flex items-center gap-2">
            <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-amber-600" />
            Recently Issued
          </h3>
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: -scrollPosition }}
              style={{ width: 'max-content' }}
            >
              {[...recentNFTs, ...recentNFTs].map((nft, index) => (
                <div key={`recent-${nft.id}-${index}`}>
                  <NFTCard
                    nft={nft}
                    onLightning={onLightning}
                    onClick={() => onNFTClick(nft)}
                    compact
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Highest Priced */}
        <div>
          <h3 className="text-2xl text-amber-400 tracking-wider mb-6 flex items-center gap-2">
            <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-amber-600" />
            Highest Priced
          </h3>
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: -scrollPosition * 0.7 }}
              style={{ width: 'max-content' }}
            >
              {[...highestPriced, ...highestPriced].map((nft, index) => (
                <div key={`highest-${nft.id}-${index}`}>
                  <NFTCard
                    nft={nft}
                    onLightning={onLightning}
                    onClick={() => onNFTClick(nft)}
                    compact
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Active Auctions */}
        <div>
          <h3 className="text-2xl text-amber-400 tracking-wider mb-6 flex items-center gap-2">
            <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-amber-600" />
            Active Auctions
          </h3>
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: -scrollPosition * 0.5 }}
              style={{ width: 'max-content' }}
            >
              {[...auctionNFTs, ...auctionNFTs].map((nft, index) => (
                <div key={`auction-${nft.id}-${index}`}>
                  <NFTCard
                    nft={nft}
                    onLightning={onLightning}
                    onClick={() => onNFTClick(nft)}
                    compact
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Average Price Chart */}
        <div>
          <h3 className="text-2xl text-amber-400 tracking-wider mb-6 flex items-center gap-2">
            <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-amber-600" />
            <TrendingUp className="w-6 h-6" />
            Average NFT Value
          </h3>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(251, 191, 36, 0.1)" />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(251, 191, 36, 0.5)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="rgba(251, 191, 36, 0.5)"
                  style={{ fontSize: '12px' }}
                  label={{ value: 'ETH', angle: -90, position: 'insideLeft', fill: 'rgba(251, 191, 36, 0.7)' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(251, 191, 36, 0.2)',
                    borderRadius: '8px',
                    color: 'rgba(251, 191, 36, 1)',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="avgPrice" 
                  stroke="#fbbf24" 
                  strokeWidth={3}
                  dot={{ fill: '#fbbf24', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-amber-100/50 text-sm text-center mt-4">
              Updates every minute • Real-time marketplace data
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center pt-8 border-t border-amber-500/10">
          <p className="text-amber-100/40 text-sm">
            © 2026 Olympus Market • A Divine NFT Marketplace • Blessed by Zeus
          </p>
        </div>
      </div>
    </div>
  );
}
