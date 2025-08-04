# Runik

A blockchain-powered fashion ecosystem that reimagines Fashion Week through verified digital identity, NFT-based garments, tokenized show access, and on-chain royalty infrastructure — designed for transparency, exclusivity, and global participation.

---

## Overview

Runik consists of ten smart contracts that together form a decentralized, traceable, and immersive experience for designers, collectors, and fashion fans:

1. **Maison Registry** – Verifies and registers designer identities on-chain.
2. **Runik Pass** – Issues NFT-based tickets for shows, events, or streaming access.
3. **Collection Drop** – Manages the release and minting of fashion collections.
4. **Edition Vault** – Stores digital twins of garments as NFTs with metadata.
5. **Royalty Engine** – Ensures resale royalties are automatically distributed to creators.
6. **Backstage Pool** – Crowdfunds emerging designers and unlocks exclusive perks.
7. **Runik Vote** – Allows token-gated voting on designer showcases and collections.
8. **Sustain Chain** – Tracks and verifies sustainable production stages.
9. **Archive Lens** – Grants time-gated or token-gated access to fashion show archives.
10. **Treasury Flow** – Automates fund routing between stakeholders and contracts.

---

## Features

- **On-chain designer verification** using unique identities  
- **NFT tickets** for in-person or digital show access  
- **Limited-edition drops** with transparent minting rules  
- **Fashion NFTs** with detailed provenance and metadata  
- **Automatic resale royalties** for original creators  
- **Community funding** to support new fashion talent  
- **DAO-style voting** on who appears in the next season  
- **Transparent supply chain** for physical or hybrid garments  
- **Digital runway archive** access based on NFT ownership  
- **Fund routing** across all treasury and royalty contracts  

---

## Smart Contracts

### Maison Registry
- Register and verify designer identities
- Prevent duplicates and impersonation
- Soulbound identity structure for credibility

### Runik Pass
- Mint event access NFTs
- Support resale with built-in royalties
- Validate QR or token-gated entry

### Collection Drop
- Schedule and release fashion collections
- Set max supply, access rules, and drop phases
- Supports whitelists or auctions

### Edition Vault
- Mint NFT garments with rich metadata (fabric, concept, photos)
- Provenance tracking for resale
- Collection-based indexing

### Royalty Engine
- On-chain split of resale royalties
- Configurable percentages per drop
- Supports multi-creator splits

### Backstage Pool
- Fans crowdfund designers or collections
- Rewards: early access, exclusive NFTs, backstage passes
- Refund logic for unfunded projects

### Runik Vote
- Vote on designers, collections, or seasonal themes
- Token-weighted or NFT-gated voting
- On-chain execution or event signaling

### Sustain Chain
- IPFS hashes + on-chain proofs for production steps
- Link digital and physical traceability
- Designed for sustainable fashion brands

### Archive Lens
- Access digital archives via NFT or token-based rights
- Time-limited access, rental, or permanent unlocks
- Designed for fashion historians and collectors

### Treasury Flow
- Route mint revenue, royalties, and treasury payouts
- Multi-address payout automation
- Transparency via on-chain logs

---

## Installation

1. Install [Clarinet CLI](https://docs.hiro.so/clarinet/getting-started)
2. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/runik.git
   ```
3. Run tests:
    ```bash
    npm test
    ```
4. Deploy contracts:
    ```bash
    clarinet deploy
    ```

---

## Usage

Each smart contract is modular but designed to integrate seamlessly into a unified on-chain fashion experience. Refer to individual .clar contract documentation for functions, parameters, and interaction flows.

---

## License

MIT License