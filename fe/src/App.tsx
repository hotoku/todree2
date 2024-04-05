import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import "./App.css";
import { getItems } from "./api";
import { itemsAtom, selectedItemAtom } from "./atoms";
import Items from "./components/Items";

function App() {
  const [items, setItems] = useAtom(itemsAtom);
  const setSelectedItem = useSetAtom(selectedItemAtom);
  useEffect(() => {
    getItems().then((data) => {
      setItems(data);
    });
  }, [setItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "k":
          setSelectedItem((prev) => {
            let ret: number = 0;
            if (items.length === 0) {
              return null;
            } else if (prev === null) {
              ret = items.length - 1;
            } else if (prev > 0) {
              ret = prev - 1;
            } else {
              ret = 0;
            }
            return ret;
          });
          break;
        case "j":
          setSelectedItem((prev) => {
            let ret: number = 0;
            if (items.length === 0) {
              return null;
            } else if (prev === null) {
              ret = 0;
            } else if (prev < items.length - 1) {
              ret = prev + 1;
            } else {
              ret = items.length - 1;
            }
            return ret;
          });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [items.length, setSelectedItem]);

  return (
    <div>
      <Items items={Object.values(items)}></Items>
    </div>
  );
}

export default App;
