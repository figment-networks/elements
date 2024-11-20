import { Transaction } from "@solana/web3.js";

declare global {
  interface Window {
    tomo_btc?: {
      signMessage: (message: string, format: string) => Promise<string>;
      signPsbt: (transaction: string) => Promise<string>;
      requestAccounts: () => Promise<string[]>;
      getPublicKey: () => Promise<string>;
    };
    solflare?: {
      connect: () => Promise<void>;
      disconnect: () => Promise<void>;
      signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
      signTransaction: (transaction: Transaction) => Promise<Transaction>;
      publicKey: { toString: () => string } | null;
    };
  }
}
