import { motion } from 'motion/react';
import { useState } from 'react';
import { X } from 'lucide-react';

const ActionModal = ({ type, nft, onClose, onLightning }) => {
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = () => {
    onLightning();
    
    if (type === 'sell' && price) {
      alert(`Listing ${nft.name} for ${price} ETH`);
    } else if (type === 'transfer' && address) {
      alert(`Transferring ${nft.name} to ${address}`);
    } else if (type === 'auction' && price && duration) {
      alert(`Starting auction for ${nft.name}\nStarting Price: ${price} ETH\nDuration: ${duration} seconds`);
    } else {
      alert('Please fill in all fields');
      return;
    }
    
    setTimeout(() => onClose(), 300);
  };

  const getTitle = () => {
    switch (type) {
      case 'sell': return 'List for Sale';
      case 'transfer': return 'Transfer NFT';
      case 'auction': return 'Create Auction';
      default: return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-amber-500/20 rounded-xl max-w-md w-full p-6 
                   shadow-[0_0_60px_rgba(251,191,36,0.2)]"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl text-amber-400 tracking-wide">{getTitle()}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-amber-100" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-amber-100/70 mb-2">NFT: {nft.name}</p>
          <p className="text-amber-100/50 text-sm">Token #{nft.tokenId}</p>
        </div>

        <div className="space-y-4 mb-6">
          {(type === 'sell' || type === 'auction') && (
            <div>
              <label className="block text-amber-100 mb-2">
                {type === 'auction' ? 'Starting Price (ETH)' : 'Price (ETH)'}
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-slate-800 border border-amber-500/20 rounded-lg
                           text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500/40"
              />
            </div>
          )}

          {type === 'transfer' && (
            <div>
              <label className="block text-amber-100 mb-2">Recipient Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 bg-slate-800 border border-amber-500/20 rounded-lg
                           text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500/40"
              />
            </div>
          )}

          {type === 'auction' && (
            <div>
              <label className="block text-amber-100 mb-2">Duration (seconds)</label>
              <input
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="3600"
                className="w-full px-4 py-3 bg-slate-800 border border-amber-500/20 rounded-lg
                           text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500/40"
              />
              <p className="text-amber-100/40 text-xs mt-1">
                Example: 3600 = 1 hour, 86400 = 1 day
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-amber-100 
                       rounded-lg transition-colors"
          >
            Cancel
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 
                       hover:from-amber-500 hover:to-amber-400 text-slate-950 
                       rounded-lg transition-all duration-300
                       shadow-[0_0_20px_rgba(251,191,36,0.3)]"
          >
            Confirm
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ActionModal;
