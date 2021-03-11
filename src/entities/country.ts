import ID from 'Entities/id';

export interface ICountryPreview {
  id: ID;
  name: string;
  capital: string;
  photoUrl: string;
}

export interface Rating {
  _id: string;
  userId: string;
  rating: number;
}

export interface ISight {
  id: ID;
  description: string;
  name: string;
  photoUrl: string;
  reviews: Array<Rating>;
}

export interface ICountry extends ICountryPreview {
  description: string;
  sights: Array<ISight>;
  videoUrl: string;
}

export type Countries = Array<ICountryPreview>;
