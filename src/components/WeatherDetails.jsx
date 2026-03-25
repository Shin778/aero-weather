import {
  BsThermometer,
  BsDroplet,
  BsWind,
  BsEye,
  BsSpeedometer,
  BsSunrise,
  BsSunset,
} from "react-icons/bs";

function WeatherDetails({ data, isCelsius, t }) {
  if (!data || !data.sys) return null;
  const feelsLikeTemp = isCelsius
    ? data.main.feels_like
    : (data.main.feels_like * 9) / 5 + 32;

  const formatTime = (timestamp) => {
    if (!timestamp) return "--:--";
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="flex flex-wrap justify-center items-center text-center bg-white/20 dark:bg-[#1e1e1e] backdrop-blur-md dark:backdrop-blur-none rounded-2xl p-6 shadow-xl dark:shadow-2xl w-full text-white border border-white/10 dark:border-white/5 gap-y-8 gap-x-2 transition-colors duration-500">
      <div className="flex flex-col items-center w-[30%]">
        <div className="bg-white/10 dark:bg-white/5 p-3 rounded-xl mb-2">
          <BsThermometer size={24} className="text-rose-300" />
        </div>
        <p className="text-2xl font-bold">
          {feelsLikeTemp.toFixed()}°{isCelsius ? "C" : "F"}
        </p>
        <p className="text-sm font-light text-gray-200 dark:text-gray-400 mt-1">
          {t("feelsLike")}
        </p>
      </div>

      <div className="flex flex-col items-center w-[30%]">
        <div className="bg-white/10 dark:bg-white/5 p-3 rounded-xl mb-2">
          <BsDroplet size={24} className="text-blue-300" />
        </div>
        <p className="text-2xl font-bold">{data.main.humidity}%</p>
        <p className="text-sm font-light text-gray-200 dark:text-gray-400 mt-1">
          {t("humidity")}
        </p>
      </div>

      <div className="flex flex-col items-center w-[30%]">
        <div className="bg-white/10 dark:bg-white/5 p-3 rounded-xl mb-2">
          <BsWind size={24} className="text-teal-300" />
        </div>
        <p className="text-2xl font-bold">{data.wind.speed.toFixed()} m/s</p>
        <p className="text-sm font-light text-gray-200 dark:text-gray-400 mt-1">
          {t("wind")}
        </p>
      </div>

      <div className="flex flex-col items-center w-[30%]">
        <div className="bg-white/10 dark:bg-white/5 p-3 rounded-xl mb-2">
          <BsEye size={24} className="text-indigo-300" />
        </div>
        <p className="text-2xl font-bold">
          {(data.visibility / 1000).toFixed(1)} km
        </p>
        <p className="text-sm font-light text-gray-200 dark:text-gray-400 mt-1">
          {t("visibility")}
        </p>
      </div>

      <div className="flex flex-col items-center w-[30%]">
        <div className="bg-white/10 dark:bg-white/5 p-3 rounded-xl mb-2">
          <BsSpeedometer size={24} className="text-slate-300" />
        </div>
        <p className="text-2xl font-bold">{data.main.pressure} hPa</p>
        <p className="text-sm font-light text-gray-200 dark:text-gray-400 mt-1">
          {t("pressure")}
        </p>
      </div>

      <div className="w-full h-px bg-white/20 dark:bg-white/5 my-2"></div>

      <div className="flex flex-col border-none items-center w-[48%] bg-gradient-to-br from-yellow-400/40 to-orange-300/30 dark:from-yellow-500/10 dark:to-orange-500/5 rounded-2xl p-4 shadow-lg dark:bg-[#252525]">
        <div className="flex items-center gap-3 text-yellow-200 mb-1">
          <BsSunrise size={26} />
          <p className="text-2xl font-bold text-white">
            {formatTime(data.sys.sunrise)}
          </p>
        </div>
        <p className="text-sm font-light text-gray-200 dark:text-gray-400">
          {t("sunrise")}
        </p>
      </div>

      <div className="flex flex-col border-none items-center w-[48%] bg-gradient-to-br from-orange-500/40 to-rose-400/30 dark:from-orange-500/10 dark:to-rose-500/5 rounded-2xl p-4 shadow-lg dark:bg-[#252525]">
        <div className="flex items-center gap-3 text-orange-300 mb-1">
          <BsSunset size={26} />
          <p className="text-2xl font-bold text-white">
            {formatTime(data.sys.sunset)}
          </p>
        </div>
        <p className="text-sm font-light text-gray-200 dark:text-gray-400">
          {t("sunset")}
        </p>
      </div>
    </div>
  );
}

export default WeatherDetails;
