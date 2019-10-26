import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { fetchData } from "./untils/fetchData";
import { urlListTVShows } from "./untils/createUrl";
import Pagination from "./components/Pagination";
import SwitchRadio from "./components/SwitchRadio";
import ListItem from "./components/shared/ListItem";
import Modal from "./components/Modal";

function App() {
  const controller = new AbortController();
  let signal = controller.signal;

  const [state, setState] = useState({
    shows: [],
    currentShowId: 0,
    page: 1,
    total: 1,
    typeTV: "tv/popular"
  });

  useEffect(() => {
    fetchData(urlListTVShows(state.page, state.typeTV), signal).then(data => {
      setState({ ...state, total: data.total_pages, shows: data.results });
    });

    return () => {
      controller.abort();
    };
  }, [state.page, state.typeTV]);

  const checkedHandle = typeTV => {
    setState({ ...state, typeTV, page: 1 });
  };

  const changePageHandle = page => {
    setState({ ...state, page });
  };

  const pressLinkhandle = id => {
    Boolean(id)
      ? setState({ ...state, currentShowId: Number(id) })
      : setState({ ...state, currentShowId: 0 });
  };

  const closeModalHandle = () => {
    setState({ ...state, currentShowId: 0 });
  };

  return (
    <div className="App">
      <div className="left">
        <SwitchRadio onChecked={checkedHandle} />
        <ListItem items={state.shows} onClickLink={pressLinkhandle} />
        <Pagination total={state.total} onChangePage={changePageHandle} />
      </div>
      <div className="right">
        {Boolean(state.currentShowId) ? (
          <Modal idShow={state.currentShowId} onClose={closeModalHandle} />
        ) : null}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
