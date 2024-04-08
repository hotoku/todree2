import styled from "styled-components";

import { Item } from "../types";
import { editingAtom, selectedItemAtom } from "../atoms";
import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";

type ItemLineProps = { item: Item; pos: number };

const StyledUl = styled.ul`
  list-style-type: none;
`;

const StyledLi = styled.li<{ $color: string; $bullet: string }>`
  &::before {
    content: "${(props) => props.$bullet}";
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
    item.content = e.target.value;
  };
  return (
    <StyledInput
      ref={inputRef}
      type="text"
      defaultValue={item.content}
      onChange={handleChange}
    />
  );
}

function ItemViewer({ item }: Pick<ItemLineProps, "item">): JSX.Element {
  return <span>{item.content}</span>;
}

function ItemLine({ item, pos }: ItemLineProps): JSX.Element {
  const selectedItem = useAtomValue(selectedItemAtom);
  const bullet = item.open ? "▼" : "▶";
  const selected = pos === selectedItem;
  const color = selected ? "red" : "black";
  const editing = useAtomValue(editingAtom);
  return (
    <StyledLi $color={color} $bullet={bullet}>
      {selected && editing ? (
        <ItemEditor item={item} />
      ) : (
        <ItemViewer item={item} />
      )}
    </StyledLi>
  );
}

type ItemsProps = { items: Item[] };

function Items({ items }: ItemsProps): JSX.Element {
  return (
    <StyledUl>
      {items.map((i, idx) => (
        <ItemLine key={i.id} item={i} pos={idx} />
      ))}
    </StyledUl>
  );
}

export default Items;
