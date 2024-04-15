export class Node {
  open: boolean;
  children: ValueNode[];
  constructor(open: boolean) {
    this.open = open;
    this.children = [];
  }
}

export class RootNode extends Node {}

export class ValueNode extends Node {
  id: number;
  content: string;
  constructor(id: number, open: boolean, content: string) {
    super(open);
    this.id = id;
    this.content = content;
  }
}

export class Tree {
  root: RootNode;
  constructor(root: RootNode) {
    this.root = root;
  }
}

export function createTree(
  objs: { id: number; content: string; parentId: number | null }[]
): Tree {
  const nodes: ValueNode[] = objs.map(
    (obj) => new ValueNode(obj.id, false, obj.content)
  );
  const find = (id: number) => nodes.filter((node) => node.id === id)[0];
  const root = new RootNode(true);
  for (let i = 0; i < nodes.length; i++) {
    const child = objs[i];
    const parent = child.parentId ? find(child.parentId) : root;
    parent.children.push(nodes[i]);
  }
  return new Tree(root);
}
