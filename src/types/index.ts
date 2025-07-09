export interface Employee {
  id: string;
  fullName: string;
  country: string;
  state: string;
  address: string;
  role: string;
  department: string;
  gradeLevel?: string;
}

export interface GradeLevel {
  id: string;
  name: string;
}

export interface City {
  city: string;
  city_ascii: string;
  lat: number;
  lng: number;
  country: string;
  iso2: string;
  iso3: string;
  admin_name: string;
  capital: string;
  population: number;
  id: number;
} 