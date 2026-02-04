// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
    ===============================
    Greek Mythology NFT Marketplace
    ===============================

    This contract is designed to be FRONTEND-FRIENDLY.
    Every function directly maps to a UI interaction.

    Environment:
    - Node.js v22x
    - Hardhat v2.28.3
    - @nomicfoundation/hardhat-toolbox ^6.1.0
*/

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MythicNFTMarketplace is ERC721URIStorage, ReentrancyGuard, Ownable {

    /* ------------------------------------------------------------ */
    /*                          NFT DATA                            */
    /* ------------------------------------------------------------ */

    uint256 public tokenCounter;

    enum NFTType {
        God,
        Titan,
        Hero,
        Creature,
        Artifact
    }

    struct NFTMeta {
        string name;
        string description;
        NFTType nftType;
        address creator;
    }

    mapping(uint256 => NFTMeta) public nftMetadata;

    /* ------------------------------------------------------------ */
    /*                        MARKETPLACE                           */
    /* ------------------------------------------------------------ */

    struct Listing {
        uint256 price;
        address seller;
        bool active;
    }

    // tokenId => Listing
    mapping(uint256 => Listing) public marketplaceListings;

    /* ------------------------------------------------------------ */
    /*                        AUCTIONS                              */
    /* ------------------------------------------------------------ */

    struct Auction {
        uint256 startPrice;
        uint256 highestBid;
        address highestBidder;
        uint256 endTime;
        address seller;
        bool active;
    }

    // tokenId => Auction
    mapping(uint256 => Auction) public auctions;

    /* ------------------------------------------------------------ */
    /*                    PURCHASE REQUESTS                         */
    /* ------------------------------------------------------------ */

    struct PurchaseRequest {
        address buyer;
        uint256 offeredPrice;
        bool active;
    }

    // tokenId => PurchaseRequest[]
    mapping(uint256 => PurchaseRequest[]) public purchaseRequests;

    /* ------------------------------------------------------------ */
    /*                          EVENTS                              */
    /* ------------------------------------------------------------ */

    event NFTMinted(uint256 tokenId, address creator);
    event ListedForSale(uint256 tokenId, uint256 price);
    event SaleCancelled(uint256 tokenId);
    event NFTPurchased(uint256 tokenId, address buyer);
    event NFTTransferred(uint256 tokenId, address to);
    event AuctionCreated(uint256 tokenId, uint256 endTime);
    event BidPlaced(uint256 tokenId, uint256 amount);
    event AuctionEnded(uint256 tokenId, address winner);

    constructor() ERC721("MythicNFT", "MYTH") Ownable(msg.sender) {
        tokenCounter = 1;
    }

    /* ------------------------------------------------------------ */
    /*                        MINT NFT                              */
    /* ------------------------------------------------------------ */

    /*
        UI: Mint NFT Page
        - Upload image (stored via IPFS)
        - Enter name
        - Select collection (NFTType)
        - Description
    */
    function mintNFT(
        string memory tokenURI,
        string memory name,
        string memory description,
        NFTType nftType
    ) external {
        uint256 tokenId = tokenCounter;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        nftMetadata[tokenId] = NFTMeta({
            name: name,
            description: description,
            nftType: nftType,
            creator: msg.sender
        });

        tokenCounter++;
        emit NFTMinted(tokenId, msg.sender);
    }

    /* ------------------------------------------------------------ */
    /*                    MARKETPLACE SALE                          */
    /* ------------------------------------------------------------ */

    /*
        UI: My NFT → Sell Button
    */
    function listForSale(uint256 tokenId, uint256 price) external {
        require(ownerOf(tokenId) == msg.sender, "Not NFT owner");
        require(price > 0, "Price must be > 0");

        _transfer(msg.sender, address(this), tokenId);

        marketplaceListings[tokenId] = Listing({
            price: price,
            seller: msg.sender,
            active: true
        });

        emit ListedForSale(tokenId, price);
    }

    /*
        UI: Marketplace → Cancel Sale
    */
    function cancelSale(uint256 tokenId) external {
        Listing storage listing = marketplaceListings[tokenId];
        require(listing.active, "Not listed");
        require(listing.seller == msg.sender, "Not seller");

        listing.active = false;

        _transfer(address(this), msg.sender, tokenId);
        emit SaleCancelled(tokenId);
    }

    /*
        UI: Marketplace → Buy Button
    */
    function buyNFT(uint256 tokenId) external payable nonReentrant {
        Listing storage listing = marketplaceListings[tokenId];
        require(listing.active, "Not for sale");
        require(msg.value == listing.price, "Incorrect price");

        listing.active = false;

        (bool success, ) = payable(listing.seller).call{value: msg.value}("");
        require(success, "Payment to seller failed");
        
        _transfer(address(this), msg.sender, tokenId);

        emit NFTPurchased(tokenId, msg.sender);
    }

    /* ------------------------------------------------------------ */
    /*                    TRANSFER NFT (FREE)                       */
    /* ------------------------------------------------------------ */

    /*
        UI: My NFT → Transfer Button
    */
    function transferNFT(uint256 tokenId, address to) external {
        require(ownerOf(tokenId) == msg.sender, "Not owner");

        _transfer(msg.sender, to, tokenId);
        emit NFTTransferred(tokenId, to);
    }

    /* ------------------------------------------------------------ */
    /*                        AUCTIONS                              */
    /* ------------------------------------------------------------ */

    /*
        UI: My NFT → Auction Button
        Time is entered in SECONDS
    */
    function createAuction(
        uint256 tokenId,
        uint256 startPrice,
        uint256 duration
    ) external {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        require(duration > 0, "Invalid duration");

        auctions[tokenId] = Auction({
            startPrice: startPrice,
            highestBid: 0,
            highestBidder: address(0),
            endTime: block.timestamp + duration,
            seller: msg.sender,
            active: true
        });

        emit AuctionCreated(tokenId, block.timestamp + duration);
    }

    /*
        UI: Auction → Bid Button
    */
    function placeBid(uint256 tokenId) external payable nonReentrant {
        Auction storage auction = auctions[tokenId];
        require(auction.active, "Auction inactive");
        require(block.timestamp < auction.endTime, "Auction ended");
        require(msg.sender != auction.seller, "Owner cannot bid");
        require(msg.value > auction.highestBid, "Bid too low");

        if (auction.highestBidder != address(0)) {
            (bool success, ) = payable(auction.highestBidder).call{value: auction.highestBid}("");
            require(success, "Refund failed");
        }

        auction.highestBid = msg.value;
        auction.highestBidder = msg.sender;

        emit BidPlaced(tokenId, msg.value);
    }

    /*
        UI: Auction → Auto / Manual End
    */
    function endAuction(uint256 tokenId) external nonReentrant {
        Auction storage auction = auctions[tokenId];
        require(auction.active, "Auction inactive");
        require(block.timestamp >= auction.endTime, "Auction not ended");

        auction.active = false;

        if (auction.highestBidder != address(0)) {
            (bool success, ) = payable(auction.seller).call{value: auction.highestBid}("");
            require(success, "Auction payout failed");
            _transfer(auction.seller, auction.highestBidder, tokenId);
            emit AuctionEnded(tokenId, auction.highestBidder);
        }
    }

    /* ------------------------------------------------------------ */
    /*                  PURCHASE REQUEST SYSTEM                     */
    /* ------------------------------------------------------------ */

    /*
        UI: Collections → Purchase Request Button
    */
    function requestPurchase(uint256 tokenId, uint256 price) external {
        require(ownerOf(tokenId) != msg.sender, "Owner cannot request");

        purchaseRequests[tokenId].push(
            PurchaseRequest({
                buyer: msg.sender,
                offeredPrice: price,
                active: true
            })
        );
    }

    /*
        UI: Owner → Approve Purchase Request
    */
    function approvePurchaseRequest(uint256 tokenId, uint256 index) external nonReentrant {
        PurchaseRequest storage request = purchaseRequests[tokenId][index];
        require(request.active, "Request inactive");
        require(ownerOf(tokenId) == msg.sender, "Not owner");

        request.active = false;

        (bool success, ) = payable(msg.sender).call{value: request.offeredPrice}("");
        require(success, "Payment failed");

        _transfer(msg.sender, request.buyer, tokenId);
    }


    // Example function in the contract
    function getBalance(address user) public view returns (uint256) {
        return balanceOf(user);
    }
}
