# CERBERUS - AUTOMATED TRADING SYSTEM

![Cerberus Banner](./banner.png)

A comprehensive decentralized trading automation platform built with a multi-layered architecture for executing automated operations on Uniswap DEX.

## :speech_balloon: Description

Cerberus is a sophisticated automated trading system designed for educational purposes, demonstrating the integration of multiple technologies to create a complete DeFi automation solution. The platform monitors cryptocurrency price movements on Binance and automatically executes trades on Uniswap through smart contracts, providing a seamless bridge between centralized and decentralized exchanges.

The system features a modern web interface for configuration and monitoring, a robust backend for orchestration, blockchain integration for secure transaction execution, and a real-time price monitoring engine that serves as the trigger mechanism for automated trading strategies.

## Table of contents

- [Architecture](#architecture)
- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
- [Back Matter](#back-matter)
  - [Acknowledgements](#acknowledgements)
  - [Contributing](#contributing)
  - [Authors & Contributors](#authors--contributors)
  - [Legal Disclaimer](#legal-disclaimer)
  - [License](#license)

## Architecture

Cerberus is built with a modular, multi-layered architecture that separates concerns and enables scalability:

### Frontend Layer
- **Technology**: React with Next.js framework
- **Template**: Notus NextJS for premium UI/UX
- **Purpose**: User interface for managing automations, monitoring trades, and configuring strategies
- **Key Features**: 
  - Web3 wallet integration
  - Real-time trade monitoring
  - Automation configuration dashboard
  - User authentication and profile management

### Backend Layer
- **Technology**: NestJS framework
- **Purpose**: API gateway and business logic orchestration
- **Responsibilities**:
  - RESTful API endpoints for frontend communication
  - Authentication and authorization (JWT)
  - User and automation management
  - Coordination between Engine and Blockchain layers
  - Data persistence with MongoDB via Prisma ORM

### Blockchain Layer
- **Technology**: Solidity smart contracts
- **Framework**: Hardhat development environment
- **Libraries**: OpenZeppelin for secure contract standards
- **Smart Contracts**:
  - `CerberusPay`: Handles automated trade execution on Uniswap
  - `CerberusCoin`: Custom token implementation
- **Purpose**: Trustless execution of trades directly on the blockchain
- **Testing**: Comprehensive test suite with Hardhat

### Engine Layer
- **Technology**: Node.js with WebSocket
- **Purpose**: Real-time market data monitoring and trade triggering
- **Functionality**:
  - Connects to Binance WebSocket API for live price feeds
  - Monitors configured trading conditions
  - Triggers automated trades when conditions are met
  - Sends notifications via email when trades execute

### Data Layer
- **Database**: MongoDB for persistent storage
- **ORM**: Prisma for type-safe database access
- **Models**: Users, Tokens, Pools, Automations, Trades

## Features

These are the key features of the Cerberus platform:

- **Web3 Authentication**: Secure login using MetaMask wallet integration
- **Automated Trading**: Configure conditions for automatic trade execution
- **Real-time Monitoring**: Live price tracking from Binance exchange
- **Smart Contract Execution**: Trustless trade execution on Uniswap DEX
- **Trade History**: Complete audit trail of all executed trades
- **PnL Tracking**: Profit and loss calculation for each automation
- **Multi-Network Support**: Compatible with multiple EVM networks
- **Email Notifications**: Alerts for trade executions and important events
- **User Management**: Complete user profile and settings management

## Built With

### Frontend
- [Node.js](https://nodejs.org/) - JavaScript Runtime Environment
- [React](https://react.dev/) - Web Interface Library
- [Next.js](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Typed Programming Language
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Ethers.js](https://ethers.org/) - Web3 Library
- [Notus NextJS](https://www.creative-tim.com/product/notus-nextjs) - UI Template

### Backend
- [NestJS](https://nestjs.com/) - Progressive Node.js Framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [MongoDB](https://www.mongodb.com/) - NoSQL Database
- [JWT](https://jwt.io/) - JSON Web Tokens for Authentication
- [Jest](https://jestjs.io/) - Testing Framework

### Blockchain
- [Solidity](https://soliditylang.org/) - Smart Contract Language
- [Hardhat](https://hardhat.org/) - Ethereum Development Environment
- [OpenZeppelin](https://www.openzeppelin.com/) - Secure Smart Contract Library
- [Ethers.js](https://ethers.org/) - Ethereum Library

### Engine
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) - Real-time Communication
- [Binance API](https://binance-docs.github.io/apidocs/) - Market Data Provider
- [Nodemailer](https://nodemailer.com/) - Email Service

## Getting Started

### Prerequisites

- Node.js ^16.8.0
- MongoDB database instance
- MetaMask wallet
- Binance API access (for price monitoring)
- Ethereum wallet with testnet/mainnet funds

### Installation

Clone the repository on your local machine and enter the project folder:

```bash
$ git clone https://github.com/mabesi/cerberus.git
$ cd cerberus
```

Install dependencies for each layer:

```bash
# Install commons dependencies
$ cd _commons_
$ npm install

# Install backend dependencies
$ cd ../backend
$ npm install

# Install frontend dependencies
$ cd ../frontend
$ npm install

# Install blockchain dependencies
$ cd ../blockchain
$ npm install

# Install engine dependencies
$ cd ../engine
$ npm install
```

### Configuration

Each layer has its own configuration file. Copy the `.env.example` to `.env` in each directory and adjust the values:

#### Commons Configuration (`_commons_/.env`)
```bash
DATABASE_URL=mongodb://localhost:27017/cerberus
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES=3600
```

#### Backend Configuration (`backend/.env`)
```bash
PORT=3001
FRONTEND_URL=http://localhost:3000
```

#### Frontend Configuration (`frontend/.env`)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_CHAIN_ID=1
```

#### Blockchain Configuration (`blockchain/.env`)
```bash
PRIVATE_KEY=your_private_key_here
INFURA_KEY=your_infura_key_here
ETHERSCAN_KEY=your_etherscan_key_here
```

#### Engine Configuration (`engine/.env`)
```bash
BACKEND_URL=http://localhost:3001
BINANCE_WS_URL=wss://stream.binance.com:9443/ws
```

### Usage

#### 1. Setup Database

Generate Prisma client and run migrations:

```bash
$ cd _commons_
$ npx prisma generate
```

#### 2. Deploy Smart Contracts

Compile and deploy the smart contracts to your chosen network:

```bash
$ cd blockchain
$ npm run compile
$ npm run test
$ npm run deploy
```

#### 3. Start Backend

Run the backend server:

```bash
$ cd backend
$ npm run start:dev
```

The backend will be available at [http://localhost:3001](http://localhost:3001)

#### 4. Start Engine

Run the price monitoring engine:

```bash
$ cd engine
$ npm start
```

#### 5. Start Frontend

Run the frontend development server:

```bash
$ cd frontend
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to access the application.

## Back Matter

### Acknowledgements

Thanks to all these amazing people and tools that served as a source of knowledge or were an integral part in the construction of this project.

- [Node.js](https://nodejs.org/) - JavaScript Runtime Environment
- [React](https://react.dev/) - Web Interface Library
- [Next.js](https://nextjs.org/) - React Framework
- [NestJS](https://nestjs.com/) - Progressive Node.js Framework
- [Ethers.js](https://ethers.org/) - Web3 Library
- [TypeScript](https://www.typescriptlang.org/) - Typed Programming Language
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Hardhat](https://hardhat.org/) - Ethereum Development Environment
- [OpenZeppelin](https://www.openzeppelin.com/) - Smart Contract Library
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [MongoDB](https://www.mongodb.com/) - NoSQL Database
- [Creative Tim](https://www.creative-tim.com/) - UI Tools
- [LuizTools](https://www.luiztools.com.br/) - JavaScript and Web3 Online Courses

### Contributing

Please first ask us for the details of code of conduct. After this follow these steps of the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:

### Authors & Contributors

| [<img loading="lazy" src="https://github.com/mabesi/mabesi/blob/master/octocat-mabesi.png" width=115><br><sub>Plinio Mabesi</sub>](https://github.com/mabesi) |
| :---: |

### Legal Disclaimer

<p align="justify">This project was developed for educational purposes as part of a programming course. The use of this tool, for any purpose, will occur at your own risk, being your sole responsibility for any legal implications arising from it.</p>
<p align="justify">It is also the end user's responsibility to know and obey all applicable local, state and federal laws regarding cryptocurrency trading and automated trading systems. Developers take no responsibility and are not liable for any misuse, financial losses, or damage caused by this program.</p>
<p align="justify"><strong>WARNING:</strong> Automated trading involves substantial risk of loss. Never invest more than you can afford to lose. This software is provided as-is without any guarantees of profitability or safety.</p>

### License

This project is licensed under the [MIT License](LICENSE).
