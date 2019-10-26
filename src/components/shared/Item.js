import React from "react";
import T from "prop-types";

const comparse = (prevProps, nextProps) => {
  return prevProps.id !== nextProps.id && prevProps.name !== nextProps.name;
};

const Item = ({ item, onPress }) => (
  <li data-id={item.id} onClick={onPress}>
    {item.name}
  </li>
);

Item.defaulProps = {
  item: { id: 0, value: "Not name" },
  onPress: () => console.log("The function 'onPress' must be passed")
};
Item.displayName = "Item";
Item.propTypes = {
  item: T.shape({
    id: T.number,
    name: T.string
  }).isRequired,
  onPress: T.func.isRequired
};

export default React.memo(Item, comparse);
