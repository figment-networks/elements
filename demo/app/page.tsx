"use client";

import React, { useState, useEffect } from "react";
import { Radio } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { Transaction } from "@solana/web3.js";
import { Staking } from "@figmentio/elements";

const options = [
  { label: "ETH", value: "staking-eth" },
  { label: "BTC (Babylon)", value: "staking-btc" },
  ...(typeof window !== "undefined" && window?.tomo_btc
    ? [
        {
          label: "BTC (Babylon) - Custom Wallet (Tomo)",
          value: "staking-btc-custom",
        },
      ]
    : []),

  { label: "SOL", value: "staking-sol" },
  ...(typeof window !== "undefined" && window.phantom?.solana
    ? [
        {
          label: "SOL - Custom Wallet (Phantom)",
          value: "staking-sol-custom",
        },
      ]
    : []),
];

export default function Home() {
  const [value, setValue] = useState("staking-eth");
  const [wallet, setWallet] = useState<{
    address: string;
    publicKey: string;
  }>({
    address: "",
    publicKey: "",
  });

  useEffect(() => {
    const fetchWallet = async () => {
      if (value === "staking-btc-custom") {
        const tomo = window.tomo_btc;

        if (!tomo) throw new Error("Failed to get tomo");

        const addresses = await tomo.requestAccounts();
        const publicKey = await tomo.getPublicKey();

        setWallet({
          address: addresses[0],
          publicKey,
        });
      } else if (value === "staking-sol-custom") {
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
  }, [value]);

  const onChange = (e: { target: { value?: string } }) => {
    setValue(e.target.value || "");
  };

  if (!process.env.NEXT_PUBLIC_DAPP_TOKEN) {
    throw new Error("Missing process.env.NEXT_PUBLIC_DAPP_TOKEN");
  }

  return (
    <div className="min-h-screen bg-zinc-200 text-center flex flex-col items-center">
      <h1 className="text-3xl font-semibold pt-8">Figment Elements</h1>
      <div className="text-xl pt-4 pb-8">
        UI components for embeddable staking.{" "}
        <a
          href="https://github.com/figment-networks/elements"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 no-underline"
        >
          View on <GithubOutlined />
        </a>
      </div>
      <p className="mb-5 italic text-gray-600 text-sm">
        Note: this is a demo, so mainnet staking is disabled.
      </p>
      <Radio.Group
        options={options}
        onChange={onChange}
        value={value}
        optionType="button"
        buttonStyle="solid"
        size="large"
        className="mb-5"
      />
      <div className="w-[350px] h-[450px]">
        {value === "staking-eth" && (
          <Staking
            isTestnetMode
            appId={process.env.NEXT_PUBLIC_DAPP_TOKEN}
            protocol="ethereum"
          />
        )}
        {value === "staking-btc" && (
          <Staking
            isTestnetMode
            appId={process.env.NEXT_PUBLIC_DAPP_TOKEN}
            protocol="babylon"
          />
        )}
        {value === "staking-btc-custom" && wallet.address && (
          <Staking
            isTestnetMode
            appId={process.env.NEXT_PUBLIC_DAPP_TOKEN}
            protocol="babylon"
            network="signet"
            wallet={{
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
            }}
          />
        )}
        {value === "staking-sol" && (
          <>
            <p className="mb-5 italic text-gray-600 text-sm">
              Note: Phantom doesn&apos;t work in iframes (by design).
            </p>
            <Staking
              isTestnetMode
              appId={process.env.NEXT_PUBLIC_DAPP_TOKEN}
              protocol="solana"
            />
          </>
        )}
        {value === "staking-sol-custom" && wallet.address && (
          <Staking
            isTestnetMode
            appId={process.env.NEXT_PUBLIC_DAPP_TOKEN}
            protocol="solana"
            network="devnet"
            wallet={{
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
            }}
          />
        )}
      </div>
    </div>
  );
}
