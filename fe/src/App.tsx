import { useEffect } from "react";
import { useAtom } from "jotai";
import "./App.css";
import { getItems, saveItem } from "./api";
import { editingAtom, itemsAtom, selectedItemAtom } from "./atoms";
import Items from "./components/Items";
import Loadable from "./loadable";

function App() {
  const [items, setItems] = useAtom(itemsAtom);
  const [selectedItem, setSelectedItem] = useAtom(selectedItemAtom);
  const [editing, setEditing] = useAtom(editingAtom);

  useEffect(() => {
    getItems().then((data) => {
      setItems(data.map((i) => new Loadable(Promise.resolve(i))));
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
          if (selectedItem !== null) {
            const item = items[selectedItem];
            if (editing) {
              if (item.state.status === "fulfilled") {
                const prm = saveItem(item.getOrThrow()).then((data) => {
                  return { ...data, open: item.getOrThrow().open };
                });
                const ary1 = items.slice(0, selectedItem);
                const ary2 = items.slice(selectedItem + 1);
                setItems([...ary1, new Loadable(prm), ...ary2]);
              }
              setEditing(false);
            } else {
              if (item.state.status === "fulfilled") {
                setEditing(true);
              }
            }
          }
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
  }, [
    editing,
    items,
    items.length,
    selectedItem,
    setEditing,
    setItems,
    setSelectedItem,
  ]);

  return (
    <div>
      <Items items={items}></Items>
    </div>
  );
}

export default App;
