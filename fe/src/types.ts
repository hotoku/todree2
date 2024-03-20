import { components } from "./schema";

export type ItemServer = components["schemas"]["Item"];
export type Item = ItemServer & { open: boolean, selected: boolean };
export type Items = { [key: number]: Item };
