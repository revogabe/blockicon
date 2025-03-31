import "./index.css";
import { BlockIcon } from "blockicon";

function App() {
  return (
    <>
      <BlockIcon category="network" chain="bitcoin" size="xl" />
      <BlockIcon category="network" chain="ethereum" size="xl" />
      <BlockIcon category="network" chain="solana" size="xl" />
      <BlockIcon category="token" asset="usdc" size="xl" />
    </>
  );
}

export default App;
