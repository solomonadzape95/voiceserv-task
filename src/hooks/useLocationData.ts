import { useState, useEffect } from 'react'
import { getCountries, getStates } from '../services/api'

export const useLocationData = (selectedCountry: string) => {
  const [countries, setCountries] = useState<string[]>([])
  const [states, setStates] = useState<string[]>([])
  const [isLoadingCountries, setIsLoadingCountries] = useState(false)
  const [isLoadingStates, setIsLoadingStates] = useState(false)

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoadingCountries(true)
      try {
        const data = await getCountries()
        setCountries(data)
      } catch (error) {
        console.error('Error fetching countries:', error)
      } finally {
        setIsLoadingCountries(false)
      }
    }

    fetchCountries()
  }, [])

  useEffect(() => {
    const fetchStates = async () => {
      if (!selectedCountry) {
        setStates([])
        return
      }

      setIsLoadingStates(true)
      try {
        const data = await getStates(selectedCountry)
        setStates(data)
      } catch (error) {
        console.error('Error fetching states:', error)
      } finally {
        setIsLoadingStates(false)
      }
    }

    fetchStates()
  }, [selectedCountry])

  return { countries, states, isLoadingCountries, isLoadingStates }
} 