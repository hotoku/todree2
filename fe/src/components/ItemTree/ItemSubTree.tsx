import { ValueNode } from "../../useTree/Tree/impl";

type ItemSubtreeProps = {
  root: ValueNode;
};

function ItemSubtree({ root }: ItemSubtreeProps): JSX.Element {
  const children = root.children;
  return (
    <li key={root.id}>
      {root.content}
      {process.env.NODE_ENV === "development" ? (
        <span> | open={JSON.stringify(root.open)}</span>
      ) : null}

      <ul>
        {children.map((c) => (
          <ItemSubtree key={c.id} root={c} />
        ))}
      </ul>
    </li>
  );
}

export default ItemSubtree;
