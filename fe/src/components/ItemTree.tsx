import { useAtomValue } from "jotai";
import { treeAtom } from "../atoms";

export function ItemTree(): JSX.Element {
  const tree = useAtomValue(treeAtom).getOrThrow();
  return <span>{JSON.stringify(tree)}</span>;
}
