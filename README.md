# Somnia Runner Monorepo

A Web3-ready endless runner game built with Vite, React, TypeScript, and HTML5 Canvas. This project is structured as a monorepo to accommodate frontend development, backend services, and smart contracts for the Somnia platform.

## Project Structure

The repository is organized into workspaces:

- **`frontend/`**: The React-based game application.
- **`backend/`**: (Placeholder) Future Node.js/Express backend for leaderboards or user data.
- **`contracts/`**: (Placeholder) Future Solidity smart contracts for on-chain features.

### Frontend Details

Located in `/frontend`, the game features:
- Endless running and jumping mechanics.
- Increasing difficulty with obstacle speed and spawn rate.
- Local high score persistence.
- Fully tested with Jest and React Testing Library.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 recommended)
- [npm](https://www.npmjs.com/) (using npm workspaces)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/NgaripeterN/Somnia-Runner.git
    cd Somnia-Runner
    ```

2.  **Install dependencies at the root:**
    ```bash
    npm install
    ```

## Available Scripts

Run these scripts from the root directory to manage the workspaces:

### Frontend

- `npm run frontend:dev`: Start the game development server.
- `npm run frontend:build`: Build the game for production.
- `npm run frontend:test`: Run frontend unit and component tests.
- `npm run frontend:lint`: Lint the frontend codebase.

## Deployment

This project is configured for deployment on **Netlify**. 
- The `netlify.toml` file at the root handles building the `frontend` workspace and publishing the `frontend/dist` directory.
- Build errors related to TypeScript and CSS have been resolved to ensure a smooth CI/CD pipeline.

## Roadmap: Web3 Integration

The next phase involves integrating with the Somnia blockchain:

- **Web3 Integration:** Connect to user wallets.
- **Smart Contracts:** Deploy contracts in the `contracts/` folder for on-chain logic.
- **NFT Assets:** Use NFTs for in-game items and skins.
- **On-Chain Leaderboard:** Store high scores on Somnia for a decentralized leaderboard.