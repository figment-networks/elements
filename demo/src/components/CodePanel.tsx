import React from "react";
import { ChevronRight, Copy, Check, Github, BookOpen } from "lucide-react";
import { cn } from "../utils";
import { Protocol, Network } from "../types";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import { useWindowSize } from "../hooks/useWindowSize";

interface CodePanelProps {
  selectedProtocol: Protocol;
  selectedNetwork: Network;
  walletType: string;
  theme: "light" | "dark" | "system";
}

export function CodePanel({
  selectedProtocol,
  selectedNetwork,
  walletType,
  theme,
}: CodePanelProps) {
  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = React.useState(width >= 1200);

  React.useEffect(() => {
    setIsOpen(width >= 1200);
  }, [width]);

  const [isCopied, setIsCopied] = React.useState(false);

  const codeSnippet = `import { Staking } from '@figment/elements';

return (
  <Staking
    appId="d500...ece3"
    protocol="${selectedProtocol.id}"
    network="${selectedNetwork.id}"${
    walletType === "custom" ? "\n  wallet: <CustomWalletConfig>" : ""
  }${theme === "system" ? "" : `\n    theme="${theme}"`}
  />
)`;

  React.useEffect(() => {
    Prism.highlightAll();
  }, [codeSnippet]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative flex h-full">
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full w-10 h-10 shadow-sm hover:bg-gray-50 transition-colors z-10 group flex items-center justify-center"
          aria-label={isOpen ? "Hide code panel" : "Show code panel"}
        >
          <ChevronRight
            className={cn(
              "w-5 h-5 transition-transform duration-200 text-gray-600 group-hover:text-gray-800",
              isOpen ? "rotate-0" : "rotate-180"
            )}
          />
        </button>
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(100%+1.5rem)] px-2 py-1 bg-gray-900 text-white text-xs rounded pointer-events-none whitespace-nowrap font-inter">
          {isOpen ? "Hide Code" : "Show Code"}
          <div className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
        </div>
      </div>
      <div
        className={cn(
          "transition-[width] duration-300 ease-in-out overflow-hidden flex-shrink-0",
          isOpen ? "w-[480px]" : "w-0"
        )}
      >
        <div className="w-[480px] bg-[#F9F9F9] h-full flex-shrink-0">
          <div className="p-6">
            <h2 className="text-sm text-[#6F7471] mb-3 font-inter">
              CODE SNIPPET
            </h2>
            <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <button
                  onClick={handleCopy}
                  className="absolute right-2 top-2 p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                  aria-label="Copy code"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <pre className="p-6 text-gray-100 font-mono text-sm overflow-x-auto">
                  <code
                    className="language-typescript"
                    style={{ fontSize: "0.875rem", lineHeight: "1.25rem" }}
                  >
                    {codeSnippet}
                  </code>
                </pre>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-6">
              <a
                href="https://github.com/figment-networks/elements"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#6F7471] hover:text-[#004039] transition-colors font-inter text-base group"
              >
                <Github className="w-4 h-4" />
                <span className="group-hover:underline">
                  View source code on GitHub
                </span>
              </a>
              <a
                href="https://docs.figment.io/docs/elements"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#6F7471] hover:text-[#004039] transition-colors font-inter text-base group"
              >
                <BookOpen className="w-4 h-4" />
                <span className="group-hover:underline">
                  Read the documentation
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
