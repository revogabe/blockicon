import "./App.css";
import { BlockIcon } from "./components/blockicon";

function App() {
  return (
    <>
      <BlockIcon category="networks" asset="bitcoin" size="xl" />
      <BlockIcon category="networks" asset="ethereum" size="xl" />
      <BlockIcon category="networks" asset="solana" size="xl" />
      <BlockIcon category="tokens" asset="usdc" size="xl" />
    </>
  );
}

export default App;
