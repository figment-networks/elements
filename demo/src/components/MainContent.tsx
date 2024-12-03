import { useEffect, useState } from "react";
import { Staking } from "@figmentio/elements";
import { Transaction } from "@solana/web3.js";
import { Buffer } from "buffer";
import { Protocol, Network } from "../types";
import { CodePanel } from "./CodePanel";

interface MainContentProps {
  primaryColor: string;
  secondaryColor: string;
  walletType: "default" | "custom";
  selectedProtocol: Protocol;
  selectedNetwork: Network;
}

export function MainContent({
  walletType,
  selectedProtocol,
  selectedNetwork,
}: MainContentProps) {
  const [wallet, setWallet] = useState<{
    address: string;
    publicKey: string;
  }>({
    address: "",
    publicKey: "",
  });

  const customWalletConfigMap = {
    solana: {
      address: wallet.address,
      signMessage: async (message: string) => {
        const provider = window?.phantom?.solana;

        if (!provider) throw new Error("Failed to get provider");

        const encodedMessage = new TextEncoder().encode(message);
        const signedMessage = await provider.signMessage(
          encodedMessage,
          "utf8"
        );

        const signature = Buffer.from(signedMessage.signature).toString(
          "base64"
        );

        if (!signature) throw new Error("Failed to sign message");

        return signature;
      },
      signTransaction: async (transaction: string) => {
        const provider = window?.phantom?.solana;

        if (!provider) throw new Error("Failed to get provider");

        const tx = Transaction.from(Buffer.from(transaction, "hex"));

        const { signature } = await provider.signAndSendTransaction(tx);

        if (!signature) throw new Error("Failed to sign transaction");

        return signature;
      },
    },
    babylon: {
      address: wallet.address,
      publicKey: wallet?.publicKey,
      signMessage: async (message: string) => {
        const signature = await window?.tomo_btc?.signMessage(
          message,
          "bip322-simple"
        );
        if (!signature) throw new Error("Failed to sign message");
        return signature;
      },
      signTransaction: async (transaction: string) => {
        const signedTx = await window?.tomo_btc?.signPsbt(transaction);
        if (!signedTx) throw new Error("Failed to sign transaction");
        return signedTx;
      },
    },
  };

  useEffect(() => {
    const fetchWallet = async () => {
      if (walletType === "custom" && selectedProtocol.id === "babylon") {
        const tomo = window.tomo_btc;

        if (!tomo) throw new Error("Failed to get tomo");

        const addresses = await tomo.requestAccounts();
        const publicKey = await tomo.getPublicKey();

        setWallet({
          address: addresses[0],
          publicKey,
        });
      } else if (walletType === "custom" && selectedProtocol.id === "solana") {
        const phantom = window.phantom?.solana;

        if (!phantom) throw new Error("Failed to get phantom");

        const resp = await phantom.connect();

        setWallet({
          address: resp.publicKey.toString(),
          publicKey: "",
        });
      } else {
        setWallet({
          address: "",
          publicKey: "",
        });
      }
    };

    fetchWallet();
  }, [walletType, selectedProtocol.id]);

  return (
    <div className="flex-1">
      <div className="flex h-screen">
        <div className="flex-1 p-8 bg-[#fff] overflow-y-auto">
          <div className="max-w-2xl mx-auto h-full flex flex-col">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-semibold mb-2">Figment Elements</h1>
              <p className="text-xl text-gray-600 font-inter">
                UI components for embeddable staking
              </p>
            </div>
            <div className="my-8 mx-auto w-[350px] h-[450px] overflow-hidden">
              {(walletType === "custom" ? wallet.address : true) && (
                <Staking
                  appId={import.meta.env.VITE_DAPP_TOKEN}
                  protocol={selectedProtocol.id as "solana"}
                  network={selectedNetwork.id as "mainnet"}
                  wallet={
                    walletType === "custom"
                      ? customWalletConfigMap[
                          selectedProtocol.id as keyof typeof customWalletConfigMap
                        ]
                      : undefined
                  }
                />
              )}
            </div>
          </div>
        </div>

        <CodePanel
          walletType={walletType}
          selectedProtocol={selectedProtocol}
          selectedNetwork={selectedNetwork}
        />
      </div>
    </div>
  );
}
