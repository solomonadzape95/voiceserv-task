import axios from 'axios'
import { City } from '../types'

const CITIES_API_URL = 'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json'

export const fetchCitiesData = async (): Promise<City[]> => {
  try {
    const response = await axios.get<City[]>(CITIES_API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching cities data:', error)
    return []
  }
}

export const getCountries = (cities: City[]): string[] => {
  const uniqueCountries = new Set(cities.map((city) => city.country))
  return Array.from(uniqueCountries).sort()
}

export const getStates = (cities: City[], country: string): string[] => {
  const states = cities
    .filter((city) => city.country === country)
    .map((city) => city.admin_name)
    .filter((state): state is string => 
      state !== undefined && 
      state !== null && 
      state !== ''
    )

  // Remove duplicates and sort
  const uniqueStates = Array.from(new Set(states)).sort()
  
  return uniqueStates
} 