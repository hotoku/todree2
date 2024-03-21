import { components } from "./schema";

export type ItemContent = components["schemas"]["Item"];
export type Item = ItemContent & { open: boolean; selected: boolean };
export type Items = { [key: number]: Item };
