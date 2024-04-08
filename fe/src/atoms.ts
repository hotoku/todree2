import { atom } from "jotai";
import { Items } from "./types";

export const itemsAtom = atom<Items>([]);
export const selectedItemAtom = atom<number | null>(null);
export const editingAtom = atom<boolean>(false);
