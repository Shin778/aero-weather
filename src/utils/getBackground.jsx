export const getBackgroundClass = (iconCode) => {
  if (!iconCode)
    return "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800";

  switch (iconCode) {
    // --- ДЕНЬ ---
    case "01d": // Ясно
      return "bg-gradient-to-br from-sky-400 via-rose-300 to-amber-200"; // Теплый, рассветный
    case "02d": // Малооблачно
      return "bg-gradient-to-br from-blue-400 via-slate-300 to-blue-200";
    case "03d":
    case "04d": // Облачно
      return "bg-gradient-to-br from-slate-500 via-slate-400 to-slate-500";
    case "09d":
    case "10d": // Дождь
      return "bg-gradient-to-br from-slate-700 via-blue-900 to-slate-800";
    case "11d": // Гроза
      return "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900";
    case "13d": // Снег
      return "bg-gradient-to-br from-blue-100 via-slate-200 to-blue-50";
    case "50d": // Туман
      return "bg-gradient-to-br from-slate-600 via-slate-500 to-slate-400";

    // --- НОЧЬ ---
    case "01n": // Ясно (ночь)
      return "bg-gradient-to-br from-gray-900 via-slate-950 to-black"; // Глубокая ночь
    case "02n": // Малооблачно (ночь)
      return "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900";

    // Для остальных ночных условий (дождь, облака)
    case "03n":
    case "04n":
    case "09n":
    case "10n":
    case "11n":
    case "13n":
    case "50n":
      return "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950";

    default:
      return "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800";
  }
};

export const getTextColorClass = (iconCode) => {
  if (!iconCode) return "text-white"; // По умолчанию текст белый

  switch (iconCode) {
    case "01d": // Ясный день
    case "02d": // Малооблачно день
    case "13d": // Снег
    case "03d":
    case "04d":
    case "50d": // Облачно, Туман
      return "text-slate-900"; // темно-грифельный

    // --- СПИСОК ТЕМНЫХ ФОНОВ  ---
    case "09d":
    case "10d": // Дождь день
    case "11d": // Гроза
    // Все ночные условия по определению темные
    case "01n":
    case "02n":
    case "03n":
    case "04n":
    case "09n":
    case "10n":
    case "11n":
    case "13n":
    case "50n":
      return "text-white";

    default:
      return "text-white";
  }
};
