import { paths } from "./schema";
import { Items } from "./types";

export async function getItems(): Promise<Items> {
  type SuccessResponse =
    paths["/items"]["get"]["responses"]["200"]["content"]["application/json"];

  const res = await fetch("/api/items");
  const data: SuccessResponse = await res.json();
  const ret: Items = {};
  for (const item of data) {
    ret[item.id] = { ...item, open: false, selected: false };
  }
  return ret;
}
