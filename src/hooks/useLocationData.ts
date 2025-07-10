import { useState, useEffect } from 'react'
import { fetchCountries, fetchStates } from '@services/locationService'

interface LocationData {
  countries: string[]
  states: string[]
  isLoadingCountries: boolean
  isLoadingStates: boolean
  error: string | null
}

export const useLocationData = (selectedCountry: string): LocationData => {
  const [countries, setCountries] = useState<string[]>([])
  const [states, setStates] = useState<string[]>([])
  const [isLoadingCountries, setIsLoadingCountries] = useState(false)
  const [isLoadingStates, setIsLoadingStates] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch countries on mount
  useEffect(() => {
    const loadCountries = async () => {
      setIsLoadingCountries(true)
      setError(null)
      try {
        const data = await fetchCountries()
        setCountries(data)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error fetching countries'
        console.error('Error loading countries:', error)
        setError(errorMessage)
        setCountries([])
      } finally {
        setIsLoadingCountries(false)
      }
    }
    loadCountries()
  }, [])

  // Fetch states when country changes
  useEffect(() => {
    const loadStates = async () => {
      if (!selectedCountry) {
        setStates([])
        return
      }

      setIsLoadingStates(true)
      setError(null)
      try {
        const data = await fetchStates(selectedCountry)
        setStates(data)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error fetching states'
        console.error('Error loading states:', error)
        setError(errorMessage)
        setStates([])
      } finally {
        setIsLoadingStates(false)
      }
    }
    loadStates()
  }, [selectedCountry])

  return {
    countries,
    states,
    isLoadingCountries,
    isLoadingStates,
    error
  }
} 