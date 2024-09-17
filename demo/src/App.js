import React, { useState } from "react";
import styled from "styled-components";
import { Staking, Dapp } from "figment-elements";
import { Radio } from "antd";
import { GithubOutlined } from "@ant-design/icons";

const options = [
  { label: "ETH", value: "staking-eth" },
  { label: "BTC (Babylon)", value: "staking-btc" },
  // { label: "Full Dapp (ETH)", value: "dapp" },
];

function App() {
  const [value, setValue] = useState("staking-eth");

  const onChange = ({ target: { value } }) => {
    setValue(value);
  };

  return (
    <Container>
      <Title>Figment Elements</Title>
      <Subtitle>
        {`UI components for embeddable staking. `}
        <Link
          href="https://github.com/figment-networks/elements"
          target="_blank"
        >
          View on <GithubOutlined />
        </Link>
      </Subtitle>
      <MainnetNote>
        Note: this is a demo, so mainnet staking is disabled.
      </MainnetNote>
      <Toggle
        options={options}
        onChange={onChange}
        value={value}
        optionType="button"
        buttonStyle="solid"
        size="large"
      />
      {(() => {
        switch (value) {
          case "staking-eth":
            return (
              <StakingContainer>
                <Staking isTestnetMode />
              </StakingContainer>
            );
          case "staking-btc":
            return (
              <StakingContainer>
                <Staking protocol="babylon" isTestnetMode />
              </StakingContainer>
            );
          // case "dapp":
          //   return (
          //     <DappContainer>
          //       <Dapp />
          //     </DappContainer>
          //   );
          default:
            return null;
        }
      })()}
    </Container>
  );
}

export default App;

const Container = styled.div`
  min-height: 100vh;
  background-color: #eee;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  padding-top: 30px;
`;

const Subtitle = styled.div`
  font-size: 20px;
  padding: 30px 0;
`;

const Link = styled.a`
  color: #1677ff;
  text-decoration: none;
`;

const Toggle = styled(Radio.Group)`
  margin-bottom: 20px;
`;

const MainnetNote = styled.p`
  margin-bottom: 20px;
  font-style: italic;
  color: #555;
  font-size: 12px;
`;

const StakingContainer = styled.div`
  width: 350px;
  height: 450px;
  margin: 0 auto;
`;

const DappContainer = styled.div`
  width: 700px;
  height: 800px;
  margin: 0 auto;
`;
