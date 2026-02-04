# Web3 Smart Contract Integration Guide

## Overview
This UI is designed to connect seamlessly with a Solidity smart contract for NFT marketplace functionality. All interactive elements map directly to smart contract functions.

## Contract Function Mapping

### Wallet Connection
**UI Component:** StatusBar (`/components/StatusBar.tsx`)
- **Connect Wallet Button** → Connect to Web3 provider (MetaMask, WalletConnect, etc.)
- **Wallet Address Display** → Shows connected address
- **Disconnect** → Returns to landing page

### My NFTs Section (`/components/MyNFTsSection.tsx`)
Displays NFTs owned by the connected wallet address.

**Required Contract Functions:**
- `getOwnedTokens(address owner) → uint256[]` - Get all token IDs owned by address
- `tokenURI(uint256 tokenId) → string` - Get metadata URI for NFT

**Actions:**
1. **Sell Button** → `listForSale(uint256 tokenId, uint256 price)`
2. **Transfer Button** → `transferFrom(address from, address to, uint256 tokenId)`
3. **Auction Button** → `createAuction(uint256 tokenId, uint256 startPrice, uint256 duration)`

### Marketplace Section (`/components/MarketplaceSection.tsx`)
Shows all NFTs currently listed for sale.

**Required Contract Functions:**
- `getListedTokens() → uint256[]` - Get all tokens listed for sale
- `getListingPrice(uint256 tokenId) → uint256` - Get sale price

**Actions:**
1. **Buy Button** → `buyNFT(uint256 tokenId) payable` - Purchase NFT (send ETH)
2. **Cancel Sale Button** → `cancelListing(uint256 tokenId)` - Owner removes from sale

### Collections Section (`/components/CollectionsSection.tsx`)
Displays all NFTs ever minted, categorized by type.

**Required Contract Functions:**
- `totalSupply() → uint256` - Total number of NFTs minted
- `tokenByIndex(uint256 index) → uint256` - Get token ID by index
- `getTokenCategory(uint256 tokenId) → string` - Get NFT category

**Actions:**
1. **Sell Button** → Same as My NFTs section
2. **Purchase Request Button** → `createPurchaseRequest(uint256 tokenId, uint256 offeredPrice) payable`
3. **Buy Button** → Same as Marketplace section (if already listed)

### Auctions Section (`/components/AuctionsSection.tsx`)
Vertical list of active auctions with real-time countdown.

**Required Contract Functions:**
- `getActiveAuctions() → uint256[]` - Get all active auction IDs
- `getAuctionDetails(uint256 auctionId) → (uint256 tokenId, uint256 startPrice, uint256 currentBid, address highestBidder, uint256 endTime, bool isActive)`

**Actions:**
1. **Place Bid Button** → `placeBid(uint256 auctionId) payable` - Send ETH bid
2. **Auto-finalize** → When countdown reaches 0, call `finalizeAuction(uint256 auctionId)`

### Mint NFT Section (`/components/MintNFTSection.tsx`)
Form for creating new NFTs.

**Required Contract Functions:**
- `mint(address to, string memory tokenURI, string memory category, string memory collection) → uint256`

**Form Fields Map to:**
- **Image Upload** → Upload to IPFS, get URI
- **Name + Description** → Create metadata JSON on IPFS
- **Category** → String parameter (Gods, Titans, Heroes, Creatures, Artifacts)
- **Collection** → String parameter for grouping

**Mint Flow:**
1. User uploads image → Store on IPFS → Get image URI
2. Create metadata JSON with name, description, image URI, attributes
3. Upload metadata JSON to IPFS → Get metadata URI
4. Call `mint(walletAddress, metadataURI, category, collection)`

## Data Structure Requirements

### NFT Metadata (ERC-721 Compatible)
```json
{
  "name": "Zeus - King of Gods",
  "description": "The supreme ruler of Mount Olympus...",
  "image": "ipfs://...",
  "attributes": [
    {
      "trait_type": "Category",
      "value": "Gods"
    },
    {
      "trait_type": "Collection",
      "value": "Olympian Gods"
    }
  ]
}
```

### Contract Events to Listen For
The UI should subscribe to these events for real-time updates:

- `Transfer(address from, address to, uint256 tokenId)` - Update ownership
- `NFTListed(uint256 tokenId, uint256 price)` - Add to marketplace
- `NFTSold(uint256 tokenId, address seller, address buyer, uint256 price)` - Remove from marketplace
- `AuctionCreated(uint256 auctionId, uint256 tokenId, uint256 startPrice, uint256 endTime)`
- `BidPlaced(uint256 auctionId, address bidder, uint256 amount)`
- `AuctionFinalized(uint256 auctionId, address winner, uint256 finalPrice)`
- `PurchaseRequestCreated(uint256 requestId, uint256 tokenId, address requester, uint256 offeredPrice)`

## Price Data for Footer Chart
**Contract Function:**
- `getAveragePrice() → uint256` - Calculate average of recent sales

The UI polls this every 60 seconds to update the chart in the footer.

## Favorites/Wishlist System
Currently stored in browser localStorage. For persistence:
- Add `addToWishlist(uint256 tokenId)` and `removeFromWishlist(uint256 tokenId)` if you want on-chain favorites
- Or keep client-side using: `localStorage.setItem('favorites', JSON.stringify(favoriteIds))`

## Search & Filter
All search and filtering happens client-side on data fetched from the contract. For large collections, consider implementing:
- Subgraph indexing (The Graph Protocol)
- Backend indexer service
- Pagination via contract: `getTokensPaginated(uint256 offset, uint256 limit)`

## Lightning Effect
The lightning animation is purely cosmetic and triggers on all button clicks. No blockchain interaction needed.

## Network Configuration
Set up for:
- **Local Development:** Hardhat/Ganache local node
- **Testnet:** Sepolia, Goerli, Mumbai (Polygon)
- **Mainnet:** Ethereum, Polygon, etc.

Update the wallet connection logic in `/App.tsx` to specify the correct network and contract address.

## Gas Optimization Notes
- Batch operations where possible
- Use events for historical data instead of storage reads
- Consider EIP-2981 for royalty automation
- Lazy minting for large collections

## Security Considerations
- All price inputs should be validated (prevent negative values, overflow)
- Reentrancy guards on all payable functions
- Access control for admin functions
- Pause mechanism for emergencies
- This UI is for demonstration and should not collect PII or highly sensitive data

## Testing Checklist
- [ ] Wallet connects/disconnects properly
- [ ] NFT ownership displays correctly
- [ ] Marketplace listings update in real-time
- [ ] Auction countdown works and finalizes correctly
- [ ] Minting creates valid metadata and token
- [ ] All transactions show proper confirmation UX
- [ ] Error handling for failed transactions
- [ ] Gas estimation before transactions
- [ ] Mobile responsiveness
- [ ] Lightning effects don't interfere with functionality

## Mock Data Removal
Before deploying with real smart contract:
1. Remove `/data/mockData.ts`
2. Replace mock data fetching with contract calls in all section components
3. Implement proper loading states while fetching blockchain data
4. Add error boundaries for failed contract calls

## Recommended Libraries
- **ethers.js** or **web3.js** - Blockchain interaction
- **wagmi** - React hooks for Ethereum
- **RainbowKit** or **ConnectKit** - Wallet connection UI
- **IPFS** - `ipfs-http-client` or Pinata/NFT.Storage for metadata
- **The Graph** - For complex queries and indexing

---

This UI is production-ready for Web3 integration. All components are modular and designed to receive blockchain data via props. Simply replace the mock data sources with your smart contract calls.
