# Somnia Runner

A simple endless runner game built with Vite, React, TypeScript, and HTML5 Canvas. This project is inspired by the classic Chrome Dino game and serves as the foundation for a future Web3-integrated version using the Somnia platform.


## Features

- Endless running and jumping mechanics.
- Increasing difficulty with obstacle speed and spawn rate.
- Local high score persistence using `localStorage`.
- Minimalist, pixel-art inspired design.
- Fully tested with Jest and React Testing Library.

## Project Structure

The project is organized with a clear separation of concerns:

```
/src
├── /assets           # Static assets like sprites and images
├── /components       # React components (GameCanvas, UI screens)
├── /hooks            # Custom React hooks (useAnimationFrame, useKeyboard)
├── /utils            # Core game logic (physics, collision, spawning)
├── /__tests__        # Jest/RTL tests for utils and components
├── App.tsx           # Main application component (game state machine)
├── main.tsx          # Application entry point
└── index.css         # Global styles and CSS variables
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/somnia-runner.git
    cd somnia-runner
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *(Or `yarn install`, `pnpm install`)*

## Available Scripts

### Run the development server

To start the game in development mode with hot-reloading:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the address shown in your terminal) to view it in the browser.

### Build for production

To create a production-ready build of the application:

```bash
npm run build
```

The optimized files will be located in the `/dist` directory.

### Run tests

To run the unit and component tests:

```bash
npm run test
```

To run tests in watch mode:

```bash
npm run test:watch
```

To generate a test coverage report:

```bash
npm run test:coverage
```
The report will be available in the `/coverage` directory.

## Next Steps: Phase 2

The next phase of this project will involve integrating with the Somnia blockchain:

-   **Web3 Integration:** Connect the game to user wallets (e.g., MetaMask).
-   **Smart Contract Hooks:** Implement hooks to interact with Somnia's smart contracts.
-   **NFTs as In-Game Items:** Use NFTs for player skins or other cosmetic items.
-   **On-Chain High Scores:** Store high scores on the blockchain to create a global, persistent leaderboard.
