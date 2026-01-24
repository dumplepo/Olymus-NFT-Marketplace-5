import { Wallet, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export function StatusBar({ walletConnected, walletAddress, onWalletAction, onLightning }) {
  const handleClick = () => {
    onLightning();
    setTimeout(() => onWalletAction(), 300);
  };

  return (
    <div className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8 text-amber-400" />
          <h1 className="text-2xl tracking-wider bg-gradient-to-r from-amber-400 to-amber-600 
                         bg-clip-text text-transparent">
            OLYMPUS MARKET
          </h1>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className={`
            px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-300
            ${walletConnected 
              ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
              : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)]'
            }
          `}
        >
          <Wallet className="w-4 h-4 text-slate-950" />
          <span className="text-slate-950 tracking-wide">
            {walletConnected ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
          </span>
        </motion.button>
      </div>
    </div>
  );
}
