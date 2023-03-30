import { Store } from "@/types/store";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
});

const getUrlForStores = (latLong: string, query: string, limit: number) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfStoresPhotos = async () => {
  try {
    const photos = await unsplash.search.getPhotos({
      query: "Bar",
      page: 1,
      perPage: 30,
      orientation: "portrait",
    });

    const unsplashResults = photos.response!.results;

    return unsplashResults.map((result) => result.urls.small);
  } catch (e: unknown) {
    // TODO: 失敗時の処理は後で検討
    if (e instanceof Error) {
      console.error(e);
    }
  }
};

export const fetchStores = async (
  latLong = "43.653833032607096%2C-79.37896808855945",
  limit = 6
): Promise<Store[]> => {
  const photos = await getListOfStoresPhotos();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY!,
    },
  };

  const response = await fetch(getUrlForStores(latLong, "bar", limit), options);

  const data = await response.json();
  return data.results.map((result: any, index: number) => {
    return {
      id: result.fsq_id,
      name: result.name,
      location: {
        address: result.location.address,
        region: result.location.region,
      },
      imgUrl: photos[index],
    };
  });
};
