import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { NFTCard } from "./NFTCard";
import { DollarSign, Send } from "lucide-react";
import ActionModal from "./ActionModal";
import { getContract } from "../web3/contract";
import axios from "axios";

export function MyNFTsSection({ walletAddress, onLightning, onNFTClick }) {
  const [actionModal, setActionModal] = useState(null);
  const [myNFTs, setMyNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyNFTs = async () => {
      if (!walletAddress) return;
      setIsLoading(true);

      try {
        const contract = await getContract();
        const counter = Number(await contract.tokenCounter());

        const tokens = [];

        // ✅ token IDs start at 1
        for (let tokenId = 1; tokenId < counter; tokenId++) {
          try {
            const owner = await contract.ownerOf(tokenId);

            // ✅ only NFTs owned by wallet (not escrowed)
            if (
              owner.toLowerCase() !== walletAddress.toLowerCase()
            )
              continue;

            // ✅ if listed, skip (escrowed NFTs won't match owner anyway,
            // but this keeps logic future-proof)
            const listing =
              await contract.marketplaceListings(tokenId);
            if (listing.active) continue;

            const meta = await contract.nftMetadata(tokenId);
            const tokenURI = await contract.tokenURI(tokenId);

            const gatewayUrl = tokenURI.replace(
              "ipfs://",
              "https://gateway.pinata.cloud/ipfs/"
            );

            const { data } = await axios.get(gatewayUrl);

            tokens.push({
              tokenId,
              name: meta.name || data.name,
              description: meta.description || data.description,
              image: data.image?.replace(
                "ipfs://",
                "https://gateway.pinata.cloud/ipfs/"
              ),
              category: Number(meta.nftType),
              creator: meta.creator,
              owner,
              createdAt: new Date(),
            });
          } catch (err) {
            console.warn(
              `Skipping token ${tokenId}`,
              err.message
            );
          }
        }

        setMyNFTs(tokens);
      } catch (err) {
        console.error("Fetch Error:", err);
        if (err.message?.includes("bad_data")) {
          alert(
            "Contract not found. Check CONTRACT_ADDRESS in contract.js"
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyNFTs();
  }, [walletAddress]);

  const handleAction = (type, nft) => {
    onLightning();
    setActionModal({ type, nft });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-24 text-center">
        <div className="text-amber-400 text-xl animate-pulse tracking-widest">
          DIVINING YOUR COLLECTION...
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-8 py-12"
    >
      <div className="mb-8">
        <h2 className="text-3xl text-amber-400 tracking-wider mb-2">
          My Sacred Collection
        </h2>
        <p className="text-amber-100/60">
          NFTs owned directly by your wallet
        </p>
      </div>

      {myNFTs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-amber-100/40 text-xl">
            Your divine vault is empty
          </p>
          <p className="text-amber-100/30 mt-2">
            Mint an NFT to see it here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myNFTs.map((nft) => (
            <NFTCard
              key={nft.tokenId}
              nft={nft}
              onClick={() => onNFTClick(nft)}
              actions={
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction("sell", nft);
                    }}
                    className="flex-1 px-3 py-2 bg-amber-600 text-slate-950 rounded-lg flex items-center justify-center gap-2"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-bold">
                      Sell
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction("transfer", nft);
                    }}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span className="text-sm font-bold">
                      Send
                    </span>
                  </motion.button>
                </div>
              }
            />
          ))}
        </div>
      )}

      {actionModal && (
        <ActionModal
          type={actionModal.type}
          nft={actionModal.nft}
          onClose={() => setActionModal(null)}
          onLightning={onLightning}
        />
      )}
    </motion.div>
  );
}
