import { z } from 'zod'

export const employeeSchema = z.object({
  id: z.string().optional(),
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters'),
  role: z
    .string()
    .min(2, 'Role must be at least 2 characters')
    .max(50, 'Role must be less than 50 characters'),
  department: z
    .string()
    .min(2, 'Department must be at least 2 characters')
    .max(50, 'Department must be less than 50 characters'),
  gradeLevel: z.string().optional(),
})

export type EmployeeFormData = z.infer<typeof employeeSchema>

export type ValidationErrors = {
  [K in keyof EmployeeFormData]?: string
} 