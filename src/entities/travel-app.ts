export type Languages = {
  de: 'German';
  en: 'English';
  ru: 'Russian';
};

export type Language = keyof Languages;
export type ID = string;

export type Translation<T> = {
  [key in keyof T]: string;
};

export type IDictionary<T> = {
  [key in keyof Languages]: Translation<T>;
};
