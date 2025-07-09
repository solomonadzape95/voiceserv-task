import { useState } from 'react'
import { useStore } from '@/store/index'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Employee } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import { useLocationData } from '../../hooks/useLocationData'
import { useFormValidation } from '../../hooks/useFormValidation'
import { employeeSchema, EmployeeFormData } from '../../schemas/employee'
import toast from 'react-hot-toast'

interface EmployeeFormProps {
  employee?: Employee
  onSubmit: () => void
}

export const EmployeeForm = ({ employee, onSubmit }: EmployeeFormProps) => {
  const { addEmployee, updateEmployee } = useStore()
  const [formData, setFormData] = useState<Partial<EmployeeFormData>>(
    employee || {
      fullName: '',
      email: '',
      country: '',
      state: '',
      address: '',
      role: '',
      department: '',
      gradeLevel: '',
    }
  )

  const { countries, states, isLoadingCountries, isLoadingStates } = useLocationData(
    formData.country || ''
  )
  const { errors, validate } = useFormValidation(employeeSchema)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate(formData)) {
      toast.error('Please fix the form errors')
      return
    }

    try {
      if (employee) {
        updateEmployee(formData as EmployeeFormData)
        toast.success('Employee updated successfully')
      } else {
        addEmployee({
          ...formData,
          id: uuidv4(),
        } as EmployeeFormData)
        toast.success('Employee added successfully')
      }
      onSubmit()
    } catch (err) {
      toast.error('Failed to save employee')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev: Partial<EmployeeFormData>) => {
      // If country changes, reset state
      if (name === 'country') {
        return { ...prev, [name]: value, state: '' }
      }
      return { ...prev, [name]: value }
    })
  }

  if (isLoadingCountries || isLoadingStates) return <div>Loading...</div>
  // if (locationError) return <div className="text-red-500">{locationError}</div>

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto px-4 -mx-4">
      <Input
        label="Full Name"
        name="fullName"
        value={formData.fullName || ''}
        onChange={handleChange}
        error={errors.fullName}
        required
      />

      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email || ''}
        onChange={handleChange}
        error={errors.email}
        required
      />
      
      <Select
        label="Country"
        name="country"
        value={formData.country || ''}
        onChange={handleChange}
        options={countries.map((country: string) => ({
          value: country,
          label: country,
        }))}
        error={errors.country}
        required
      />
      
      <Select
        label="State"
        name="state"
        value={formData.state || ''}
        onChange={handleChange}
        options={states.map((state: string) => ({
          value: state,
          label: state,
        }))}
        disabled={!formData.country}
        error={errors.state}
        required
      />
      
      <Input
        label="Address"
        name="address"
        value={formData.address || ''}
        onChange={handleChange}
        error={errors.address}
        required
      />
      
      <Input
        label="Role"
        name="role"
        value={formData.role || ''}
        onChange={handleChange}
        error={errors.role}
        required
      />
      
      <Input
        label="Department"
        name="department"
        value={formData.department || ''}
        onChange={handleChange}
        error={errors.department}
        required
      />
      
      <Select
        label="Grade Level"
        name="gradeLevel"
        value={formData.gradeLevel || ''}
        onChange={handleChange}
        options={[]}
        error={errors.gradeLevel}
      />
      
      <Button type="submit">
        {employee ? 'Update Employee' : 'Add Employee'}
      </Button>
    </form>
  )
} 