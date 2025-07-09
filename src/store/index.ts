import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Employee, GradeLevel } from '../types'

interface StaffState {
  employees: Employee[]
  gradeLevels: GradeLevel[]
  addEmployee: (employee: Employee) => void
  updateEmployee: (id: string, employee: Employee) => void
  deleteEmployee: (id: string) => void
  addGradeLevel: (gradeLevel: GradeLevel) => void
  deleteGradeLevel: (id: string) => void
}

export const useStaffStore = create<StaffState>()(
  persist(
    (set) => ({
      employees: [],
      gradeLevels: [],
      addEmployee: (employee) =>
        set((state) => ({
          employees: [...state.employees, employee],
        })),
      updateEmployee: (id, updatedEmployee) =>
        set((state) => ({
          employees: state.employees.map((emp) =>
            emp.id === id ? { ...emp, ...updatedEmployee } : emp
          ),
        })),
      deleteEmployee: (id) =>
        set((state) => ({
          employees: state.employees.filter((emp) => emp.id !== id),
        })),
      addGradeLevel: (gradeLevel) =>
        set((state) => ({
          gradeLevels: [...state.gradeLevels, gradeLevel],
        })),
      deleteGradeLevel: (id) =>
        set((state) => ({
          gradeLevels: state.gradeLevels.filter((level) => level.id !== id),
        })),
    }),
    {
      name: 'staff-storage',
    }
  )
) 