import { atom } from "jotai";
import { Item } from "./types";
import Loadable from "./loadable";

export const itemsAtom = atom<Loadable<Item>[]>([]);
export const selectedItemAtom = atom<number | null>(null);
export const editingAtom = atom<boolean>(false);
