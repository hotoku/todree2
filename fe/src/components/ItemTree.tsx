import { useAtom, useAtomValue } from "jotai";
import { treeAtom } from "../atoms";

function ItemTree(): JSX.Element {
  const treeLoadable = useAtomValue(treeAtom);
  const tree = treeLoadable.getOrThrow();
  return <>{tree.root.children.map(node=>node.content))}</>;
}
