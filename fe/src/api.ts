import { paths } from "./schema";
import { Item, Items } from "./types";

export async function getItems(): Promise<Items> {
  type SuccessResponse =
    paths["/items"]["get"]["responses"]["200"]["content"]["application/json"];

  const res = await fetch("/api/items");
  const data: SuccessResponse = await res.json();
  const ret: Items = [];
  for (const item of data) {
    ret.push({
      ...item,
      open: false,
    });
  }
  return ret;
}

export async function saveItem(item: Item): Promise<void> {
  await fetch(`/api/items/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}
