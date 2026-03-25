import { useState, useEffect } from "react";
import axios from "axios";
import { BsGeoAltFill } from "react-icons/bs";

function Search({ location, setLocation, executeSearch, handleGeoSearch, t }) {
  const [suggestions, setSuggestions] = useState([]);

  const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.trim().length > 2) {
        const fetchCities = async () => {
          try {
            const res = await axios.get(
              `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`,
            );

            const uniqueCities = Array.from(
              new Set(res.data.map((c) => `${c.name}-${c.country}-${c.state}`)),
            ).map((id) => {
              return res.data.find(
                (c) => `${c.name}-${c.country}-${c.state}` === id,
              );
            });

            setSuggestions(uniqueCities);
          } catch (error) {
            console.error("Geocoding error: ", error);
          }
        };
        fetchCities();
      } else {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [location, apiKey]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSuggestions([]);
      executeSearch(location);
    }
  };

  const handleSelectCity = (cityName) => {
    setLocation(cityName);
    setSuggestions([]);
    executeSearch(cityName);
  };

  return (
    <div className="relative w-full text-center flex items-center">
      <input
        className="w-full pl-6 pr-14 py-4 text-lg text-gray-800 dark:text-white bg-white/80 dark:bg-[#1e1e1e]/90 rounded-full border border-gray-300 dark:border-white/10 shadow-lg dark:shadow-xl backdrop-blur-md focus:outline-none focus:ring-4 focus:ring-blue-300/50 dark:focus:ring-white/20 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t("searchPlaceholder")}
        type="text"
      />

      <button
        onClick={handleGeoSearch}
        className="absolute right-5 text-blue-500/80 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors p-2"
        title="Use my location"
      >
        <BsGeoAltFill size={22} />
      </button>

      {suggestions.length > 0 && (
        <ul className="absolute top-[105%] z-50 w-full mt-2 bg-white dark:bg-[#252525] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden text-left">
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelectCity(city.name)}
              className="px-6 py-3 cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-white/10 transition-colors border-b last:border-none border-gray-100 dark:border-white/5"
            >
              <span className="font-semibold">{city.name}</span>
              {city.state && (
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                  {city.state}
                </span>
              )}
              {city.country && (
                <span className="text-gray-400 dark:text-gray-500 text-sm ml-2">
                  ({city.country})
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
