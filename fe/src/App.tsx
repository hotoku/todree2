import { useSetAtom } from "jotai";
import "./App.css";
import { ItemTree } from "./components/ItemTree";
import { Suspense, useEffect, useState } from "react";
import { treeAtom } from "./atoms";
import Loadable from "./loadable";
import { loadTree } from "./api";

function App() {
  const setTree = useSetAtom(treeAtom);
  const [loading, setLoading] = useState<"before" | "loading" | "loaded">(
    "before"
  );
  useEffect(() => {
    if (loading !== "before") return;
    setLoading("loading");
    setTree(
      new Loadable(
        loadTree().then((tree) => {
          setLoading("loaded");
          return tree;
        })
      )
    );
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
