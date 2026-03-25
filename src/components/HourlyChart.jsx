import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BsThermometer, BsDroplet, BsWind } from "react-icons/bs";

function HourlyChart({ hourlyData, isCelsius, t }) {
  const [activeTab, setActiveTab] = useState("temp");

  if (!hourlyData || hourlyData.length === 0) return null;

  const chartData = hourlyData.map((item) => {
    const date = new Date(item.dt * 1000);
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tempValue = isCelsius
      ? item.main.temp
      : (item.main.temp * 9) / 5 + 32;

    return {
      time,
      temp: Math.round(tempValue),
      pop: Math.round(item.pop * 100),
      wind: Number(item.wind.speed.toFixed(1)),
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      let unit = "";
      if (activeTab === "temp") unit = isCelsius ? "°C" : "°F";
      if (activeTab === "rain") unit = "%";
      if (activeTab === "wind") unit = " m/s";

      return (
        <div className="bg-white/20 dark:bg-[#252525] backdrop-blur-md dark:backdrop-blur-none p-3 rounded-xl border border-white/10 dark:border-white/5 shadow-lg text-white text-center">
          <p className="text-sm font-light text-white/70 dark:text-gray-400 mb-1">
            {label}
          </p>
          <p className="text-2xl font-bold">
            {payload[0].value}
            {unit}
          </p>
        </div>
      );
    }
    return null;
  };

  const titles = {
    temp: t("temp"),
    rain: t("chanceOfRain"),
    wind: t("windSpeed"),
  };

  return (
    <div className="w-full bg-white/10 dark:bg-[#1e1e1e] backdrop-blur-md dark:backdrop-blur-none rounded-3xl p-6 shadow-2xl border border-white/5 transition-all duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 px-2 gap-4">
        <h3 className="text-white text-lg font-medium tracking-wide text-white/80 dark:text-gray-200">
          {titles[activeTab]}
        </h3>

        <div className="flex bg-white/5 dark:bg-[#252525] p-1 rounded-xl border border-white/10 dark:border-white/5 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("temp")}
            className={`flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
              activeTab === "temp"
                ? "bg-rose-400/30 text-white shadow-sm"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <BsThermometer size={16} /> {t("tempShort") || "Temp"}
          </button>

          <button
            onClick={() => setActiveTab("rain")}
            className={`flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
              activeTab === "rain"
                ? "bg-blue-400/30 text-white shadow-sm"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <BsDroplet size={14} /> {t("rainShort") || "Rain"}
          </button>

          <button
            onClick={() => setActiveTab("wind")}
            className={`flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
              activeTab === "wind"
                ? "bg-teal-400/30 text-white shadow-sm"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <BsWind size={16} /> {t("windShort") || "Wind"}
          </button>
        </div>
      </div>

      <div className="h-[220px] w-full text-white">
        <ResponsiveContainer width="100%" height="100%">
          {/* ... (код графиков остается без изменений) ... */}
          {activeTab === "temp" && (
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fda4af" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#fda4af" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                stroke="#e2e8f0"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                opacity={0.6}
              />
              <YAxis
                stroke="#e2e8f0"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                opacity={0.6}
                tickFormatter={(value) => `${value}°`}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="temp"
                stroke="#fda4af"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorTemp)"
                animationDuration={1000}
              />
            </AreaChart>
          )}

          {activeTab === "rain" && (
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="time"
                stroke="#e2e8f0"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                opacity={0.6}
              />
              <YAxis
                stroke="#e2e8f0"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                opacity={0.6}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
              />
              <Bar
                dataKey="pop"
                fill="#93c5fd"
                radius={[6, 6, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          )}

          {activeTab === "wind" && (
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5eead4" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#5eead4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                stroke="#e2e8f0"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                opacity={0.6}
              />
              <YAxis
                stroke="#e2e8f0"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                opacity={0.6}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="wind"
                stroke="#5eead4"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorWind)"
                animationDuration={1000}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HourlyChart;
