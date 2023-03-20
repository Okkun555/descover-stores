const getUrlForStores = (query: string, limit: number) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&limit=${limit}`;
};

export const fetchStores = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY!,
    },
  };

  const response = await fetch(getUrlForStores("bar", 6), options);

  const data = await response.json();
  return data.results;
};
