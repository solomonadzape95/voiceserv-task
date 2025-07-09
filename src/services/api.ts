
const BASE_URL = 'https://countriesnow.space/api/v0.1'

interface CountriesResponse {
  error: boolean
  msg: string
  data: Array<{
    country: string
  }>
}

interface StatesResponse {
  error: boolean
  msg: string
  data: {
    name: string
    states: Array<{
      name: string
      state_code: string
    }>
  }
}

export const getCountries = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${BASE_URL}/countries`)
    if (!response.ok) {
      throw new Error('Failed to fetch countries')
    }
    const data: CountriesResponse = await response.json()
    if (data.error) {
      throw new Error(data.msg)
    }
    return data.data.map((item) => item.country).sort()
  } catch (error) {
    console.error('Error fetching countries:', error)
    return []
  }
}

export const getStates = async (country: string): Promise<string[]> => {
  try {
    const response = await fetch(`${BASE_URL}/countries/states`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ country }),
    })
    if (!response.ok) {
      throw new Error('Failed to fetch states')
    }
    const data: StatesResponse = await response.json()
    if (data.error) {
      throw new Error(data.msg)
    }
    return data.data.states.map((state) => state.name).sort()
  } catch (error) {
    console.error('Error fetching states:', error)
    return []
  }
} 