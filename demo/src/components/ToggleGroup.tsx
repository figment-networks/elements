import { cn } from "../utils";
import { Wallet, Code2, TestTubeIcon, GlobeIcon } from "lucide-react";
import { EthereumIcon, SolanaIcon, BitcoinIcon } from "./icons";

interface ToggleGroupProps<T extends string> {
  value: T | null;
  onChange: (value: T) => void;
  items: {
    value: T;
    label: string;
    disabled?: boolean;
  }[];
  label: string;
  variant?: "vertical" | "horizontal";
  showTooltip?: boolean;
}

const getIcon = (value: string) => {
  switch (value) {
    case "default":
      return <Wallet className="w-4 h-4" />;
    case "custom":
      return <Code2 className="w-4 h-4" />;
    case "ethereum":
      return <EthereumIcon className="w-5 h-5" />;
    case "babylon":
      return <BitcoinIcon className="w-5 h-5" />;
    case "solana":
      return <SolanaIcon className="w-5 h-5" />;
    case "mainnet":
      return <GlobeIcon className="w-4 h-4" />;
    case "holesky":
    case "devnet":
    case "signet":
      return <TestTubeIcon className="w-4 h-4 -rotate-45" />;
    default:
      return null;
  }
};

const shouldShowIcon = (value: string) => {
  return [
    "default",
    "custom",
    "ethereum",
    "babylon",
    "solana",
    "mainnet",
    "holesky",
    "devnet",
    "signet",
  ].includes(value);
};

export function ToggleGroup<T extends string>({
  value,
  onChange,
  items,
  label,
  variant = "vertical",
  showTooltip = false,
}: ToggleGroupProps<T>) {
  return (
    <div className="">
      <h2 className="text-sm text-[#3A3D3C] mb-3 font-inter">{label}</h2>
      <div
        className={cn(
          "flex items-center bg-white rounded-full",
          variant === "vertical" && "flex-col items-stretch"
        )}
      >
        {items.map((item) => (
          <div
            key={item.value}
            className="relative group flex-1"
            data-tooltip={
              showTooltip && item.disabled
                ? item.value === "mainnet"
                  ? "Demo uses testnets only"
                  : "Theming coming soon"
                : undefined
            }
          >
            <button
              onClick={() => !item.disabled && onChange(item.value)}
              disabled={item.disabled}
              className={cn(
                "w-full p-2 rounded-full transition-all duration-200 text-base flex items-center justify-center gap-1.5",
                variant === "vertical" && "w-full text-center",
                value === item.value
                  ? "bg-gray-50 text-[#004039] shadow-[0_1px_1px_1.5px_rgba(0,0,0,0.1)]"
                  : "text-[#6E938E] hover:text-[#004039]",
                item.disabled &&
                  "opacity-50 cursor-not-allowed hover:text-[#9DB5B2]",
                shouldShowIcon(item.value) && "text-current"
              )}
            >
              {shouldShowIcon(item.value) && (
                <span
                  className={cn(
                    "inline-flex items-center justify-center w-[20px] h-[20px]",
                    item.value === "default" ||
                      item.value === "custom" ||
                      item.value === "mainnet" ||
                      item.value.includes("net")
                      ? "text-current"
                      : ""
                  )}
                >
                  {getIcon(item.value)}
                </span>
              )}
              <span>{item.label}</span>
            </button>
            {showTooltip && item.disabled && (
              <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded pointer-events-none whitespace-nowrap font-inter">
                {item.value === "mainnet"
                  ? "Demo uses testnets only"
                  : "Theming coming soon"}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-900" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
