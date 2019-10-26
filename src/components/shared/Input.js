import React from "react";
import T from "prop-types";

const Input = ({ onSubmit }) => {
  const onSubmitHandle = event => {
    if (!!event.target.value) {
      onSubmit(event.target.value);
    }
  };
  return (
    <form onSubmit={onSubmitHandle}>
      <input type="text" />
    </form>
  );
};

Input.defaulProps = {
  onSubmit: () => console.log("The function 'onSubmit' must be passed")
};
Input.displayName = "InputSearchTV";
Input.propTypes = { onSubmit: T.func.isRequired };

export default Input;
