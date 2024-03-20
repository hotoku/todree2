import styled from "styled-components";

import { Item } from "../types";
import { selectedItemAtom } from "../atoms";
import { useAtom } from "jotai";

type ItemLineProps = { item: Item };

const StyledUl = styled.ul`
  list-style-type: none;
`;

const StyledLi = styled.li<{ bullet: string; color: string }>`
  &::before {
    content: "${(props) => props.bullet}";
    color: "${(props) => props.color}";
    padding-right: 5px;
  }
`;

function ItemLine({ item }: ItemLineProps): JSX.Element {
  const bullet = item.open ? "▼" : "▶";
  const color = item.selected ? "red" : "black";
  return (
    <StyledLi key={item.id} bullet={bullet} color={color}>
      {item.content}
    </StyledLi>
  );
}

type ItemsProps = { items: Item[] };

function Items({ items }: ItemsProps): JSX.Element {
  const [selectedItem, setSlectedItem] = useAtom(selectedItemAtom);
  return (
    <StyledUl>
      {items.map((i) => (
        <ItemLine item={i} />
      ))}
    </StyledUl>
  );
}

export default Items;
