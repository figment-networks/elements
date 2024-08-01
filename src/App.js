import React, { useState } from "react";
import styled from "styled-components";
import { Staking, Dapp } from "figment-elements";
import { Radio } from "antd";
import { GithubOutlined } from "@ant-design/icons";

const options = [
  { label: "Staking Widget Only", value: "staking" },
  { label: "Full Dapp", value: "dapp" },
];

function App() {
  const [value, setValue] = useState("staking");

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
      <Toggle
        options={options}
        onChange={onChange}
        value={value}
        optionType="button"
        buttonStyle="solid"
        size="large"
      />
      {value === "staking" ? (
        <StakingContainer>
          <Staking />
        </StakingContainer>
      ) : (
        <DappContainer>
          <Dapp />
        </DappContainer>
      )}
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
  margin-bottom: 50px;
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
