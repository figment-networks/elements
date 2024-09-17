# Figment Elements - UI components for embeddable staking

[figment-elements.vercel.app/](https://figment-elements.vercel.app/)

We build Figment Elements to help you integrate staking in a matter of minutes, without the need for API integration or UI work.

<img width="600" alt="Screenshot 2024-07-23 at 16 20 20" src="https://github.com/user-attachments/assets/7ef09ed5-6d68-4fe4-bb06-d6c2f32366a0">

## Features
- ETH full validators staking (multiples of 32 ETH)
- WalletConnect Web3Modal
- Staking widget or full dapp (incl. activity, positions, rewards)

## Coming soon
- More protocols (Solana, Babylon, EIGEN)
- Custom wallet integration
- EigenLayer
- Customer styling

# Usage

```
yarn add figment-elements
```

### Using React

```jsx
import { Staking, Dapp } from "figment-elements";

...

<div /* Add any custom styling necessary here */>
  <Staking />
</div>

...

<div /* Add any custom styling necessary here */>
  <Dapp />
</div>
```

## Using plain JavaScript

```jsx
React.useEffect(() => {
  window.FIGMENT_ELEMENTS_CONFIG = {
    elements: [
      {
        containerSelector: "#figment-elements-staking-container",
        element: "STAKING",
      },
      {
        containerSelector: "#figment-elements-dapp-container",
        element: "DAPP",
      },
    ],
  };

  const script = document.createElement("script");
  script.src = "https://dapp.figment.io/elements";
  script.type = "text/javascript";

  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);

...

<div
  id="figment-elements-staking-container"
  /* Add any custom styling necessary here */
/>

...

<div
  id="figment-elements-dapp-container"
  /* Add any custom styling necessary here */
/>
```

# Run

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```
yarn
yarn start
```
