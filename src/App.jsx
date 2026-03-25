import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import WeatherTop from "./components/WeatherTop";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import HourlyChart from "./components/HourlyChart";
import AiChat from "./components/AiChat";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import "./App.css";

import { translations } from "./utils/translations";

function App() {
  const [data, setData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [location, setLocation] = useState("");

  // 1. Инициализация темы из localStorage (по умолчанию dark, если пусто)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  const [isCelsius, setIsCelsius] = useState(true);
  const [lang, setLang] = useState("en");
  const [isLangOpen, setIsLangOpen] = useState(false);

  const t = (key) => translations[lang][key] || key;

  const languages = [
    { code: "en", label: "EN" },
    { code: "ru", label: "RU" },
    { code: "az", label: "AZ" },
  ];

  const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      executeSearch(savedCity);
    }
  }, []);

  useEffect(() => {
    if (data.name) {
      executeSearch(data.name);
    }
  }, [lang]);

  const fetchWeatherData = (weatherUrl, forecastUrl) => {
    axios
      .get(weatherUrl)
      .then((response) => {
        setData(response.data);
        localStorage.setItem("lastCity", response.data.name);
      })
      .catch((err) => console.error("Weather fetch error:", err));

    axios
      .get(forecastUrl)
      .then((response) => {
        const dailyData = response.data.list.filter((reading) =>
          reading.dt_txt.includes("12:00:00"),
        );
        setForecastData(dailyData);
        setHourlyForecast(response.data.list.slice(0, 8));
      })
      .catch((err) => console.error("Forecast fetch error:", err));

    setLocation("");
  };

  const executeSearch = (searchTerm) => {
    if (!searchTerm) return;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&lang=${lang}&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&units=metric&lang=${lang}&appid=${API_KEY}`;
    fetchWeatherData(weatherUrl, forecastUrl);
  };

  const handleGeoSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=${lang}&appid=${API_KEY}`;
          const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=${lang}&appid=${API_KEY}`;
          fetchWeatherData(weatherUrl, forecastUrl);
        },
        (error) => {
          console.error("Geo error:", error);
        },
      );
    }
  };

  const SettingsPanel = () => (
    <div className="flex gap-3">
      <div className="relative">
        <button
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="w-14 h-12 flex items-center justify-center rounded-xl bg-white/20 dark:bg-[#1e1e1e] backdrop-blur-md dark:backdrop-blur-none shadow-md border border-white/20 dark:border-white/5 text-white dark:text-gray-300 font-bold hover:scale-105 transition-all"
        >
          {languages.find((l) => l.code === lang)?.label}
        </button>
        {isLangOpen && (
          <div className="absolute top-14 left-0 w-full bg-white dark:bg-[#252525] rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden z-50 flex flex-col">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setIsLangOpen(false);
                }}
                className={`py-2 font-bold transition-colors ${lang === l.code ? "bg-blue-500 text-white" : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => setIsCelsius(!isCelsius)}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 dark:bg-[#1e1e1e] backdrop-blur-md dark:backdrop-blur-none shadow-md border border-white/20 dark:border-white/5 text-white dark:text-gray-300 font-bold hover:scale-110 transition-all"
      >
        {isCelsius ? "°C" : "°F"}
      </button>

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 dark:bg-[#1e1e1e] backdrop-blur-md dark:backdrop-blur-none shadow-md border border-white/20 dark:border-white/5 text-yellow-300 dark:text-gray-300 hover:scale-110 transition-all"
      >
        {isDarkMode ? <BsSunFill size={22} /> : <BsMoonStarsFill size={22} />}
      </button>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 dark:bg-[#121212] dark:bg-none font-sans transition-colors duration-500 text-white overflow-x-hidden">
      <div className="max-w-[1100px] min-h-screen m-auto px-4 py-8 flex flex-col relative">
        {!data.name ? (
          <div className="flex-1 flex flex-col justify-center items-center w-full gap-8">
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter drop-shadow-2xl">
              Aero<span className="text-blue-400">.</span>
            </h1>
            <div className="w-full max-w-2xl">
              <Search
                location={location}
                setLocation={setLocation}
                executeSearch={executeSearch}
                handleGeoSearch={handleGeoSearch}
                t={t}
              />
            </div>
            <SettingsPanel />
          </div>
        ) : (
          <div className="w-full">
            <header className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full mb-12">
              <h2
                className="text-3xl font-black tracking-tighter cursor-pointer hover:scale-105 transition-transform"
                onClick={() => {
                  setData({});
                  localStorage.removeItem("lastCity");
                }}
              >
                Aero<span className="text-blue-400">.</span>
              </h2>
              <div className="w-full max-w-md">
                <Search
                  location={location}
                  setLocation={setLocation}
                  executeSearch={executeSearch}
                  handleGeoSearch={handleGeoSearch}
                  t={t}
                />
              </div>
              <SettingsPanel />
            </header>

            <main className="flex flex-col pb-10 gap-8">
              <div className="flex flex-col md:flex-row justify-between gap-8">
                <section className="flex flex-col basis-3/5 gap-8">
                  <WeatherTop data={data} isCelsius={isCelsius} t={t} />
                  <WeatherDetails data={data} isCelsius={isCelsius} t={t} />
                </section>
                <aside className="basis-2/5">
                  <Forecast
                    forecastData={forecastData}
                    isCelsius={isCelsius}
                    t={t}
                    lang={lang}
                  />
                </aside>
              </div>
              <HourlyChart
                hourlyData={hourlyForecast}
                isCelsius={isCelsius}
                t={t}
              />
              <AiChat currentWeatherData={data} t={t} lang={lang} />
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
