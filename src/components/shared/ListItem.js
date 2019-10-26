import React from "react";
import T from "prop-types";
import Item from "./Item";

const ListItem = ({ items, onClickLink }) => {
  const clickItemHandle = event => {
    let { id } = { ...{ ...event.target.dataset } };
    onClickLink(id);
  };

  return (
    <ul>
      {items.map((item, index) => (
        <Item key={index} item={item} onPress={clickItemHandle} />
      ))}
    </ul>
  );
};

ListItem.defaulProps = {
  items: [],
  onClickLink: () => console.log("The function 'onClickLink' must be passed")
};

ListItem.displayName = "ListItem";

ListItem.propTypes = {
  items: T.arrayOf(
    T.shape({
      id: T.number,
      name: T.string
    })
  ).isRequired,
  onClickLink: T.func.isRequired
};

export default ListItem;
