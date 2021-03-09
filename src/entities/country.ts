import ID from 'Entities/id';

export interface ICountryPreview {
  id: ID;
  name: string;
  capital: string;
  photoUrl: string;
}

export interface ISight {
  id: ID;
  description: string;
  photoUrl: string;
  reviews: Array<{ userId: string; rating: number }>;
}

export interface ICountry extends ICountryPreview {
  description: string;
  sights: Array<ISight>;
  videoUrl: string;
}

export type Countries = Array<ICountry>;

export interface DBCountry extends Omit<ICountry, 'id'> {
  _id: ID;
}

export type DBCountries = Array<DBCountry>;
