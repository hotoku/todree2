import { paths } from "./schema";
import { Item, ItemContent, Items } from "./types";

export async function getItems(): Promise<Items> {
  type SuccessResponse =
    paths["/api/items"]["get"]["responses"]["200"]["content"]["application/json"];

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

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function saveItem(item: Item): Promise<ItemContent> {
  type SuccessResponse =
    paths["/api/items/{item_id}"]["put"]["responses"]["200"]["content"]["application/json"];
  const res = await fetch(`/api/items/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const data: SuccessResponse = await res.json();
  await sleep(1000);
  return data;
}
