import React from "react";
import T from "prop-types";

const comparse = (prevProps, nextProps) => {
  return (
    prevProps.name !== nextProps.name && prevProps.value !== nextProps.value
  );
};

const Button = ({ name, value, disabled, onPress }) => (
  <button name={name} disabled={disabled ? "disabled" : ""} onClick={onPress}>
    {value}
  </button>
);

Button.defaulProps = {
  name: "defaultName",
  value: "Default name",
  disabled: false,
  onPress: () => console.log("The function 'onPress' must be passed")
};
Button.displayName = "Button";
Button.propTypes = {
  name: T.string.isRequired,
  value: T.string.isRequired,
  disabled: T.bool,
  onPress: T.func.isRequired
};

export default React.memo(Button, comparse);
