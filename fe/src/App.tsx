import { useAtom } from "jotai";
import "./App.css";
import Items from "./components/Items";
import { treeAtom } from "./atoms";

function App() {
  const tree = useAtom(treeAtom);

  return (
    <>
      <h1>todree</h1>
      {process.env.NODE_ENV === "development" ? <div>debugging</div> : null}
      <ItemTree />
    </>
  );
}

export default App;
