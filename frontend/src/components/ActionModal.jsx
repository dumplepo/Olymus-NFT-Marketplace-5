import { motion } from 'motion/react';
import { X, DollarSign, Send, Gavel, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { getContract } from '../web3/contract';
import { ethers } from 'ethers';
const ActionModal = ({ type, nft, onClose, onLightning }) => {
  const [inputValue, setInputValue] = useState('');
  const [duration, setDuration] = useState('3600');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExecute = async () => {
    if (!inputValue) return alert("Please fill the required field");
    setIsProcessing(true);
    onLightning();

    try {
      const contract = await getContract(true);
      let tx;
      if (type === 'sell') {
        const priceInWei = ethers.parseEther(inputValue);
        tx = await contract.listForSale(nft.tokenId, priceInWei);
      } 
      else if (type === 'transfer') {
        tx = await contract.transferNFT(nft.tokenId, inputValue);
      } 
      else if (type === 'auction') {
        const startPriceInWei = ethers.parseEther(inputValue);
        tx = await contract.createAuction(nft.tokenId, startPriceInWei, duration);
      }

      await tx.wait();
      alert(`${type.toUpperCase()} Success! ⚡`);
      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Transaction failed. Check console for details.");
    } finally {
      setIsProcessing(false);
    }
  };

  const config = {
    sell: { label: 'List for Sale', icon: <DollarSign className="w-6 h-6" />, placeholder: 'Price in ETH' },
    transfer: { label: 'Send NFT', icon: <Send className="w-6 h-6" />, placeholder: 'Recipient Wallet Address (0x...)' },
    auction: { label: 'Start Auction', icon: <Gavel className="w-6 h-6" />, placeholder: 'Starting Price in ETH' }
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
        className="bg-slate-900 border border-amber-500/20 rounded-2xl max-w-md w-full p-6 
                   shadow-[0_0_60px_rgba(251,191,36,0.2)]"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl text-amber-400 tracking-wide flex items-center gap-2">
            {config[type].icon} {config[type].label}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-amber-100" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="p-4 bg-slate-800/50 rounded-xl flex items-center gap-4 border border-amber-500/10">
            <img src={nft.image} alt={nft.name} className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <p className="text-amber-100 font-bold">{nft.name}</p>
              <p className="text-amber-100/50 text-sm">Token #{nft.tokenId}</p>
            </div>
          </div>

          <div>
            <label className="block text-amber-100/60 text-sm mb-2">
              {config[type].placeholder}
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="..."
              className="w-full px-4 py-3 bg-slate-800 border border-amber-500/20 rounded-lg
                         text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500/40"
            />
          </div>

          {type === 'auction' && (
            <div>
              <label className="block text-amber-100/60 text-sm mb-2">Duration</label>
              <select 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-amber-500/20 rounded-lg
                           text-amber-100 focus:outline-none focus:border-amber-500/40"
              >
                <option value="3600">1 Hour</option>
                <option value="86400">1 Day</option>
                <option value="604800">1 Week</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-amber-100 
                       rounded-xl transition-colors font-bold"
          >
            Cancel
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isProcessing}
            onClick={handleExecute}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 
                       hover:from-amber-500 hover:to-amber-400 text-slate-950 
                       rounded-xl transition-all duration-300 font-bold
                       shadow-[0_0_20px_rgba(251,191,36,0.3)] disabled:opacity-50"
          >
            {isProcessing ? <Loader2 className="animate-spin mx-auto w-6 h-6" /> : `Execute ${type}`}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ActionModal;