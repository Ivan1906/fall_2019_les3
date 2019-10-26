export const fetchData = async (url, signal) => {
  return await (await fetch(url, { signal })).json();
};
