import { useEffect } from "react";
import { useAtom } from "jotai";
import "./App.css";
import { getItems, saveItem } from "./api";
import { editingAtom, itemsAtom, selectedItemAtom } from "./atoms";
import Items from "./components/Items";

function App() {
  const [items, setItems] = useAtom(itemsAtom);
  const [selectedItem, setSelectedItem] = useAtom(selectedItemAtom);
  const [editing, setEditing] = useAtom(editingAtom);

  useEffect(() => {
    getItems().then((data) => {
      setItems(data);
    });
  }, [setItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("key", e.key);
      switch (e.key) {
        case "k":
          if (editing) {
            return;
          }
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
          if (editing) {
            return;
          }
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
        case "Enter":
          if (editing && selectedItem) {
            console.log(items[selectedItem].content);
            saveItem(items[selectedItem]).then(() => {
              console.log("saved");
            });
          }
          setEditing((b) => !b);
          break;
        case "Escape":
          setEditing(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editing, items, items.length, selectedItem, setEditing, setSelectedItem]);

  return (
    <div>
      <Items items={Object.values(items)}></Items>
    </div>
  );
}

export default App;
