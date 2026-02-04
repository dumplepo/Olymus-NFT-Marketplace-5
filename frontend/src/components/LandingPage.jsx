import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';
import { LightningEffect } from './LightningEffect';

export function LandingPage({ onEnter }) {
  const [scrollY, setScrollY] = useState(0);
  const [showLightning, setShowLightning] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnter = () => {
    setShowLightning(true);
    setTimeout(() => {
      onEnter();
      setShowLightning(false);
    }, 600);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {showLightning && <LightningEffect />}
      
      {/* Video Background Effect */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1712663640135-f5fc71dca38e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbHltcHVzJTIwY2xvdWRzJTIwZGl2aW5lfGVufDF8fHx8MTc2OTI4NzU3OXww&ixlib=rb-4.1.0&q=80&w=1080')`,
            // backgroundImage: `url('.../.../zeus vs typhone.mp4')`,

            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1722325872613-a2a45f03350e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlayUyMHRlbXBsZSUyMG1hcmJsZXxlbnwxfHx8fDE3NjkyODc1Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-slate-950/50 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-radial from-amber-400/5 via-transparent to-transparent" />
      </div>

      {/* Lightning Effect Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-1 h-96 bg-gradient-to-b from-amber-300/30 via-amber-500/10 to-transparent blur-xl animate-pulse" 
             style={{ animationDuration: '3s' }} />
        <div className="absolute top-40 right-1/3 w-1 h-96 bg-gradient-to-b from-blue-300/20 via-blue-500/5 to-transparent blur-xl animate-pulse" 
             style={{ animationDuration: '4s', animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center max-w-4xl mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mb-8"
          >
            <Zap className="w-24 h-24 mx-auto text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-7xl mb-6 tracking-wider"
            style={{
              background: 'linear-gradient(to right, #fbbf24, #f59e0b, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 60px rgba(251, 191, 36, 0.3)',
            }}
          >
            OLYMPUS MARKET
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl text-amber-100/80 mb-4 tracking-wide"
          >
            Enter the Divine Realm of Sacred NFTs
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-amber-100/60 leading-relaxed max-w-2xl mx-auto"
          >
            Where immortal artworks dwell among the gods. Trade legendary NFTs inspired by 
            ancient Greek mythology in a marketplace blessed by Zeus himself.
          </motion.p>
        </motion.div>

        {/* Main CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          onClick={handleEnter}
          className="relative group px-12 py-4 bg-gradient-to-r from-amber-600 to-amber-500 
                     hover:from-amber-500 hover:to-amber-400 text-slate-950 
                     rounded-lg overflow-hidden transition-all duration-300
                     shadow-[0_0_40px_rgba(251,191,36,0.4)] hover:shadow-[0_0_60px_rgba(251,191,36,0.6)]"
        >
          <span className="relative z-10 flex items-center gap-3 text-lg tracking-wider">
            <Zap className="w-5 h-5" />
            ENTER THE OLYMPUS
            <Zap className="w-5 h-5" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-200 opacity-0 
                          group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        {/* Scroll Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-32 mb-16 max-w-3xl"
        >
          <div 
            className="text-center space-y-8 p-12 rounded-2xl backdrop-blur-sm
                       bg-gradient-to-b from-amber-950/20 to-slate-950/20
                       border border-amber-500/10 shadow-2xl"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          >
            <h2 className="text-3xl text-amber-300 tracking-wide mb-6">The Sacred Marketplace</h2>
            
            <p className="text-amber-100/70 leading-relaxed">
              Discover divine collectibles forged in the fires of Hephaestus. 
              Each NFT carries the power of ancient myths—Gods, Titans, Heroes, and legendary Creatures 
              await your command.
            </p>
            
            <p className="text-amber-100/70 leading-relaxed">
              Mint your own artifacts, trade in the celestial marketplace, 
              participate in sacred auctions, and build your immortal collection.
            </p>

            <div className="border-t border-amber-500/20 pt-8 mt-8">
              <p className="text-amber-200/50 text-sm tracking-wider">
                FOR INQUIRIES: +1 (888) OLYMPUS
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-20" />
    </div>
  );
}
