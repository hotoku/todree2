import { useSetAtom } from "jotai";
import "./App.css";
import { ItemTree } from "./components/ItemTree";
import { Suspense, useEffect, useState } from "react";
import { treeAtom } from "./atoms";
import { loadTree } from "./apidummy";
import Loadable from "./loadable";

function App() {
  const setTree = useSetAtom(treeAtom);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loading) return;
    setTree(new Loadable(loadTree()));
    setLoading(true);
  }, [loading, setTree]);
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
