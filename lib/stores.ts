import { Store } from "@/types/store";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY!,
});

const getUrlForStores = (query: string, limit: number) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&limit=${limit}`;
};

const getListOfStoresPhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "bar",
    page: 1,
    perPage: 30,
    color: "green",
    orientation: "portrait",
  });

  // TODO: アクセス失敗時のエラーハンドンリング
  const unsplashResults = photos.response!.results;

  return unsplashResults.map((result) => result.urls.small);
};

export const fetchStores = async (): Promise<Store[]> => {
  const photos = await getListOfStoresPhotos();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY!,
    },
  };

  const response = await fetch(getUrlForStores("bar", 6), options);

  const data = await response.json();
  return data.results.map((result: any, index: number) => {
    return {
      name: result.name,
      location: {
        address: result.location.address,
        region: result.location.region,
      },
      imgUrl: photos[index],
    };
  });
};
