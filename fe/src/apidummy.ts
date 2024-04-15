import { Tree, createTree } from "./tree/tree";

export async function loadTree(): Promise<Tree> {
  console.log("start waiting");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const objs = [
    { id: 1, content: "item 1", parentId: null },
    { id: 2, content: "item 2", parentId: 1 },
  ];
  return createTree(objs);
}
