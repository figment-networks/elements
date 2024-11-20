export interface Protocol {
  name: string;
  id: "ethereum" | "solana" | "babylon";
}

export interface Network {
  name: string;
  id: string;
  disabled?: boolean;
}
