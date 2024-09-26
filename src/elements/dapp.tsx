import * as React from "react";
import { style } from "./style";

type Props = {
  protocol?: string;
  isTestnetMode?: boolean;
};

const Dapp: React.FC<Props> = ({
  protocol = "ethereum",
  isTestnetMode = false,
}) => {
  return (
    <iframe
      src={`https://dapp.figment.io/elements/dapp/${protocol}?isTestnetMode=${isTestnetMode}`}
      style={style}
    />
  );
};

export default React.memo(Dapp);
