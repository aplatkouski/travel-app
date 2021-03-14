import defaultWeatherIcon from '../../../assets/icons/default-weather-icon.svg';
import darkClouds from '../../../assets/icons/dark-clouds.svg';
import fewClouds from '../../../assets/icons/few-clouds.svg';
import clearDay from '../../../assets/icons/clear-day.svg';
import clearNight from '../../../assets/icons/clear-night.svg';
import showerRain from '../../../assets/icons/shower-rain.svg';
import patchyRainDay from '../../../assets/icons/patchy-rain-day.svg';
import patchyRainNight from '../../../assets/icons/patchy-rain-night.svg';
import snow from '../../../assets/icons/snow.svg';
import windFog from '../../../assets/icons/wind-fog.svg';
import thunderstorm from '../../../assets/icons/thunderstorm.svg';
import partlyCloudyDay from '../../../assets/icons/partly-cloudy-day.svg';
import partlyCloudyNight from '../../../assets/icons/partly-cloudy-night.svg';

interface IOptionsIcons {
  [key: string]: string;
}

const icons: IOptionsIcons = {
  default: defaultWeatherIcon,
  '01d': clearDay,
  '01n': clearNight,
  '02d': partlyCloudyDay,
  '02n': partlyCloudyNight,
  '03d': fewClouds,
  '03n': fewClouds,
  '04d': darkClouds,
  '04n': darkClouds,
  '09d': showerRain,
  '09n': showerRain,
  '10d': patchyRainDay,
  '10n': patchyRainNight,
  '11d': thunderstorm,
  '11n': thunderstorm,
  '13d': snow,
  '13n': snow,
  '50d': windFog,
  '50n': windFog,
};

const getWeatherIcon = (iconId: string): string => {
  if (icons[iconId]) {
    return icons[iconId];
  }

  return icons.default;
};

export default getWeatherIcon;
