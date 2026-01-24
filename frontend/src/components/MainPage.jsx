import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, ArrowUp } from 'lucide-react';
import { StatusBar } from './StatusBar';
import { Toolbar } from './Toolbar';
import { MyNFTsSection } from './MyNFTsSection';
import { MarketplaceSection } from './MarketplaceSection';
import { CollectionsSection } from './CollectionsSection';
import AuctionsSection from './AuctionsSection';
import { MintNFTSection } from './MintNFTSection';
import { Footer } from './Footer';
import { LightningEffect } from './LightningEffect';
import { NFTDetailModal } from './NFTDetailModal';
import { mockNFTs } from '../data/mockData';

export function MainPage({ walletConnected, walletAddress, onWalletAction }) {
  const [activeSection, setActiveSection] = useState('marketplace');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showLightning, setShowLightning] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
      setShowBackToTop(scrollPosition > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerLightning = () => {
    setShowLightning(true);
    setTimeout(() => setShowLightning(false), 600);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    triggerLightning();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    triggerLightning();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {showLightning && <LightningEffect />}
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1722325872613-a2a45f03350e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlayUyMHRlbXBsZSUyMG1hcmJsZXxlbnwxfHx8fDE3NjkyODc1Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
      </div>

      {/* Ambient Light Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <StatusBar
          walletConnected={walletConnected}
          walletAddress={walletAddress}
          onWalletAction={onWalletAction}
          onLightning={triggerLightning}
        />

        <Toolbar
          activeSection={activeSection}
          walletConnected={walletConnected}
          onSectionChange={handleSectionChange}
        />

        <div ref={contentRef} className="min-h-[calc(100vh-180px)]">
          <AnimatePresence mode="wait">
            {activeSection === 'my-nfts' && (
              <MyNFTsSection 
                key="my-nfts" 
                walletAddress={walletAddress}
                onLightning={triggerLightning}
                onNFTClick={setSelectedNFT}
              />
            )}
            {activeSection === 'marketplace' && (
              <MarketplaceSection 
                key="marketplace"
                walletAddress={walletAddress}
                onLightning={triggerLightning}
                onNFTClick={setSelectedNFT}
              />
            )}
            {activeSection === 'collections' && (
              <CollectionsSection 
                key="collections"
                walletAddress={walletAddress}
                onLightning={triggerLightning}
                onNFTClick={setSelectedNFT}
              />
            )}
            {activeSection === 'auctions' && (
              <AuctionsSection 
                key="auctions"
                walletAddress={walletAddress}
                onLightning={triggerLightning}
                onNFTClick={setSelectedNFT}
              />
            )}
            {activeSection === 'mint' && (
              <MintNFTSection 
                key="mint"
                walletAddress={walletAddress}
                onLightning={triggerLightning}
              />
            )}
          </AnimatePresence>
        </div>

        <Footer onLightning={triggerLightning} onNFTClick={setSelectedNFT} />
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-amber-600 to-amber-500 
                       rounded-full shadow-[0_0_30px_rgba(251,191,36,0.4)]
                       hover:shadow-[0_0_50px_rgba(251,191,36,0.6)]
                       transition-all duration-300 group"
          >
            <ArrowUp className="w-6 h-6 text-slate-950" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* NFT Detail Modal */}
      <AnimatePresence>
        {selectedNFT && (
          <NFTDetailModal
            nft={selectedNFT}
            onClose={() => setSelectedNFT(null)}
            onLightning={triggerLightning}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
