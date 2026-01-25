import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { MainPage } from './components/MainPage';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // Removed type annotation
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleEnterMain = () => {
    setCurrentPage('main');
  };

  const handleWalletConnect = () => {
    if (walletConnected) {
      setWalletConnected(false);
      setWalletAddress('');
      setCurrentPage('landing');
    } else {
      // Mock wallet connection
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
      setWalletAddress(mockAddress);
      setWalletConnected(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <AnimatePresence mode="wait">
        {currentPage === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <LandingPage onEnter={handleEnterMain} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MainPage
              walletConnected={walletConnected}
              walletAddress={walletAddress}
              onWalletAction={handleWalletConnect}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
