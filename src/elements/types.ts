enum Protocol {
  ethereum = "ethereum",
  solana = "solana",
}

enum EthereumNetwork {
  mainnet = "mainnet",
  hoodi = "hoodi",
}

enum SolanaNetwork {
  mainnet = "mainnet",
  devnet = "devnet",
}

export type SolanaCustomWalletConfig = {
  address: string;
  signTransaction: (transaction: string) => Promise<string>;
  signMessage: (message: string) => Promise<string>;
};

type ProtocolToNetworkMap = {
  [Protocol.ethereum]: keyof typeof EthereumNetwork;
  [Protocol.solana]: keyof typeof SolanaNetwork;
};

export type ProtocolToWalletConfigMap = {
  [Protocol.solana]: SolanaCustomWalletConfig;
};

type BaseStakingProps = {
  appId: string;
  protocol: keyof typeof Protocol;
  theme?: "light" | "dark";
};

// type StakingPropsWithWalletEthereum = BaseStakingProps & {
//   protocol: "ethereum";
//   network: ProtocolToNetworkMap[Protocol.ethereum];
//   wallet: CustomWalletConfig;
// };

type StakingPropsWithWalletSolana = BaseStakingProps & {
  protocol: "solana";
  network: ProtocolToNetworkMap[Protocol.solana];
  wallet: ProtocolToWalletConfigMap[Protocol.solana];
};

type StakingPropsWithoutWalletEthereum = BaseStakingProps & {
  protocol: "ethereum";
  network: ProtocolToNetworkMap[Protocol.ethereum];
  wallet?: undefined;
};

type StakingPropsWithoutWalletSolana = BaseStakingProps & {
  protocol: "solana";
  network: ProtocolToNetworkMap[Protocol.solana];
  wallet?: undefined;
};

export type StakingProps =
  // Once we enable custom wallets for Ethereum, we can uncomment this
  // | StakingPropsWithWalletEthereum
  | StakingPropsWithWalletSolana
  | StakingPropsWithoutWalletEthereum
  | StakingPropsWithoutWalletSolana;

export enum PostMessageType {
  FIGMENT_SIGN_MESSAGE = "FIGMENT_SIGN_MESSAGE",
  FIGMENT_SIGN_MESSAGE_RESPONSE = "FIGMENT_SIGN_MESSAGE_RESPONSE",
  FIGMENT_SIGN_MESSAGE_ERROR = "FIGMENT_SIGN_MESSAGE_ERROR",
  FIGMENT_SIGN_TRANSACTION = "FIGMENT_SIGN_TRANSACTION",
  FIGMENT_SIGN_TRANSACTION_RESPONSE = "FIGMENT_SIGN_TRANSACTION_RESPONSE",
  FIGMENT_SIGN_TRANSACTION_ERROR = "FIGMENT_SIGN_TRANSACTION_ERROR",
  FIGMENT_PARENT_READY = "FIGMENT_PARENT_READY",
  FIGMENT_IFRAME_READY = "FIGMENT_IFRAME_READY",
  FIGMENT_UPDATE_WALLET_CONFIG = "FIGMENT_UPDATE_WALLET_CONFIG",
}
