import { useState } from 'react'
import { z } from 'zod'
import { ValidationErrors } from '@schemas/employee'

export const useFormValidation = <T extends z.ZodType>(schema: T) => {
  const [errors, setErrors] = useState<ValidationErrors>({})

  const validate = (data: unknown): data is z.infer<T> => {
    try {
      schema.parse(data)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ValidationErrors] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  return {
    errors,
    validate,
    setErrors,
  }
} 