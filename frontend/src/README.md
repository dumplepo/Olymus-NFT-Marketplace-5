# Olympus Market - Divine NFT Marketplace

A stunning Web3 NFT Marketplace interface inspired by Greek Mythology, featuring Olympus, ancient temples, sacred fire, lightning, marble, gold, clouds, and divine light in an epic cinematic fantasy aesthetic.

## ✨ Features

### Landing Page
- **Cinematic Entrance**: Fullscreen video-style background with parallax clouds and temples
- **Divine Greeting**: Welcome message with sacred NFT world introduction
- **Greek Mythology Theme**: Olympus-inspired design with gold, amber, and divine lighting
- **Smooth Animations**: Film-like fade-in, zoom, and depth transitions
- **Contact Information**: Phone number display (+1 (888) OLYMPUS)
- **Lightning Effect**: Sacred lightning animation on wallet button click

### Main Application

#### Status Bar
- Wallet connection status display
- Connect/Disconnect wallet button with lightning effect
- Smooth wallet address display with truncation
- Automatic return to landing page on disconnect

#### Navigation Toolbar
- **My NFTs**: View and manage owned NFTs (requires wallet)
- **Marketplace**: Browse and purchase listed NFTs
- **Collections**: Explore all minted NFTs by category
- **Auctions**: Participate in timed bidding wars
- **Mint NFT**: Create and mint new NFTs (requires wallet)
- Active section highlighting with smooth transitions

#### My NFTs Section
- Display all NFTs owned by connected wallet
- **Actions per NFT**:
  - **Sell**: List NFT for fixed price sale
  - **Transfer**: Send NFT to another address for free
  - **Auction**: Create timed auction with starting price and duration
- Shows purchase price for acquired NFTs (0 if self-minted)

#### Marketplace Section
- Browse all NFTs currently listed for sale
- **Search**: Real-time search by NFT name
- **Filters**: 
  - Price range slider (min/max ETH)
  - Sort by recency
- **Actions**:
  - **Buy**: Purchase NFT at listed price
  - **Cancel Sale**: Remove own NFT from marketplace (owner only)

#### Collections Section
- View all NFTs ever issued on the platform
- **Categories**: Gods, Titans, Heroes, Creatures, Artifacts
- Category filter buttons with active state
- Search by NFT name
- **Actions**:
  - **Sell**: List owned NFT for sale
  - **Purchase Request**: Send offer to NFT owner
  - **Buy**: Purchase if already listed

#### Auctions Section
- Vertical list layout with large artwork display
- **Auction Details**:
  - NFT image, name, description
  - Starting price and current bid
  - Highest bidder address
  - Real-time countdown timer
- **Place Bid**: Enter bid amount (must exceed current bid)
- Auction status (active/ended)
- Winner display for completed auctions
- Bidding disabled for owned NFTs

#### Mint NFT Section
- **Two-column layout**:
  - Left: Form inputs
  - Right: Live preview
- **Form Fields**:
  - NFT Name (required)
  - Description
  - Category selection (dropdown)
  - Collection (select existing or create new)
  - Image upload (PNG, JPG, GIF)
- **Preview Panel**: Golden ratio preview with metadata display
- Ready for Web3 integration (upload to IPFS → mint function)

### Footer
- **Horizontal Scrolling Sections**:
  - Recently Issued NFTs
  - Highest Priced NFTs
  - NFTs Currently in Auction
- **Average NFT Value Chart**: 
  - Line chart with real-time updates (every minute)
  - Shows price trends over time
  - Built with Recharts
- Compact card size with subtle ripple effects
- Automatic smooth scrolling at different speeds for depth

### Interactions & Animations

#### NFT Cards
- **Golden Ratio**: All cards follow 1:1.618 aspect ratio
- **Hover Effects**: 
  - Card lifts and scales
  - Border glow intensifies
  - Image zooms
  - Ripple animation overlay
- **Favorites**: Heart icon to save to wishlist
- **Modal**: Click anywhere on card to view full details

#### Lightning Effect
- Triggers on ALL button clicks
- Flash overlay with multiple opacity stages
- Vertical lightning bolt with random positioning
- Branching lightning effect
- Cinematic amber/gold colors

#### Parallax Effects
- Landing page: Multi-layer parallax with clouds and temples
- Main page: Subtle background movement on scroll
- Different scroll speeds for depth perception

#### Page Transitions
- Fade-in and slide-up animations
- Smooth section switching with AnimatePresence
- Staggered card entrance animations
- Spring physics for natural motion

### NFT Detail Modal
- Fullscreen overlay with backdrop blur
- Large NFT image display
- Complete metadata:
  - Token ID
  - Name
  - Price
  - Creator address
  - Owner address
  - Creation date
  - Description
  - Category badge
