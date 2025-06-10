import React from "react";
import { Protocol, Network, WalletDescription } from "../types";
import { ToggleGroup } from "./ToggleGroup";
import { FigmentLogo } from "./icons";

const protocols: Protocol[] = [
  { name: "ETH", id: "ethereum" },
  { name: "SOL", id: "solana" },
  {
    name: "Babylon",
    id: "babylon",
    disabled: true,
    tooltip: "Protocol temporarily disabled",
  },
];

const networksByProtocol: Record<Protocol["id"], Network[]> = {
  ethereum: [
    { name: "Holesky", id: "holesky" },
    { name: "Mainnet", id: "mainnet", disabled: true },
  ],
  solana: [
    { name: "Devnet", id: "devnet" },
    { name: "Mainnet", id: "mainnet", disabled: true },
  ],
  babylon: [
    { name: "Signet", id: "signet" },
    { name: "Mainnet", id: "mainnet", disabled: true },
  ],
};

const walletDescriptions: WalletDescription = {
  ethereum: {
    default: "Uses Web3Modal",
    custom: "With own signing function.",
  },
  solana: {
    default: "Uses Solana Wallet Adapter",
    custom: "With own signing function.",
  },
  babylon: {
    default: "Uses OneKey Wallet",
    custom: "With own signing function.",
  },
} as const;

const themeOptions = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const;

interface SidebarProps {
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
  walletType: "default" | "custom";
  onWalletTypeChange: (type: "default" | "custom") => void;
  selectedProtocol: Protocol;
  onProtocolSelect: (protocol: Protocol) => void;
  selectedNetwork: Network;
  onNetworkSelect: (network: Network) => void;
  theme: "light" | "dark" | "system";
  onThemeChange: (theme: "light" | "dark" | "system") => void;
}

export function Sidebar({
  walletType,
  onWalletTypeChange,
  selectedProtocol,
  onProtocolSelect,
  selectedNetwork,
  onNetworkSelect,
  theme,
  onThemeChange,
}: SidebarProps) {
  const networks = networksByProtocol[selectedProtocol.id];

  const walletOptions = [
    { value: "default", label: "Default" },
    {
      value: "custom",
      label: "Custom",
      disabled: selectedProtocol.id === "ethereum" ? true : false,
      tooltip: "Ethereum custom wallets coming soon",
    },
  ] as const;

  React.useEffect(() => {
    // When protocol changes, select the first non-disabled network
    const defaultNetwork = networks.find((n) => !n.disabled) || networks[0];
    onNetworkSelect(defaultNetwork);
  }, [selectedProtocol.id]);

  return (
    <div className="w-96 h-screen bg-[#e8e8e8] p-6 flex gap-8 flex-col">
      <div className="mb-8">
        <FigmentLogo />
      </div>

      <ToggleGroup
        label="PROTOCOL"
        value={selectedProtocol.id}
        onChange={(id) => {
          const protocol = protocols.find((p) => p.id === id);
          if (protocol) {
            onProtocolSelect(protocol);
            onWalletTypeChange("default");
          }
        }}
        items={protocols.map((p) => ({
          value: p.id,
          label: p.name,
          disabled: p.disabled,
          tooltip: p.tooltip,
        }))}
        variant="horizontal"
      />

      <ToggleGroup
        label="NETWORK"
        value={selectedNetwork.id}
        onChange={(id) => {
          const network = networks.find((n) => n.id === id);
          if (network && !network.disabled) onNetworkSelect(network);
        }}
        items={networks.map((n) => ({
          value: n.id,
          label: n.name,
          disabled: n.disabled,
          tooltip: "Demo uses testnets only",
        }))}
        variant="horizontal"
      />

      <div className="">
        <ToggleGroup
          label="WALLET OPTIONS"
          value={walletType}
          onChange={onWalletTypeChange}
          items={walletOptions}
          variant="horizontal"
        />
        <p className="text-sm italic mt-4 text-[#6F7471] font-inter px-2">
          {walletDescriptions[selectedProtocol.id][walletType]}
        </p>
      </div>

      <div>
        <ToggleGroup
          label="THEME"
          value={theme}
          onChange={onThemeChange}
          items={themeOptions}
          variant="horizontal"
        />
      </div>
    </div>
  );
}
