interface Window {
  tomo_btc?: {
    signMessage: (message: string, format: string) => Promise<string>;
    signPsbt: (transaction: string) => Promise<string>;
  };
}
