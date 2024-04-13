import { components } from "./schema";

export type ItemContent = components["schemas"]["Item"];
export type ItemCreate = components["schemas"]["ItemCreate"];
export type Item = ItemContent & { open: boolean };
export type Items = Item[];
