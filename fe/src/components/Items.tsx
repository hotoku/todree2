import styled from "styled-components";

import { Item } from "../types";
import { editingAtom, selectedItemAtom } from "../atoms";
import { useAtomValue } from "jotai";
import { Suspense, useEffect, useRef } from "react";

import Loadable from "../loadable";

type ItemLineProps = { item: Loadable<Item>; pos: number };

const StyledUl = styled.ul`
  list-style-type: none;
`;

const StyledLi = styled.li<{ $color: string }>`
  &::before {
    content: "▶";
    color: ${(props) => props.$color};
    padding-right: 5px;
  }
`;

const StyledInput = styled.input`
  min-width: 80%;
`;

function ItemEditor({ item }: Pick<ItemLineProps, "item">): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [content, setContent] = useState(item.content);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (item.state.status === "fulfilled") {
      item.getOrThrow().content = e.target.value;
    }
  };
  return (
    <StyledInput
      ref={inputRef}
      type="text"
      defaultValue={item.getOrThrow().content}
      onChange={handleChange}
    />
  );
}

function ItemViewer({ item }: Pick<ItemLineProps, "item">): JSX.Element {
  return (
    <>
      <span>{item.getOrThrow().content}</span>{" "}
      {process.env.NODE_ENV === "development" ? (
        <>
          <span>
            {item.getOrThrow().position},{item.getOrThrow().id}
          </span>
        </>
      ) : null}
    </>
  );
}

function ItemLine({ item, pos }: ItemLineProps): JSX.Element {
  const selectedItem = useAtomValue(selectedItemAtom);
  const selected = pos === selectedItem;
  const color = selected ? "red" : "black";
  const editing = useAtomValue(editingAtom);
  return (
    <StyledLi $color={color}>
      <Suspense fallback={<span>Loading...</span>}>
        {selected && editing ? (
          <ItemEditor item={item} />
        ) : (
          <ItemViewer item={item} />
        )}
      </Suspense>
    </StyledLi>
  );
}

type ItemsProps = { items: Loadable<Item>[] };

function Items({ items }: ItemsProps): JSX.Element {
  return (
    <StyledUl>
      {items.map((i, idx) => {
        const key =
          i.state.status === "fulfilled" ? i.state.data.id : `loading-${idx}`;
        return <ItemLine key={key} item={i} pos={idx} />;
      })}
    </StyledUl>
  );
}

export default Items;
