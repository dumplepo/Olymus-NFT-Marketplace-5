import { motion } from 'motion/react';
import { X, User, Wallet, Tag, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function NFTDetailModal({ nft, onClose, onLightning }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-amber-500/20 rounded-2xl max-w-4xl w-full 
                   shadow-[0_0_80px_rgba(251,191,36,0.2)] my-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-500/20">
          <h2 className="text-3xl text-amber-400 tracking-wider">NFT Details</h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-amber-100" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-slate-800 shadow-2xl">
              <ImageWithFallback
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Category Badge */}
            <div className="flex justify-center">
              <div className="px-6 py-2 rounded-full bg-amber-500/20 border border-amber-500/40">
                <span className="text-amber-400 tracking-wider">{nft.category}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl text-amber-100 tracking-wide mb-2">{nft.name}</h3>
              <div className="flex items-center gap-2 text-amber-100/50">
                <Tag className="w-4 h-4" />
                <span>Token #{nft.tokenId}</span>
              </div>
            </div>

            {/* Price */}
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <div className="text-amber-100/60 text-sm mb-1">Current Price</div>
              <div className="text-4xl text-amber-400">{nft.price} ETH</div>
            </div>

            {/* Info Grid */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg">
                <User className="w-5 h-5 text-amber-400 mt-0.5" />
                <div className="flex-1">
                  <div className="text-amber-100/60 text-sm mb-1">Creator</div>
                  <div className="text-amber-100 break-all">{nft.creator}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg">
                <Wallet className="w-5 h-5 text-amber-400 mt-0.5" />
                <div className="flex-1">
                  <div className="text-amber-100/60 text-sm mb-1">Owner</div>
                  <div className="text-amber-100 break-all">{nft.owner}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg">
                <Calendar className="w-5 h-5 text-amber-400 mt-0.5" />
                <div className="flex-1">
                  <div className="text-amber-100/60 text-sm mb-1">Created</div>
                  <div className="text-amber-100">
                    {/* SAFE CHECK: Check if createdAt exists before calling toLocaleDateString */}
                    {nft.createdAt ? new Date(nft.createdAt).toLocaleDateString() : 'Date Unknown'}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-amber-400 mb-2 tracking-wide">Description</h4>
              <p className="text-amber-100/70 leading-relaxed">{nft.description}</p>
            </div>

            {/* Purchase Price if applicable */}
            {nft.purchasePrice !== undefined && nft.purchasePrice > 0 && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <div className="text-amber-100/60 text-sm mb-1">Purchased For</div>
                <div className="text-2xl text-amber-400">{nft.purchasePrice} ETH</div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

