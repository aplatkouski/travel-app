import { Language } from 'Entities/travel-app';
import de from './de.json';
import en from './en.json';
import ru from './ru.json';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getDictionary = (language: Language) =>
  ({
    de,
    en,
    ru,
  }[language]);

export default getDictionary;
