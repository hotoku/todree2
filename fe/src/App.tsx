import { Suspense, useEffect, useState } from "react";
import "./App.css";
import ItemTree from "./components/ItemTree";
import { loadTree } from "./api";
import useTree from "./useTree";
import { treeAtom } from "./atoms";
import { useSetAtom } from "jotai";
import Loadable from "./loadable";

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
        loadTree().then((t) => {
          setLoading("loaded");
          return t;
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
