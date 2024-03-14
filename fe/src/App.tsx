import { useState, useEffect } from "react";
import "./App.css";
import { components, paths } from "./schema";

type Item = components["schemas"]["Item"];
type SuccessResponse =
  paths["/items"]["get"]["responses"]["200"]["content"]["application/json"];

type Items = { [key: number]: Item };

function App() {
  const [items, setItems] = useState<Items>({});
  useEffect(() => {
    console.log("requesting");
    fetch("/api/items")
      .then((res) => res.json())
      .then((data: SuccessResponse) => {
        const ret: Items = {};
        for (const item of data) {
          ret[item.id] = item;
        }
        console.log(ret);
        setItems(ret);
      });
  }, []);

  return <></>;
}

export default App;
