import { components, paths } from "./schema";

export type Item = components["schemas"]["Item"];

const db: {
  [key: number]: { id: number; content: string; parent: number | null };
} = {
  1: { id: 1, content: "one", parent: null },
  2: { id: 2, content: "two", parent: 1 },
  3: { id: 3, content: "three", parent: 1 },
  4: { id: 4, content: "four", parent: 2 },
};

export async function loadRoot(): Promise<Item[]> {
  type Response200 =
    paths["/api/items"]["get"]["responses"]["200"]["content"]["application/json"];

  const res = await fetch("/api/items");
  const data: Response200 = await res.json();
  return data;
}

export function sleep(n: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, n * 1000));
}

export async function loadChildren(parent: number): Promise<Item[]> {
  type Response200 =
    paths["/api/items/{item_id}/children"]["get"]["responses"]["200"]["content"]["application/json"];
  const res = await fetch(`/api/items/${parent}/children`);
  const data: Response200 = await res.json();
  return data;
}

export async function saveContent(id: number, v: string): Promise<string> {
  type Response200 =
    paths["/api/items/{item_id}"]["put"]["responses"]["200"]["content"]["application/json"];
  const res = await fetch(`/api/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: v }),
  });
  const data: Response200 = await res.json();
  return data.content;
}

export function addItem(parentId: number | null): Promise<Item> {
  const adding = sleep(1).then(() => {
    const id = Math.max(...Object.keys(db).map(Number)) + 1;
    const item = { id, content: "new item", parent: parentId };
    db[id] = item;
    return item;
  });
  return adding;
}

export function deleteItem(id: number): Promise<void> {
  const children = Object.values(db).filter((item) => item.parent === id);
  const deleting = sleep(1).then(() => {
    if (children.length > 0) {
      throw new Error("Cannot delete node with children");
    }
    delete db[id];
  });
  return deleting;
}
