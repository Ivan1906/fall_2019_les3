import { config } from ".././config";

export const urlListTVShows = (page = 1, typeTV = "tv/popular") => {
  if (typeTV === "tv/popular" || typeTV === "tv/top_rated") {
    return `${config.baseUrl}${typeTV}?api_key=${config.token}&page=${page}`;
  } else {
    return new Error("Type TV Shows incorrectly specified");
  }
};

export const urlDetailTVShow = idShow => {
  if (idShow) {
    return `${config.baseUrl}tv/${idShow}?api_key=${config.token}`;
  } else {
    return new Error("ID TV Show is required params");
  }
};

export const urlDetailTVSeason = (idShow, munberSeason) => {
  if (idShow && munberSeason) {
    return `${config.baseUrl}tv/${idShow}/season/${munberSeason}?api_key=${
      config.token
    }`;
  } else {
    return new Error("ID TV and Season Number Show is required params");
  }
};

export const urlDetailsEpisodeTVShow = (idShow, munberSeason, numberEpisod) => {
  if (idShow && munberSeason && numberEpisod) {
    return `${
      config.baseUrl
    }tv/${idShow}/season/${munberSeason}/episode/${numberEpisod}?api_key=${
      config.token
    }`;
  } else {
    return new Error("ID TV and Season Number Show is required params");
  }
};
