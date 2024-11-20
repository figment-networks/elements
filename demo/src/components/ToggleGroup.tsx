import { cn } from "../utils";

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
      <h2 className="text-base text-[#6F7471] mb-3 font-inter">{label}</h2>
      <div
        className={cn(
          "flex items-center bg-white rounded-full",
          variant === "vertical" ? "flex-col items-stretch" : ""
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
                "w-full px-2 py-3 rounded-full transition-all duration-200 text-base font-inter",
                variant === "vertical" ? "w-full text-center" : "",
                value === item.value
                  ? "bg-gray-50 text-[#6E938E] shadow-sm before:absolute before:inset-0 before:rounded-full before:border before:border-[#9DB5B2]/50"
                  : "text-[#6E938E] hover:text-[#004039]",
                item.disabled
                  ? "opacity-50 cursor-not-allowed hover:text-[#9DB5B2]"
                  : ""
              )}
            >
              {item.label}
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
