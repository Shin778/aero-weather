import { getWeatherIcon } from "../utils/weatherIcons";

function WeatherTop({ data, isCelsius, t }) {
  if (!data || !data.main || !data.weather) return null;

  const currentTemp = isCelsius
    ? data.main.temp
    : (data.main.temp * 9) / 5 + 32;

  return (
    <div className="flex flex-col items-center sm:items-start text-white drop-shadow-lg animate-fade-in">
      <div className="mb-2">
        <p className="text-4xl font-bold tracking-wide">{data.name}</p>
      </div>

      <div className="my-2 flex items-center gap-6">
        {getWeatherIcon(data.weather[0].icon, "text-6xl sm:text-7xl")}
        <h1 className="text-6xl sm:text-7xl font-bold">
          {currentTemp.toFixed()}°{isCelsius ? "C" : "F"}
        </h1>
      </div>

      <div className="text-2xl font-semibold capitalize text-gray-100 dark:text-gray-300 transition-colors">
        <p>{data.weather[0].description}</p>
      </div>
    </div>
  );
}

export default WeatherTop;
