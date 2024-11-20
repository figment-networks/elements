import React from "react";
import { Protocol, Network } from "../types";
import { ToggleGroup } from "./ToggleGroup";
import { FigmentLogo } from "./icons";

const protocols: Protocol[] = [
  { name: "ETH", id: "ethereum" },
  { name: "SOL", id: "solana" },
  { name: "BTC", id: "babylon" },
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

const walletDescriptions = {
  default: "WalletConnect, Metamask, Ledger Live, and more.",
  custom: "Provide your own signing function.",
} as const;

const themeOptions = [
  { value: "figment", label: "Figment", disabled: true },
  { value: "basic", label: "Basic", disabled: true },
  { value: "protocol", label: "Protocol", disabled: true },
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
}

export function Sidebar({
  walletType,
  onWalletTypeChange,
  selectedProtocol,
  onProtocolSelect,
  selectedNetwork,
  onNetworkSelect,
}: SidebarProps) {
  const networks = networksByProtocol[selectedProtocol.id];

  const walletOptions = [
    { value: "default", label: "Default" },
    {
      value: "custom",
      label: "Custom",
      disabled: true,
    },
  ] as const;

  React.useEffect(() => {
    // When protocol changes, select the first non-disabled network
    const defaultNetwork = networks.find((n) => !n.disabled) || networks[0];
    onNetworkSelect(defaultNetwork);
  }, [selectedProtocol.id]);

  return (
    <div className="w-96 h-screen bg-white p-6 flex gap-8 flex-col">
      <div className="mb-0">
        <FigmentLogo />
      </div>

      <ToggleGroup
        label="PROTOCOL"
        value={selectedProtocol.id}
        onChange={(id) => {
          const protocol = protocols.find((p) => p.id === id);
          if (protocol) onProtocolSelect(protocol);
        }}
        items={protocols.map((p) => ({
          value: p.id,
          label: p.name,
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
        }))}
        variant="horizontal"
        showTooltip={true}
      />

      <div className="">
        <ToggleGroup
          label="WALLET OPTIONS"
          value={walletType}
          onChange={onWalletTypeChange}
          items={walletOptions}
          variant="horizontal"
          showTooltip={true}
        />
        <p className="text-sm text-center italic mt-4 text-[#6F7471] font-inter px-2">
          {walletDescriptions[walletType]}
        </p>
      </div>

      <div>
        <h2 className="text-sm text-[#3A3D3C] mb-2 font-inter">THEME</h2>
        <ToggleGroup
          label=""
          value="figment"
          onChange={() => {}}
          items={themeOptions}
          variant="horizontal"
          showTooltip={true}
        />
      </div>
    </div>
  );
}
