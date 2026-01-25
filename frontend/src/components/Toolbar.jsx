import { Package, ShoppingCart, Layers, Gavel, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

// Sections array
const sections = [
  { id: 'my-nfts', label: 'My NFTs', icon: Package, requiresWallet: true },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart, requiresWallet: false },
  { id: 'collections', label: 'Collections', icon: Layers, requiresWallet: false },
  { id: 'auctions', label: 'Auctions', icon: Gavel, requiresWallet: false },
  { id: 'mint', label: 'Mint NFT', icon: Sparkles, requiresWallet: true },
];

export function Toolbar({ activeSection, walletConnected, onSectionChange }) {
  return (
    <div className="sticky top-[73px] z-30 backdrop-blur-md bg-slate-950/60 border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const isDisabled = section.requiresWallet && !walletConnected;
            const Icon = section.icon;

            return (
              <motion.button
                key={section.id}
                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                onClick={() => !isDisabled && onSectionChange(section.id)}
                disabled={isDisabled}
                className={`
                  relative px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 shadow-[0_0_30px_rgba(251,191,36,0.4)]' 
                    : isDisabled
                      ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                      : 'bg-slate-800/30 text-amber-100 hover:bg-slate-800/50 hover:text-amber-400'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="tracking-wide">{section.label}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 rounded-lg -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
