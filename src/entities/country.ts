import type { ID } from 'Entities/travel-app';

export interface ICountryPreview {
  id: ID;
  name: string;
  capital: string;
  photoUrl: string;
  timezone: string;
  currency: string;
  lat: number;
  lng: number;
}

export interface IRating {
  _id: ID;
  userId: ID;
  rating: number;
}

export interface ISight {
  id: ID;
  description: string;
  name: string;
  photoUrl: string;
  userRating: Array<IRating>;
}

export interface ICountry extends ICountryPreview {
  description: string;
  sights: Array<ISight>;
  videoUrl: string;
}

export type Countries = Array<ICountryPreview>;
