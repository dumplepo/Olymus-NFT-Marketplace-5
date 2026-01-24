// NFT Object
export const NFT = {
  id: '',
  tokenId: 0,
  name: '',
  description: '',
  image: '',
  price: 0,
  creator: '',
  owner: '',
  category: 'Gods', // Example default category, you can update accordingly
  purchasePrice: undefined,
  isListed: false,
  isFavorite: false,
  createdAt: new Date(),
};

// Auction Object
export const Auction = {
  id: '',
  nft: NFT, // Reference to NFT object
  startPrice: 0,
  currentBid: 0,
  highestBidder: null,
  endTime: new Date(),
  isActive: false,
};

// PurchaseRequest Object
export const PurchaseRequest = {
  id: '',
  nftId: '',
  from: '',
  offeredPrice: 0,
  status: 'pending', // Example default status
};
