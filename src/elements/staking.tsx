import React, { useEffect, useRef, useState } from "react";
import { style } from "./style";
import {
  BabylonCustomWalletConfig,
  PostMessageType,
  StakingProps,
} from "./types";

const Staking: React.FC<StakingProps> = ({
  protocol,
  network,
  appId,
  wallet,
  theme,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeReady, setIsIframeReady] = useState(false);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      // Ensure the message is from the expected IFRAME origin
      if (
        !["http://localhost:3098", "https://dapp.figment.io"].includes(
          event.origin
        )
      )
        return;

      if (event.data.type === PostMessageType.FIGMENT_IFRAME_READY) {
        setIsIframeReady(true);
      }

      if (
        event.data.type === PostMessageType.FIGMENT_SIGN_MESSAGE &&
        wallet?.signMessage
      ) {
        const { message } = event.data;

        wallet
          .signMessage(message)
          .then((signature) => {
            sendMessageToIframe({
              type: PostMessageType.FIGMENT_SIGN_MESSAGE_RESPONSE,
              signature,
            });
          })
          .catch((error) => {
            sendMessageToIframe({
              type: PostMessageType.FIGMENT_SIGN_MESSAGE_ERROR,
              error: error.message,
            });
          });
      }

      if (
        event.data.type === PostMessageType.FIGMENT_SIGN_TRANSACTION &&
        wallet?.signTransaction
      ) {
        const { transaction } = event.data;

        wallet
          .signTransaction(transaction)
          .then((signature) => {
            sendMessageToIframe({
              type: PostMessageType.FIGMENT_SIGN_TRANSACTION_RESPONSE,
              signature,
            });
          })
          .catch((error) => {
            sendMessageToIframe({
              type: PostMessageType.FIGMENT_SIGN_TRANSACTION_ERROR,
              error: error.message,
            });
          });
      }

      // Additional specific message handling here
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (isIframeReady && wallet) {
      // This is the wallet config that the iframe will use
      const iframeWalletConfig = JSON.stringify({
        address: wallet.address,
        network,
        ...(protocol === "babylon"
          ? {
              publicKey: (wallet as BabylonCustomWalletConfig).publicKey,
            }
          : {}),
      });

      sendMessageToIframe({
        type: PostMessageType.FIGMENT_UPDATE_WALLET_CONFIG,
        walletConfig: iframeWalletConfig,
      });
    }
  }, [
    isIframeReady,
    wallet,
    wallet?.address,
    (wallet as BabylonCustomWalletConfig)?.publicKey,
    network,
    protocol,
  ]);

  const sendMessageToIframe = (message: any) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        message,
        "https://dapp.figment.io"
      );
    }
  };

  const src = new URL(
    `https://dapp.figment.io/${appId}/stake/${protocol}/${network}?isCustomWallet=${!!wallet}`
  );

  if (theme) {
    src.searchParams.set("theme", theme);
  }

  return (
    <iframe
      src={src.toString()}
      style={style}
      ref={iframeRef}
      onLoad={() => {
        setTimeout(
          () =>
            sendMessageToIframe({
              type: PostMessageType.FIGMENT_PARENT_READY,
            }),
          1000
        );
      }}
    />
  );
};

export default React.memo(Staking);
