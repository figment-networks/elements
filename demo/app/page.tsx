"use client";

import { useState } from "react";
import { Radio } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { Staking } from "@figmentio/elements";

const options = [
  { label: "ETH", value: "staking-eth" },
  { label: "BTC (Babylon)", value: "staking-btc" },
  // {
  //   label: "BTC (Babylon) - Custom Wallet (Tomo)",
  //   value: "staking-btc-custom",
  // },
];

export default function Home() {
  const [value, setValue] = useState("staking-eth");

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
        {value === "staking-btc-custom" && (
          <Staking
            isTestnetMode
            appId={process.env.NEXT_PUBLIC_DAPP_TOKEN}
            protocol="babylon"
            network="signet"
            wallet={{
              address:
                "tb1puj9ah6qt2anajsw7jg68rdlcxx327kfeen4ajgp78knkskk23rdsmmdy8t",
              publicKey:
                "020e3169a562edff609fff553c1861ed11751756f49ef78600f5f0821a023b8139",
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
      </div>
    </div>
  );
}
