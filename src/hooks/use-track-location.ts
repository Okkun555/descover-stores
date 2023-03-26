import { useState } from "react";

const useTrackLocation = () => {
  const [locationErrorMessage, setLocationErrorMessage] = useState<string>("");
  const [latLong, setLatLong] = useState<string>("");

  const success = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`);
    setLocationErrorMessage("");
  };

  const error = () => {
    setLocationErrorMessage("位置情報を取得できませんでした。");
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorMessage("利用環境では位置情報を取得できません。");
      return;
    }

    navigator.geolocation.getCurrentPosition(success, error);
  };

  return {
    latLong,
    handleTrackLocation,
    locationErrorMessage,
  };
};

export default useTrackLocation;
