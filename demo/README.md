# Figment Elements Demo

A simple demo app for the [Figment Elements](https://docs.figment.io/docs/elements) staking widget. It lets you try Ethereum (Hoodi) and Solana (Devnet) staking in an embeddable iframe.

## Getting started

### 1. Install dependencies

From the `demo` folder:

```bash
pnpm i
```

### 2. Set your Figment dApp token

Copy the example env file and add your token:

```bash
cp .env_example .env
```

Edit `.env` and set your Figment dApp token (app ID):

```
VITE_DAPP_TOKEN=your-figment-app-id
```

### 3. Run the demo

```bash
pnpm dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`) in your browser.

## What you can do

- **Protocol:** Switch between ETH (Hoodi) and SOL (Devnet).
- **Network:** Choose the network (e.g. Hoodi for Ethereum, Devnet for Solana).
- **Theme:** Toggle light, dark, or system theme.
- **Wallet:** Use the default wallet flow (WalletConnect for ETH, Solana Wallet Adapter for SOL) or a custom wallet.

The staking UI is loaded in an iframe from Figment; your token in `VITE_DAPP_TOKEN` identifies your app to that service.
