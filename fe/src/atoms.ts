import { atom } from "jotai";
import Loadable from "./loadable";
import { Tree } from "./tree/tree";

export const treeAtom = atom<Loadable<Tree>>(
  new Loadable(Promise.reject(new Error("not loaded")))
);
