import { Transaction } from "@solana/web3.js";

declare global {
  interface Window {
    tomo_btc?: {
      signMessage: (message: string, format: string) => Promise<string>;
      signPsbt: (transaction: string) => Promise<string>;
      requestAccounts: () => Promise<string[]>;
      getPublicKey: () => Promise<string>;
    };
    phantom?: {
      solana?: {
        signMessage: (
          message: Uint8Array,
          encoding: string
        ) => Promise<{ signature: string }>;
        signAndSendTransaction: (
          transaction: Transaction
        ) => Promise<{ signature: string }>;
        connect: () => Promise<{ publicKey: PublicKey }>;
      };
    };
  }
}
