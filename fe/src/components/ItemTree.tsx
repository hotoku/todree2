import { useAtomValue } from "jotai";
import { treeAtom } from "../atoms";
import { ValueNode } from "../tree";

export function ItemTree(): JSX.Element {
  const tree = useAtomValue(treeAtom).getOrThrow();
  const root = tree.root;
  const children = root.children;
  return (
    <ul>
      {children.map((c) => (
        <ItemSubtree root={c} />
      ))}
    </ul>
  );
}

type ItemSubtreeProps = {
  root: ValueNode;
};

function ItemSubtree({ root }: ItemSubtreeProps): JSX.Element {
  const children = root.children;
  return (
    <li key={root.id}>
      {root.content}
      <ul>
        {children.map((c) => (
          <ItemSubtree root={c} />
        ))}
      </ul>
    </li>
  );
}
