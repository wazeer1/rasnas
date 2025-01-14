import useCounterStore from "@contexts/userStore";
import React, { useEffect, useState } from "react";

interface SwitchProps {
  onSwitch: (value: string) => void;
}

type LocationStatus = "Kuwait" | "India" | "Outside Kuwait and India" | "Permission Denied";

const CountrySwitch: React.FC<SwitchProps> = ({ onSwitch }) => {
  const country = useCounterStore((state) => state.country);
  const changeCountry = useCounterStore((state) => state.changeCountry);
  const [locationStatus, setLocationStatus] = useState<LocationStatus | null>(
    null
  );

  const isInKuwait = (latitude: number, longitude: number) =>
    latitude >= 28.5246 &&
    latitude <= 30.1037 &&
    longitude >= 46.5527 &&
    longitude <= 48.4169;

  const isInIndia = (latitude: number, longitude: number) =>
    latitude >= 8.4 &&
    latitude <= 37.6 &&
    longitude >= 68.7 &&
    longitude <= 97.25;

  useEffect(() => {
    const checkLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            if (isInKuwait(latitude, longitude)) {
              setLocationStatus("Kuwait");
            } else if (isInIndia(latitude, longitude)) {
              setLocationStatus("India");
            } else {
              setLocationStatus("Outside Kuwait and India");
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
            setLocationStatus("Permission Denied");
          }
        );
      } else {
        console.error("Geolocation not supported");
        setLocationStatus("Permission Denied");
      }
    };

    checkLocation();
  }, []);

  const toggleCountry = () => {
    changeCountry();
    onSwitch(country === "IN" ? "Kuwait" : "India");
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <span
          className={`text-sm font-semibold ${
            country === "KWT" ? "text-blue-500" : "text-gray-500"
          }`}
        >
          Kuwait
        </span>
        <div
          className={`w-14 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
            country === "IN" ? "bg-green-500" : "bg-blue-500"
          }`}
          onClick={toggleCountry}
        >
          <div
            className={`bg-white w-3 h-3 rounded-full shadow-md transform ${
              country === "IN" ? "translate-x-9" : ""
            } transition-transform duration-300`}
          ></div>
        </div>
        <span
          className={`text-sm font-semibold ${
            country === "IN" ? "text-green-500" : "text-gray-500"
          }`}
        >
          India
        </span>
      </div>
      {/* <div className="text-sm text-gray-300">
        <p>Location Status: {locationStatus || "Detecting..."}</p>
      </div> */}
    </div>
  );
};

export default CountrySwitch;
