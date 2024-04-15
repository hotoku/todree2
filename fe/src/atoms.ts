import { atom } from "jotai";
import Loadable from "./loadable";
import { Tree, createTree } from "./tree/tree";

export const treeAtom = atom<Loadable<Tree>>(
  new Loadable(
    new Promise<Tree>((resolve) => {
      setTimeout(() => resolve(createTree([])), 3000);
    })
  )
);
