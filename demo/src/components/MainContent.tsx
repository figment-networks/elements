import { useEffect, useState } from "react";
import { Staking } from "@figmentio/elements";
import { Transaction } from "@solana/web3.js";
import Solflare from "@solflare-wallet/sdk";
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

  const [solFlareWallet] = useState(new Solflare());

  const customWalletConfigMap = {
    solana: {
      address: wallet.address,
      signMessage: async (message: string) => {
        const solflare = window?.solflare;

        if (!solflare) throw new Error("Failed to get Solflare");

        const encodedMessage = new TextEncoder().encode(message);
        const { signature } = await solflare.signMessage(encodedMessage);

        const signatureBase64 = Buffer.from(signature).toString("base64");

        if (!signatureBase64) throw new Error("Failed to sign message");

        return signatureBase64;
      },
      signTransaction: async (payload: string) => {
        try {
          if (!solFlareWallet) throw new Error("Failed to get Solflare");

          const tx = Transaction.from(Buffer.from(payload, "hex"));

          const txSignature: string =
            await solFlareWallet.signAndSendTransaction(tx);

          if (!txSignature) throw new Error("Failed to sign transaction");

          return txSignature || "";
        } catch (error) {
          console.error(error);
          throw error;
        }
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
        if (!solFlareWallet) throw new Error("Failed to get Solflare");

        await solFlareWallet.connect();

        if (!solFlareWallet.publicKey) {
          throw new Error("Failed to connect to Solflare");
        }

        setWallet({
          address: solFlareWallet.publicKey.toString(),
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
        <div className="flex-1 p-8 bg-white overflow-y-auto">
          <div className="max-w-2xl mx-auto h-full flex flex-col">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-semibold mb-2">Figment Elements</h1>
              <p className="text-xl text-gray-600 font-inter">
                UI components for embeddable staking
              </p>
            </div>
            <div className="mx-auto w-[350px] h-[450px] overflow-hidden">
              {(walletType === "custom" ? wallet.address : true) && (
                <Staking
                  isTestnetMode
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
