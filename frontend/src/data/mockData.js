// mockData.js

// Mock NFTs
export const mockNFTs = [
  {
    id: '1',
    tokenId: 1,
    name: 'Zeus - King of Gods',
    description: 'The supreme ruler of Mount Olympus, wielder of lightning and keeper of cosmic order.',
    image: 'https://images.unsplash.com/photo-1595650172217-62a60375c9e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZXVzJTIwbGlnaHRuaW5nJTIwc3Rvcm18ZW58MXx8fHwxNzY5Mjg3NTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 5.5,
    creator: '0x1234...5678',
    owner: '0x1234...5678',
    category: 'Gods',
    isListed: true,
    createdAt: new Date('2026-01-15'),
  },
];

// Mock Auctions
export const mockAuctions = [
  {
    id: 'a1',
    nft: mockNFTs[0],
    startPrice: 5.0,
    currentBid: 6.2,
    highestBidder: '0xaaa1...bbb1',
    endTime: new Date(Date.now() + 3600000), // 1 hour from now
    isActive: true,
  },
];
