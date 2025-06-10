export interface Protocol {
  name: string;
  id: "ethereum" | "solana" | "babylon";
  disabled?: boolean;
  tooltip?: string;
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
