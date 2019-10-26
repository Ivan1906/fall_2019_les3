import React from "react";
import T from "prop-types";

const SwitchRadio = ({ onChecked }) => {
  const onCheckedHandle = event => {
    onChecked(event.target.dataset["typeTv"]);
  };

  return (
    <section id="typeTV">
      <label htmlFor="popularTV">Popular TV shows</label>
      <input
        type="radio"
        id="popularTV"
        name="tv"
        data-type-tv="tv/popular"
        onChange={onCheckedHandle}
        defaultChecked
      />

      <label htmlFor="topRatedTV">Top Rated TV shows</label>
      <input
        type="radio"
        id="topRatedTV"
        name="tv"
        data-type-tv="tv/top_rated"
        onChange={onCheckedHandle}
      />
    </section>
  );
};

SwitchRadio.defaulProps = {
  onChecked: () => console.log("The function 'onChecked' must be passed")
};
SwitchRadio.displayName = "SwitchRadio";
SwitchRadio.propTypes = {
  onChecked: T.func.isRequired
};

export default SwitchRadio;
