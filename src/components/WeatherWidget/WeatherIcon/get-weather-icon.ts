import clearDay from 'Assets/icons/clear-day.svg';
import clearNight from 'Assets/icons/clear-night.svg';
import darkClouds from 'Assets/icons/dark-clouds.svg';
import defaultWeatherIcon from 'Assets/icons/default-weather-icon.svg';
import fewClouds from 'Assets/icons/few-clouds.svg';
import partlyCloudyDay from 'Assets/icons/partly-cloudy-day.svg';
import partlyCloudyNight from 'Assets/icons/partly-cloudy-night.svg';
import patchyRainDay from 'Assets/icons/patchy-rain-day.svg';
import patchyRainNight from 'Assets/icons/patchy-rain-night.svg';
import showerRain from 'Assets/icons/shower-rain.svg';
import snow from 'Assets/icons/snow.svg';
import thunderstorm from 'Assets/icons/thunderstorm.svg';
import windFog from 'Assets/icons/wind-fog.svg';

interface IOptionsIcons {
  [key: string]: string;
}

const icons: IOptionsIcons = {
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
  default: defaultWeatherIcon,
};

const getWeatherIcon = (iconId: string): string => icons[iconId] || icons.default;

export default getWeatherIcon;
