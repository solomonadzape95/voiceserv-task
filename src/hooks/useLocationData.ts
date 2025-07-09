import { useState, useEffect } from 'react'
import { fetchCitiesData, getCountries, getStates } from '@services/api'
import { City } from '../types'

export const useLocationData = (selectedCountry: string) => {
  const [countries, setCountries] = useState<string[]>([])
  const [states, setStates] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [citiesData, setCitiesData] = useState<City[]>([])

  // Fetch cities data on mount
  useEffect(() => {
    const loadCitiesData = async () => {
      try {
        const data = await fetchCitiesData()
        setCitiesData(data)
        const countryList = getCountries(data)
        setCountries(countryList)
        setLoading(false)
      } catch (err) {
        setError('Failed to load location data')
        setLoading(false)
      }
    }

    loadCitiesData()
  }, [])

  // Update states when country changes
  useEffect(() => {
    if (selectedCountry && citiesData.length > 0) {
      const stateList = getStates(citiesData, selectedCountry)
      setStates(stateList)
    } else {
      setStates([])
    }
  }, [selectedCountry, citiesData])

  return {
    countries,
    states,
    loading,
    error,
  }
} 