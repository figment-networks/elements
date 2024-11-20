import React from "react";
import { Sidebar } from "./components/Sidebar";
import { MainContent } from "./components/MainContent";
import { Protocol, Network } from "./types";

function App() {
  const [primaryColor, setPrimaryColor] = React.useState("#004039");
  const [secondaryColor, setSecondaryColor] = React.useState("#10B981");
  const [walletType, setWalletType] = React.useState<"default" | "custom">(
    "default"
  );
  const [selectedProtocol, setSelectedProtocol] = React.useState<Protocol>({
    name: "ETH",
    id: "ethereum",
  });
  const [selectedNetwork, setSelectedNetwork] = React.useState<Network>({
    name: "Mainnet",
    id: "mainnet",
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        onPrimaryColorChange={setPrimaryColor}
        onSecondaryColorChange={setSecondaryColor}
        walletType={walletType}
        onWalletTypeChange={setWalletType}
        selectedProtocol={selectedProtocol}
        onProtocolSelect={setSelectedProtocol}
        selectedNetwork={selectedNetwork}
        onNetworkSelect={setSelectedNetwork}
      />
      <MainContent
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        walletType={walletType}
        selectedProtocol={selectedProtocol}
        selectedNetwork={selectedNetwork}
      />
    </div>
  );
}

export default App;
