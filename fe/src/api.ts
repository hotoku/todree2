import { paths } from "./schema";
import { Tree, createTree } from "./tree";

async function getItems() {
  type SuccessResponse =
    paths["/api/items"]["get"]["responses"]["200"]["content"]["application/json"];

  const res = await fetch("/api/items");
  const data: SuccessResponse = await res.json();
  return data;
}

export async function loadTree(): Promise<Tree> {
  const data = await getItems();
  return createTree(data);
}
