import React, { useState, useEffect } from "react";
import T from "prop-types";
import Button from "./shared/Button";

let Btns = {
  first: { value: "First page", disabled: true },
  next: { value: "Next page", disabled: false },
  prev: { value: "Prev page", disabled: true },
  last: { value: "Last page", disabled: false }
};

const Pagination = ({ total, onChangePage }) => {
  const [state, setState] = useState({
    ...Btns,
    page: 1,
    total
  });

  useEffect(() => {
    setState({
      ...state,
      first: { ...state.first, disabled: true },
      next: { ...state.next, disabled: false },
      prev: { ...state.prev, disabled: true },
      last: { ...state.last, disabled: false },
      page: 1,
      total
    });
    onChangePage(1);
  }, [total]);

  useEffect(() => {
    onChangePage(state.page);
  }, [state.page]);

  const changePageAndDisabled = (
    firstDis,
    nextDis,
    prevDis,
    lastDis,
    changePage
  ) => {
    setState({
      ...state,
      first: { ...state.first, disabled: firstDis },
      next: { ...state.next, disabled: nextDis },
      prev: { ...state.prev, disabled: prevDis },
      last: { ...state.last, disabled: lastDis },
      page: changePage
    });
  };

  const onClickHandle = event => {
    let nameBtn = event.target.getAttribute("name");
    if (nameBtn === "first") {
      changePageAndDisabled(true, false, true, false, 1);
    } else if (nameBtn === "next") {
      if (state.page + 1 < state.total) {
        changePageAndDisabled(false, false, false, false, state.page + 1);
      } else {
        changePageAndDisabled(false, true, false, true, state.total);
      }
    } else if (nameBtn === "prev") {
      if (state.page - 1 > 1) {
        changePageAndDisabled(false, false, false, false, state.page - 1);
      } else {
        changePageAndDisabled(true, false, true, false, 1);
      }
    } else if (nameBtn === "last") {
      changePageAndDisabled(false, true, false, true, state.total);
    }
  };

  return (
    <div className="pagination">
      {Object.keys(Btns).map(key => {
        return (
          <Button
            key={key}
            name={key}
            value={state[key].value}
            disabled={state[key].disabled}
            onPress={onClickHandle}
          />
        );
      })}
    </div>
  );
};

Pagination.defaulProps = {
  total: 1,
  onChangePage: () => console.log("The function 'onChangePage' must be passed")
};
Pagination.displayName = "Pagination";
Pagination.propTypes = {
  total: T.number.isRequired,
  onChangePage: T.func
};

export default Pagination;
