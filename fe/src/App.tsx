import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import "./App.css";
import { createItem, deleteItem, getItems, saveItem } from "./api";
import { editingAtom, itemsAtom, selectedItemAtom } from "./atoms";
import Items from "./components/Items";
import Loadable from "./loadable";
import { Item } from "./types";

function App() {
  const [items, setItems] = useAtom(itemsAtom);
  const [selectedItem, setSelectedItem] = useAtom(selectedItemAtom);
  const [editing, setEditing] = useAtom(editingAtom);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getItems().then((data) => {
      const data2 = data.sort((a, b) => a.position - b.position);
      setItems(data2.map((i) => new Loadable(Promise.resolve(i))));
      setLoaded(true);
    });
  }, [setItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (process.env.NODE_ENV === "development") {
        console.log("code", e.code);
        console.log("key", e.key);
      }
      if (!loaded) {
        return;
      }
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
          if (e.keyCode === 229) {
            return;
          }
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
          if (editing) {
            setEditing(false);
          } else {
            setSelectedItem(null);
          }
          break;
        case "a":
          if (editing) {
            return;
          }
          (() => {
            let position = 0;
            if (selectedItem === null) {
              position =
                items.length === 0
                  ? 0
                  : items[items.length - 1].getOrThrow().position + 1;
            } else {
              if (items.length === 0) {
                throw new Error("unexpected: items length is 0");
              }
              if (selectedItem === items.length - 1) {
                position = items[selectedItem].getOrThrow().position + 1;
              } else {
                position =
                  (items[selectedItem].getOrThrow().position +
                    items[selectedItem + 1].getOrThrow().position) /
                  2;
              }
            }

            const adding = new Loadable(
              createItem({ content: "", position: position }).then((data) => {
                return { ...data, open: false };
              })
            );

            let select = 0;
            let newItems: Loadable<Item>[] = [];
            if (selectedItem !== null) {
              select = selectedItem + 1;
              const ary1 = items.slice(0, selectedItem + 1);
              const ary2 = items.slice(selectedItem + 1);
              newItems = [...ary1, adding, ...ary2];
            } else {
              select = items.length === 0 ? 0 : items.length;
              newItems = [...items, adding];
            }

            setItems(newItems);
            setSelectedItem(select);
            setEditing(true);
          })();

          break;
        case "x":
          if (editing) {
            return;
          }
          if (selectedItem === null) {
            return;
          }
          (() => {
            const item = items[selectedItem];
            if (item.state.status === "fulfilled") {
              const id = item.getOrThrow().id;
              const deleting = new Loadable(
                deleteItem(id).then(() => {
                  const ary1 = items.slice(0, selectedItem);
                  const ary2 = items.slice(selectedItem + 1);
                  setItems([...ary1, ...ary2]);
                  return item.getOrThrow();
                })
              );
              const ary1 = items.slice(0, selectedItem);
              const ary2 = items.slice(selectedItem + 1);
              setItems([...ary1, deleting, ...ary2]);

              setSelectedItem((prev) =>
                prev === 0 || prev === null ? null : prev - 1
              );
            }
          })();
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
    loaded,
    selectedItem,
    setEditing,
    setItems,
    setSelectedItem,
  ]);

  return (
    <div>
      <h1>todree</h1>
      {process.env.NODE_ENV === "development" ? (
        <span>
          selected item <span>{selectedItem}</span> <br></br>
          item length <span>{items.length}</span>
        </span>
      ) : null}
      <Items items={items}></Items>
    </div>
  );
}

export default App;
