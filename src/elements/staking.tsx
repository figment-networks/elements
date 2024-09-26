import * as React from "react";
import { style } from "./style";

type Props = {
  protocol?: string;
  isTestnetMode?: boolean;
};

const Staking: React.FC<Props> = ({
  protocol = "ethereum",
  isTestnetMode = false,
}) => {
  return (
    <iframe
      src={`https://dapp.figment.io/elements/staking/${protocol}?isTestnetMode=${isTestnetMode}`}
      style={style}
    />
  );
};

export default React.memo(Staking);
