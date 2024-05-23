import { components, paths } from "./schema";

export type Item = components["schemas"]["Item"];

export async function loadChildrenOfRoot(): Promise<Item[]> {
  type Response200 =
    paths["/api/items"]["get"]["responses"]["200"]["content"]["application/json"];

  const res = await fetch("/api/items");
  if (!res.ok) {
    throw new Error("Failed to add item");
  }
  const data: Response200 = await res.json();
  return data;
}

export async function loadChildren(parent: number | null): Promise<Item[]> {
  if (parent === null) {
    return loadChildrenOfRoot();
  }
  type Response200 =
    paths["/api/items/{item_id}/children"]["get"]["responses"]["200"]["content"]["application/json"];
  const res = await fetch(`/api/items/${parent}/children`);
  if (!res.ok) {
    throw new Error("Failed to add item");
  }
  const data: Response200 = await res.json();
  return data;
}

export async function saveContent(id: number, v: string): Promise<string> {
  type Body =
    paths["/api/items/{item_id}"]["put"]["requestBody"]["content"]["application/json"];
  type Response200 =
    paths["/api/items/{item_id}"]["put"]["responses"]["200"]["content"]["application/json"];
  const body: Body = { content: v };
  const res = await fetch(`/api/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("Failed to add item");
  }
  const data: Response200 = await res.json();
  return data.content;
}

export async function addItem(parentId: number | null): Promise<Item> {
  type Body =
    paths["/api/items"]["post"]["requestBody"]["content"]["application/json"];
  const body: Body = { parent_id: parentId, content: "" };
  type Response200 =
    paths["/api/items"]["post"]["responses"]["200"]["content"]["application/json"];
  const res = await fetch(`/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("Failed to add item");
  }
  const data: Response200 = await res.json();
  console.log(data);
  return data;
}

export async function deleteItem(id: number): Promise<void> {
  const res = await fetch(`/api/items/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error("Failed to add item");
  }
  return;
}
