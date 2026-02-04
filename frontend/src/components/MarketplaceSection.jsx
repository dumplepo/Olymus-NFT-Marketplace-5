import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { NFTCard } from "./NFTCard";
import { Search, Filter, ShoppingBag, X } from "lucide-react";
import { getContract } from "../web3/contract";
import { ethers } from "ethers";

export function MarketplaceSection({ walletAddress, onLightning, onNFTClick }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [showFilters, setShowFilters] = useState(false);
  const [listedNFTs, setListedNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListedNFTs = async () => {
      setIsLoading(true);

      try {
        const contract = await getContract();
        const counter = Number(await contract.tokenCounter());

        const nfts = [];

        // ✅ token IDs start at 1
        for (let tokenId = 1; tokenId < counter; tokenId++) {
          try {
            const listing = await contract.marketplaceListings(tokenId);
            if (!listing.active) continue;

            const meta = await contract.nftMetadata(tokenId);
            const tokenURI = await contract.tokenURI(tokenId);

            const uri = tokenURI.replace(
              "ipfs://",
              "https://gateway.pinata.cloud/ipfs/"
            );

            const res = await fetch(uri);
            const metadata = await res.json();

            const priceEth = Number(
              ethers.utils.formatEther(listing.price)
            );

            // 🔍 filters
            if (
              metadata.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) === false
            )
              continue;

            if (
              priceEth < priceRange[0] ||
              priceEth > priceRange[1]
            )
              continue;

            nfts.push({
              tokenId,
              name: meta.name || metadata.name,
              description: meta.description || metadata.description,
              image: metadata.image?.replace(
                "ipfs://",
                "https://gateway.pinata.cloud/ipfs/"
              ),
              price: priceEth.toString(),
              seller: listing.seller,
              createdAt: new Date(),
            });
          } catch (err) {
            console.warn(`Skipping token ${tokenId}`, err);
          }
        }

        setListedNFTs(nfts);
      } catch (err) {
        console.error("Marketplace fetch failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListedNFTs();
  }, [walletAddress, searchTerm, priceRange]);

  const handleBuy = async (nft) => {
    onLightning();
    try {
      const contract = await getContract(true);
      const tx = await contract.buyNFT(nft.tokenId, {
        value: ethers.utils.parseEther(nft.price),
      });
      await tx.wait();
      alert(`Successfully bought ${nft.name}`);
    } catch (err) {
      console.error(err);
      alert("Purchase failed");
    }
  };

  const handleCancelSale = async (nft) => {
    onLightning();
    try {
      const contract = await getContract(true);
      const tx = await contract.cancelSale(nft.tokenId);
      await tx.wait();
      alert("Sale cancelled");
    } catch (err) {
      console.error(err);
      alert("Cancel failed");
    }
  };

  return (
    <motion.div className="max-w-7xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h2 className="text-3xl text-amber-400 mb-2">
          Divine Marketplace
        </h2>
        <p className="text-amber-100/60">
          Acquire legendary NFTs blessed by the pantheon
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search NFTs..."
            className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-amber-500/20 rounded-lg text-amber-100"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-6 py-3 bg-slate-900 border border-amber-500/20 rounded-lg text-amber-100"
        >
          <Filter />
        </button>
      </div>

      {showFilters && (
        <div className="mb-6 flex gap-4">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="flex-1 p-2 bg-slate-800 text-amber-100 rounded"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="flex-1 p-2 bg-slate-800 text-amber-100 rounded"
          />
        </div>
      )}

      {isLoading ? (
        <p className="text-amber-100/40">Loading marketplace…</p>
      ) : listedNFTs.length === 0 ? (
        <p className="text-amber-100/40">No NFTs listed</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {listedNFTs.map((nft) => {
            const isSeller =
              nft.seller?.toLowerCase() ===
              walletAddress?.toLowerCase();

            return (
              <NFTCard
                key={nft.tokenId}
                nft={nft}
                onClick={() => onNFTClick(nft)}
                actions={
                  isSeller ? (
                    <button
                      onClick={() => handleCancelSale(nft)}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      <X size={16} /> Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBuy(nft)}
                      className="bg-amber-500 text-black px-4 py-2 rounded"
                    >
                      <ShoppingBag size={16} /> Buy
                    </button>
                  )
                }
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