- Click outside to close

### Additional Features
- **Back to Top Button**: Appears after scrolling down, triggers lightning
- **Custom Scrollbar**: Greek mythology themed (gold gradient)
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Loading States**: Smooth transitions and placeholders
- **Error Handling**: ImageWithFallback component for broken images
- **TypeScript**: Full type safety throughout

## 🎨 Design System

### Colors
- **Primary**: Amber/Gold (#fbbf24, #f59e0b, #d97706)
- **Background**: Dark slate (#0f172a, #1e293b)
- **Sacred Light**: Amber glows and halos
- **Divine Accents**: Blue (#3b82f6) for secondary actions

### Typography
- Tracking: Wide letter spacing for epic feel
- Hierarchy: Clear size and weight differences
- Readability: High contrast on dark backgrounds

### Effects
- Shadow: Ambient gold glows
- Blur: Backdrop blur for depth
- Gradients: Radial and linear for divine light
- Animations: Film-like smoothness (never cartoonish)

## 🔗 Web3 Integration

This UI is **production-ready** for smart contract integration. See `WEB3_INTEGRATION.md` for complete documentation on:
- Contract function mapping
- Event subscriptions
- IPFS integration for minting
- Gas optimization tips
- Security considerations
- Testing checklist

### Mock Data
Currently uses mock data in `/data/mockData.ts`. Replace with:
- `ethers.js` or `web3.js` calls
- Contract event listeners
- IPFS metadata fetching

### Recommended Stack
- **Wagmi** + **RainbowKit** for wallet connection
- **Ethers.js** for contract interaction
- **Pinata** or **NFT.Storage** for IPFS uploads
- **The Graph** for indexing and queries

## 📁 Project Structure

```
/App.tsx                          # Main app entry point
/components/
  ├── LandingPage.tsx             # Cinematic landing page
  ├── MainPage.tsx                # Main application layout
  ├── StatusBar.tsx               # Wallet connection bar
  ├── Toolbar.tsx                 # Navigation tabs
  ├── MyNFTsSection.tsx           # Owned NFTs management
  ├── MarketplaceSection.tsx      # NFT shopping
  ├── CollectionsSection.tsx      # Browse all NFTs
  ├── AuctionsSection.tsx         # Bidding interface
  ├── MintNFTSection.tsx          # Create NFTs
  ├── NFTCard.tsx                 # Reusable NFT card (golden ratio)
  ├── NFTDetailModal.tsx          # Full NFT information modal
  ├── ActionModal.tsx             # Sell/Transfer/Auction modal
  ├── LightningEffect.tsx         # Sacred lightning animation
  └── Footer.tsx                  # Scrolling sections + chart
/data/
  └── mockData.ts                 # Mock NFTs and auctions
/types/
  └── index.ts                    # TypeScript interfaces
/styles/
  └── globals.css                 # Custom styles + scrollbar
```

## 🚀 Getting Started

1. **Connect Wallet**: Click "Connect Wallet" in the status bar
2. **Explore Marketplace**: Browse available NFTs
3. **Mint NFT**: Create your own divine artifact
4. **Manage Collection**: Sell, transfer, or auction your NFTs
5. **Place Bids**: Compete in sacred auctions

## 🎯 Key Technical Details

- **Golden Ratio Cards**: `width / 1.618 = height`
- **Staggered Animations**: 0.1s delay between cards
- **Auto-scroll Speed**: Different speeds for parallax depth
- **Chart Updates**: Every 60 seconds
- **Auction Timers**: Real-time countdown (updates every second)
- **Wallet State**: Disables "My NFTs" and "Mint" when disconnected

## 📱 Responsive Breakpoints

- **Mobile**: 1 column grid
- **Tablet**: 2 column grid
- **Desktop**: 3 column grid
- Footer cards scale down on smaller screens
- Navigation toolbar wraps on mobile

## 🔮 Sacred Features

- ⚡ Lightning strikes on every action
- 🌟 Parallax clouds and temples
- 💎 Golden ratio perfection
- 🎭 Cinematic animations
- 🏛️ Greek mythology aesthetic
- 📊 Real-time price analytics
- ❤️ Wishlist/favorites system
- 🎨 IPFS-ready minting

## 🛡️ Security Note

This interface is designed for Web3 interaction but does not handle sensitive data directly. The smart contract should implement:
- Access controls
- Reentrancy guards
- Input validation
- Pausable functionality
- Admin safeguards

**Figma Make is not designed for collecting PII or securing highly sensitive data.**

## 📄 License

Created for Web3 NFT marketplace deployment. Ready for testnet and mainnet integration.

---

**Welcome to Olympus Market** - Where mortal art becomes immortal NFTs. 🏛️⚡✨
