import { useEffect } from "react";
import { useAtom } from "jotai";
import "./App.css";
import { getItems } from "./api";
import { itemsAtom } from "./atoms";
import Items from "./components/Items";

function App() {
  const [items, setItems] = useAtom(itemsAtom);
  useEffect(() => {
    getItems().then((data) => {
      setItems(data);
    });
  }, []);

  return (
    <>
      <Items items={Object.values(items)}></Items>
    </>
  );
}

export default App;
