interface WorldCity {
  country: string
  name: string
  subcountry: string
}

export const fetchCountries = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
    const data: WorldCity[] = await response.json()
    
    // Get unique countries and sort them
    const uniqueCountries = [...new Set(data.map(city => city.country))]
    return uniqueCountries.sort()
  } catch (error) {
    console.error('Error fetching countries:', error)
    return []
  }
}

export const fetchStates = async (country: string): Promise<string[]> => {
  try {
    const response = await fetch('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
    const data: WorldCity[] = await response.json()
    
    // Get unique states for the selected country and sort them
    const uniqueStates = [...new Set(
      data
        .filter(city => city.country === country)
        .map(city => city.subcountry)
        .filter(Boolean) // Remove empty or null values
    )]
    return uniqueStates.sort()
  } catch (error) {
    console.error('Error fetching states:', error)
    return []
  }
} 