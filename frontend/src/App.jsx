import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { MainPage } from './components/MainPage';
import { motion, AnimatePresence } from 'motion/react';
import { useEthereum } from './utils/ethers';  // Import the hook to handle Ethereum connection

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  
  // Hook for Ethereum connection and contract interaction
  const { provider, signer, contract } = useEthereum();

  const handleEnterMain = () => {
    setCurrentPage('main');
  };

  const handleWalletConnect = async () => {
    // DISCONNECT (app-level)
    if (walletConnected) {
      setWalletConnected(false);
      setWalletAddress('');
      setCurrentPage('landing');
      return;
    }

    // CONNECT
    if (!provider) return;

    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
        setCurrentPage('main');
      }
    } catch (err) {
      console.error('Error connecting wallet:', err);
    }
  };

  // Example interaction with the smart contract: Get balance or other smart contract methods
  const fetchContractData = async () => {
    if (walletAddress && provider) {
      try {
        // Fetch wallet balance
        const balance = await provider.getBalance(walletAddress);
        console.log('ETH balance:', ethers.utils.formatEther(balance));  // format balance to ETH
      } catch (err) {
        console.error('Error fetching wallet balance:', err);
      }
    }

    if (contract) {
      try {
        // Fetch contract balance if the contract has a getBalance function
        const contractBalance = await contract.getBalance(walletAddress);  // Ensure getBalance() method is correct in the contract
        console.log('Contract balance:', contractBalance.toString());
      } catch (err) {
        console.error('Error fetching contract data:', err);
      }
    }
  };

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = () => {
      // Break app-level connection
      setWalletConnected(false);
      setWalletAddress('');
      // ❗ DO NOT change currentPage
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

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
              fetchContractData={fetchContractData}  // Pass contract interaction function
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
