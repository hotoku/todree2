import { Suspense, useEffect } from "react";
import "./App.css";
import ItemTree from "./components/ItemTree";
import { loadTree } from "./api";
import useTree from "./useTree";

function App() {
  const { setTree } = useTree();
  useEffect(() => {
    setTree(loadTree());
  }, [setTree]);
  return (
    <>
      <h1>todree</h1>
      {process.env.NODE_ENV === "development" ? <div>debugging</div> : null}
      <Suspense fallback={<div>Loading...</div>}>
        <ItemTree />
      </Suspense>
    </>
  );
}

export default App;
