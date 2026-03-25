import { BsCalendar4 } from "react-icons/bs";
import { getWeatherIcon } from "../utils/weatherIcons";

function Forecast({ forecastData, isCelsius, t, lang }) {
  if (!forecastData || forecastData.length === 0) return null;

  return (
    <div className="w-full h-full flex flex-col justify-center bg-white/20 dark:bg-[#1e1e1e] backdrop-blur-md dark:backdrop-blur-none rounded-2xl p-6 shadow-xl dark:shadow-2xl border border-white/10 dark:border-white/5 text-white transition-colors duration-500">
      <h3 className="flex items-center gap-3 text-xl font-bold mb-6 border-b border-white/20 dark:border-white/10 pb-4">
        <div className="bg-white/10 dark:bg-white/5 p-3 rounded-xl">
          <BsCalendar4 size={24} className="text-white" />
        </div>
        {t("forecast")}
      </h3>

      <div className="flex flex-col gap-5">
        {forecastData.map((item, index) => {
          const date = new Date(item.dt_txt);
          const locale =
            lang === "ru" ? "ru-RU" : lang === "az" ? "az-AZ" : "en-US";
          const dayName = date.toLocaleDateString(locale, { weekday: "long" });

          const iconCode = item.weather[0].icon;
          const tempValue = isCelsius
            ? item.main.temp
            : (item.main.temp * 9) / 5 + 32;

          return (
            <div
              key={index}
              className="flex justify-between items-center bg-white/10 dark:bg-white/5 rounded-lg p-7 hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
            >
              <div className="w-1/3 flex justify-center">
                {getWeatherIcon(iconCode, "text-4xl")}
              </div>

              <p className="capitalize text-lg font-semibold text-gray-200 dark:text-gray-300 w-1/3">
                {dayName}
              </p>

              <p className="text-xl font-bold w-1/3 text-right">
                {tempValue.toFixed()}°{isCelsius ? "C" : "F"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
