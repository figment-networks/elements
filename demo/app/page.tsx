"use client";

import { useState } from "react";
import { Radio } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { Staking } from "@figmentio/elements";

const options = [
  { label: "ETH", value: "staking-eth" },
  { label: "BTC (Babylon)", value: "staking-btc" },
];

export default function Home() {
  const [value, setValue] = useState("staking-eth");

  const onChange = (e: { target: { value?: string } }) => {
    setValue(e.target.value || "");
  };

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
        {value === "staking-eth" && <Staking isTestnetMode />}
        {value === "staking-btc" && (
          <Staking protocol="babylon" isTestnetMode />
        )}
      </div>
    </div>
  );
}
