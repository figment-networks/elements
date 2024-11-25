export interface Protocol {
  name: string;
  id: "ethereum" | "solana" | "babylon";
}

export interface Network {
  name: string;
  id: string;
  disabled?: boolean;
}

export type WalletDescription = {
  [key in Protocol["id"]]: {
    default: "Uses WalletConnect";
    custom: "With own signing function.";
  };
};
