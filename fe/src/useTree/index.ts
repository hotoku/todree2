import { useAtom } from "jotai";
import { treeAtom } from "../atoms";
import Loadable from "../loadable";
import { Tree } from "./Tree";
import { useState } from "react";

function useTree() {
  const [treeLodable, setTreeLoadable] = useAtom(treeAtom);
  const [loading, setLoading] = useState<"before" | "loading" | "loaded">(
    "before"
  );

  const getTree = () => treeLodable.getOrThrow();
  const setTree = (tree: Promise<Tree>) =>
    setTreeLoadable(
      new Loadable(
        new Promise((resolve) => {
          setLoading("loading");
          tree.then((tree) => {
            setLoading("loaded");
            resolve(tree);
          });
        })
      )
    );

  return { getTree, setTree, loading };
}

export default useTree;
