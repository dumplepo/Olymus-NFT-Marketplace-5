import { motion } from 'motion/react';
import { Heart, Zap } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Golden ratio: 1.618
const GOLDEN_RATIO = 1.618;

export function NFTCard({ nft, onLightning, onClick, actions, compact = false }) {
  const [isFavorite, setIsFavorite] = useState(nft.isFavorite || false);
  const [imageError, setImageError] = useState(false);

  const handleFavorite = (e) => {
    e.stopPropagation();
    onLightning();
    setIsFavorite(!isFavorite);
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
  };

  const cardWidth = compact ? 280 : 350;
  const cardHeight = cardWidth / GOLDEN_RATIO;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      onClick={onClick}
      className="group cursor-pointer"
      style={{ width: cardWidth }}
    >
      <div 
        className="relative overflow-hidden rounded-xl bg-slate-900/50 backdrop-blur-sm
                   border border-amber-500/20 hover:border-amber-500/40
                   shadow-lg hover:shadow-[0_0_40px_rgba(251,191,36,0.2)]
                   transition-all duration-300"
      >
        {/* Image Container */}
        <div 
          className="relative overflow-hidden bg-slate-800"
          style={{ height: cardHeight * 0.65 }}
        >
          <ImageWithFallback
            src={nft.image}
            alt={nft.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
          
          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavorite}
            className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 backdrop-blur-sm
                       hover:bg-slate-800 transition-colors duration-200"
          >
            <Heart 
              className={`w-5 h-5 ${isFavorite ? 'fill-amber-500 text-amber-500' : 'text-amber-100'}`}
            />
          </motion.button>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-sm">
            <span className="text-xs text-slate-950 tracking-wider">{nft.category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-lg text-amber-100 tracking-wide mb-1 truncate">{nft.name}</h3>
            <p className="text-sm text-amber-100/50">Token #{nft.tokenId}</p>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-xl text-amber-400">{nft.price} ETH</span>
            </div>
          </div>

          {/* Actions */}
          {actions && (
            <div onClick={handleActionClick} className="pt-3 border-t border-amber-500/10">
              {actions}
            </div>
          )}
        </div>

        {/* Hover Ripple Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-400/10 to-amber-500/5 
                          animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
