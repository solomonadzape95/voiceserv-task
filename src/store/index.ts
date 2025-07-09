import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type EmployeeFormData } from '../schemas/employee'

interface GradeLevel {
  id: string
  name: string
}

interface StoreState {
  employees: EmployeeFormData[]
  gradeLevels: GradeLevel[]
  addEmployee: (employee: EmployeeFormData) => void
  updateEmployee: (employee: EmployeeFormData) => void
  deleteEmployee: (id: string) => void
  addGradeLevel: (name: string) => void
  deleteGradeLevel: (id: string) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      employees: [],
      gradeLevels: [],
      addEmployee: (employee) =>
        set((state) => ({
          employees: [
            ...state.employees,
            {
              ...employee,
              id: crypto.randomUUID(),
            },
          ],
        })),
      updateEmployee: (employee) =>
        set((state) => ({
          employees: state.employees.map((e) => (e.id === employee.id ? employee : e)),
        })),
      deleteEmployee: (id) =>
        set((state) => ({
          employees: state.employees.filter((e) => e.id !== id),
        })),
      addGradeLevel: (name) =>
        set((state) => ({
          gradeLevels: [
            ...state.gradeLevels,
            {
              id: crypto.randomUUID(),
              name,
            },
          ],
        })),
      deleteGradeLevel: (id) =>
        set((state) => ({
          gradeLevels: state.gradeLevels.filter((level) => level.id !== id),
        })),
    }),
    {
      name: 'employee-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migrate old grade levels to new format
          const migratedGradeLevels = (persistedState.gradeLevels || []).map((level: any) => {
            if (typeof level === 'object' && level.name) {
              return {
                id: level.id || crypto.randomUUID(),
                name: level.name
              }
            }
            return {
              id: crypto.randomUUID(),
              name: String(level)
            }
          })

          return {
            ...persistedState,
            gradeLevels: migratedGradeLevels
          }
        }
        return persistedState
      }
    }
  )
)

export type { GradeLevel } 