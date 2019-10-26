import React, { useState, useEffect } from "react";
import T from "prop-types";
import { fetchData } from "../untils/fetchData";
import {
  urlDetailTVShow,
  urlDetailTVSeason,
  urlDetailsEpisodeTVShow
} from "../untils/createUrl";
import {
  converToListShow,
  converToListSeasonShow,
  converToListEpisodeShow
} from "../untils/converToList";
import Button from "./shared/Button";
import Image from "./shared/Image";
import B from "./shared/TagB";
import ListItem from "./shared/ListItem";

const SHOW_DEFAULT = {
  id: 0,
  season: 0,
  episode: 0
};

const Modal = ({ idShow, onClose }) => {
  const controller = new AbortController();
  let signal = controller.signal;

  const [show, setShow] = useState({ ...SHOW_DEFAULT, id: idShow, obj: null });

  useEffect(() => {
    console.log(idShow);
    setShow({
      ...show,
      id: idShow,
      season: SHOW_DEFAULT.season,
      episode: SHOW_DEFAULT.episode
    });
  }, [idShow]);

  useEffect(() => {
    if (Boolean(show.id)) {
      //Get URL for fetch data show
      let url = "";
      if (Boolean(show.id && show.season && show.episode)) {
        url = urlDetailsEpisodeTVShow(show.id, show.season, show.episode);
      } else if (Boolean(show.id && show.season)) {
        url = urlDetailTVSeason(show.id, show.season);
      } else if (Boolean(show.id)) {
        url = urlDetailTVShow(show.id);
      }

      //Fetch data
      if (Boolean(url)) {
        fetchData(url, signal)
          .then(data => {
            if (Boolean(show.id && show.season && show.episode)) {
              setShow({ ...show, obj: converToListEpisodeShow(data) });
            } else if (Boolean(show.id && show.season)) {
              setShow({ ...show, obj: converToListSeasonShow(data) });
            } else if (Boolean(show.id)) {
              setShow({ ...show, obj: converToListShow(data) });
            }
          })
          .catch(err => console.error(err));
      }
    }

    return () => {
      controller.abort();
    };
  }, [show.id, show.season, show.episode]);

  const clickLinkHandle = id => {
    if (!Boolean(show.season)) {
      setShow({ ...show, season: Number(id) });
    } else if (!Boolean(show.episode)) {
      setShow({ ...show, episode: Number(id) });
    }
  };

  return (
    <div id="modal">
      {Boolean(show.obj) ? (
        <div>
          {Boolean(show.obj && show.obj.poster.value) ? (
            <Image imgUrl={show.obj.poster.value} />
          ) : null}

          <p>
            <B size="20px">{show.obj.name.text}:&nbsp;</B>
            {show.obj.name.value}
          </p>
          <p>
            <B size="20px">{show.obj.overview.text}:&nbsp;</B>
            {show.obj.overview.value}
          </p>
          <p>
            <B size="20px">{show.obj.seasons.text}:&nbsp;</B>
            {show.obj.seasons.value}
          </p>
          <p>
            <B size="20px">{show.obj.episodes.text}:&nbsp;</B>
            {show.obj.episodes.value}
          </p>
          <div>
            {Boolean(
              show.obj.list &&
                show.obj.list.value &&
                Array.isArray(show.obj.list.value)
            ) ? (
              <ListItem
                items={show.obj.list.value}
                onClickLink={clickLinkHandle}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div>Load TV show!</div>
      )}

      <Button name="close" value="Close modal" onPress={onClose} />
    </div>
  );
};

Modal.defaulProps = {
  idShow: 0,
  onClose: () => console.log("The function 'onClose' must be passed")
};
Modal.displayName = "Modal show TV";
Modal.propTypes = { idShow: T.number.isRequired, onClose: T.func.isRequired };

export default Modal;
