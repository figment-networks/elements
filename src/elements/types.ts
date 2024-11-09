enum Protocol {
  ethereum = "ethereum",
  babylon = "babylon",
  solana = "solana",
}

enum EthereumNetwork {
  mainnet = "mainnet",
  holesky = "holesky",
}

enum BabylonNetwork {
  mainnet = "mainnet",
  signet = "signet",
}

enum SolanaNetwork {
  mainnet = "mainnet",
  devnet = "devnet",
}

export type CustomWalletConfig = {
  address: string;
  publicKey: string;
  signTransaction: (transaction: string) => Promise<string>;
  signMessage: (message: string) => Promise<string>;
};

type ProtocolToNetworkMap = {
  [Protocol.ethereum]: keyof typeof EthereumNetwork;
  [Protocol.babylon]: keyof typeof BabylonNetwork;
  [Protocol.solana]: keyof typeof SolanaNetwork;
};

type BaseStakingProps = {
  appId: string;
  protocol: keyof typeof Protocol;
  isTestnetMode?: boolean;
};

type StakingPropsWithWalletEthereum = BaseStakingProps & {
  protocol: "ethereum";
  network: ProtocolToNetworkMap[Protocol.ethereum];
  wallet: CustomWalletConfig;
};

type StakingPropsWithWalletBabylon = BaseStakingProps & {
  protocol: "babylon";
  network: ProtocolToNetworkMap[Protocol.babylon];
  wallet: CustomWalletConfig;
};

type StakingPropsWithWalletSolana = BaseStakingProps & {
  protocol: "solana";
  network: ProtocolToNetworkMap[Protocol.solana];
  wallet: CustomWalletConfig;
};

type StakingPropsWithoutWalletEthereum = BaseStakingProps & {
  protocol: "ethereum";
  network?: ProtocolToNetworkMap[Protocol.ethereum];
  wallet?: undefined;
};

type StakingPropsWithoutWalletBabylon = BaseStakingProps & {
  protocol: "babylon";
  network?: ProtocolToNetworkMap[Protocol.babylon];
  wallet?: undefined;
};

type StakingPropsWithoutWalletSolana = BaseStakingProps & {
  protocol: "solana";
  network?: ProtocolToNetworkMap[Protocol.solana];
  wallet?: undefined;
};

export type StakingProps =
  | StakingPropsWithWalletEthereum
  | StakingPropsWithWalletBabylon
  | StakingPropsWithWalletSolana
  | StakingPropsWithoutWalletEthereum
  | StakingPropsWithoutWalletBabylon
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
}
