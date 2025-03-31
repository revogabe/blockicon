import "./index.css";
import { BlockIcon } from "blockicon";

function App() {
  return (
    <>
      <BlockIcon category="network" chain="bitcoin" size="xl" shape="circle" />
      <BlockIcon category="network" chain="ethereum" size="xl" shape="circle" />
      <BlockIcon category="network" chain="solana" size="xl" shape="circle" />
      <BlockIcon category="token" asset="usdc" size="xl" shape="circle" />
    </>
  );
}

export default App;
