import { SHOW, SEASON_SHOW, EPISODE_SHOW } from "../values/fieldsShow";

export const converToListShow = show => {
  let result = SHOW;
  result.name.value = show.name;
  result.overview.value = show.overview;
  result.poster.value = show.poster_path;
  result.seasons.value = show.number_of_seasons;
  result.episodes.value = show.number_of_episodes;
  result.list.value = show.seasons.map(season => {
    return { id: Number(season.season_number), name: season.name };
  });
  return result;
};

export const converToListSeasonShow = season => {
  let result = SEASON_SHOW;
  result.name.value = season.name;
  result.overview.value = season.overview;
  result.poster.value = season.poster_path;
  result.seasons.value = season.season_number;
  result.episodes.value = season.episodes.length;
  result.list.value = season.episodes.map(episode => {
    return { id: Number(episode.episode_number), name: episode.name };
  });
  return result;
};

export const converToListEpisodeShow = episode => {
  let result = EPISODE_SHOW;
  result.name.value = episode.name;
  result.overview.value = episode.overview;
  result.poster.value = episode.still_path;
  result.seasons.value = episode.season_number;
  result.episodes.value = episode.episode_number;
  return result;
};
