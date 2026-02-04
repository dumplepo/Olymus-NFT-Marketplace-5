import { useState, useEffect, useCallback } from 'react';
import { LandingPage } from './components/LandingPage';
import { MainPage } from './components/MainPage';
import { motion, AnimatePresence } from 'motion/react';
import { getProvider } from './web3/contract';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleWalletConnect = async () => {
    if (walletConnected) {
        setWalletConnected(false);
        setWalletAddress('');
        setCurrentPage('landing');
      return;
      }

    try {
      if (!window.ethereum) {
        alert('MetaMask not found! Please install it to interact with Olympus.');
        return;
      }

      const provider = await getProvider();
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
      setWalletConnected(true);
      setCurrentPage('main');
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  const handleDisconnect = useCallback(() => {
    setWalletConnected(false);
    setWalletAddress('');
    setCurrentPage('landing');
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (walletConnected) {
        handleDisconnect();
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [walletConnected, handleDisconnect]);

  return (
    <div className="min-h-screen bg-slate-950">
      <AnimatePresence mode="wait">
        {currentPage === 'landing' ? (
          <LandingPage 
            key="landing" 
            onEnter={handleWalletConnect} 
          />
        ) : (
          <MainPage 
            key="main" 
              walletConnected={walletConnected}
            walletAddress={walletAddress} 
              onWalletAction={handleWalletConnect}
            />
        )}
      </AnimatePresence>
    </div>
  );
}