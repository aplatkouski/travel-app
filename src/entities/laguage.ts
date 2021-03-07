interface Languages {
  en: 'EN';
  ru: 'RU';
  de: 'DE';
}

type Language = keyof Languages;

export default Language;
