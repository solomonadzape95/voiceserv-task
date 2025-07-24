import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { type EmployeeFormData } from '../schemas/employee'

interface StoreState {
  employees: EmployeeFormData[]
  gradeLevels: { id: string; name: string }[]
  addEmployee: (employee: EmployeeFormData) => void
  updateEmployee: (employee: EmployeeFormData) => void
  deleteEmployee: (id: string) => void
  addGradeLevel: (name: string) => void
  updateGradeLevel: (id: string, name: string) => void
  deleteGradeLevel: (id: string) => void
}

const STORAGE_KEY = 'employee-storage'

const getInitialState = () => {
  const storedData = localStorage.getItem(STORAGE_KEY)
  if (storedData) {
    try {
      return JSON.parse(storedData)
    } catch (e) {
      console.error('Error parsing stored data:', e)
      return { employees: [], gradeLevels: [], version: 1 }
    }
  }
  return { employees: [], gradeLevels: [], version: 1 }
}

export const useStore = create<StoreState>((set) => {
  const initialState = getInitialState()
  
  const saveToStorage = (state: StoreState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, version: 1 }))
  }

  return {
    employees: initialState.employees || [],
    gradeLevels: initialState.gradeLevels || [],

    addEmployee: (employee: EmployeeFormData) =>
      set((state) => {
        const newState = {
          employees: [...state.employees, { ...employee, id: uuidv4() }],
        }
        saveToStorage({ ...state, ...newState })
        return newState
      }),

    updateEmployee: (employee: EmployeeFormData) =>
      set((state) => {
        const newState = {
          employees: state.employees.map((e) =>
            e.id === employee.id ? employee : e
          ),
        }
        saveToStorage({ ...state, ...newState })
        return newState
      }),

    deleteEmployee: (id: string) =>
      set((state) => {
        const newState = {
          employees: state.employees.filter((e) => e.id !== id),
        }
        saveToStorage({ ...state, ...newState })
        return newState
      }),

    addGradeLevel: (name: string) =>
      set((state) => {
        const newState = {
          gradeLevels: [...state.gradeLevels, { id: uuidv4(), name }],
        }
        saveToStorage({ ...state, ...newState })
        return newState
      }),

    updateGradeLevel: (id: string, name: string) =>
      set((state) => {
        const newState = {
          gradeLevels: state.gradeLevels.map((level) =>
            level.id === id ? { ...level, name } : level
          ),
        }
        saveToStorage({ ...state, ...newState })
        return newState
      }),

    deleteGradeLevel: (id: string) =>
      set((state) => {
        const newState = {
          gradeLevels: state.gradeLevels.filter((level) => level.id !== id),
        }
        saveToStorage({ ...state, ...newState })
        return newState
      }),
  }
}) 