import React, { useEffect, useRef } from "react";
import { style } from "./style";
import { PostMessageType, StakingProps } from "./types";

const Staking: React.FC<StakingProps> = ({
  protocol = "ethereum",
  network,
  appId,
  wallet,
  isTestnetMode = false,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      // Ensure the message is from the expected IFRAME origin
      if (
        !["http://localhost:3098", "https://dapp.figment.io"].includes(
          event.origin
        )
      )
        return;

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

  const sendMessageToIframe = (message: any) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        message,
        "https://dapp.figment.io"
      );
    }
  };

  // This is the wallet config that the iframe will use
  const iframeWalletConfig = wallet
    ? JSON.stringify({
        address: wallet.address,
        publicKey: wallet.publicKey,
        network,
      })
    : undefined;

  return (
    <iframe
      src={`https://dapp.figment.io/elements/staking/${protocol}?isTestnetMode=${isTestnetMode}&isCustomWallet=${!!wallet}&dappToken=${appId}`}
      style={style}
      ref={iframeRef}
      onLoad={() => {
        setTimeout(
          () =>
            sendMessageToIframe({
              type: PostMessageType.FIGMENT_PARENT_READY,
              walletConfig: iframeWalletConfig,
            }),
          1000
        );
      }}
    />
  );
};

export default React.memo(Staking);
