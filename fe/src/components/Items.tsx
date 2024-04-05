import styled from "styled-components";

import { Item } from "../types";
import { selectedItemAtom } from "../atoms";
import { useAtomValue } from "jotai";

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

function ItemLine({ item, pos }: ItemLineProps): JSX.Element {
  const selectedItem = useAtomValue(selectedItemAtom);
  const bullet = item.open ? "▼" : "▶";
  const color = pos === selectedItem ? "red" : "black";
  return (
    <StyledLi $color={color} $bullet={bullet}>
      {item.content}
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
