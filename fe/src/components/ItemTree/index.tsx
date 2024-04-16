import { useAtomValue } from "jotai";
import { treeAtom } from "../../atoms";
import ItemSubtree from "./ItemSubTree";
import { useEffect, useState } from "react";

function ItemTree(): JSX.Element {
  const tree = useAtomValue(treeAtom).getOrThrow();
  const root = tree.root;
  const children = root.children;
  const [hoge, setHoge] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (process.env.NODE_ENV === "development") {
        console.log(e.key, e.keyCode);
      }
      switch (e.key) {
        case "j":
          tree.selectNext();
          setHoge((v) => v + 1);
          break;
        case "k":
          tree.selectPrev();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [tree]);

  return (
    <ul>
      {children.map((c) => (
        <ItemSubtree key={c.id} root={c} />
      ))}
      <div>{JSON.stringify(tree)}</div>
      <div>{hoge}</div>
    </ul>
  );
}

export default ItemTree;
