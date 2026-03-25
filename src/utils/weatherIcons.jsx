import {
  BsSunFill,
  BsMoonStarsFill,
  BsCloudSunFill,
  BsCloudMoonFill,
  BsCloudFill,
  BsCloudRainFill,
  BsCloudDrizzleFill,
  BsCloudLightningRainFill,
  BsCloudSnowFill,
  BsCloudHazeFill,
} from "react-icons/bs";

export const getWeatherIcon = (iconCode, className = "text-6xl") => {
  switch (iconCode) {
    case "01d": // Чистое небо (день) — мягкий желтый
      return (
        <BsSunFill className={`${className} text-yellow-300 drop-shadow-lg`} />
      );
    case "01n": // Чистое небо (ночь) — нежный индиго
      return (
        <BsMoonStarsFill
          className={`${className} text-indigo-200 drop-shadow-lg`}
        />
      );
    case "02d": // Малооблачно (день) — бледный желто-персиковый
      return (
        <BsCloudSunFill
          className={`${className} text-amber-200 drop-shadow-lg`}
        />
      );
    case "02n": // Малооблачно (ночь) — приглушенный сиреневый
      return (
        <BsCloudMoonFill
          className={`${className} text-indigo-300 drop-shadow-lg`}
        />
      );
    case "03d":
    case "03n":
    case "04d":
    case "04n": // Облачно — светлый серо-голубой (slate)
      return (
        <BsCloudFill className={`${className} text-slate-300 drop-shadow-lg`} />
      );
    case "09d":
    case "09n": // Морось — мягкий небесно-голубой
      return (
        <BsCloudDrizzleFill
          className={`${className} text-sky-300 drop-shadow-lg`}
        />
      );
    case "10d":
    case "10n": // Дождь — спокойный синий
      return (
        <BsCloudRainFill
          className={`${className} text-blue-300 drop-shadow-lg`}
        />
      );
    case "11d":
    case "11n": // Гроза — пастельный фиолетовый
      return (
        <BsCloudLightningRainFill
          className={`${className} text-purple-300 drop-shadow-lg`}
        />
      );
    case "13d":
    case "13n": // Снег — слегка голубоватый белый (для объема)
      return (
        <BsCloudSnowFill
          className={`${className} text-blue-50 drop-shadow-lg`}
        />
      );
    case "50d":
    case "50n": // Туман — мягкий серый
      return (
        <BsCloudHazeFill
          className={`${className} text-gray-300 drop-shadow-lg`}
        />
      );
    default:
      return <BsSunFill className={`${className} text-yellow-300`} />;
  }
};
