import { useState } from 'react'
import { useStore } from '@store/index'
import { type EmployeeFormData } from '@schemas/employee'
import { departments } from '@lib/constants'
import { useLocationData } from '../../hooks/useLocationData'

interface EmployeeFormProps {
  onClose: () => void
  initialData?: EmployeeFormData
}

export const inputStyles = {
  base: "mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors duration-200 ease-in-out text-gray-900 placeholder-gray-400 shadow-sm",
  disabled: "bg-gray-50 cursor-not-allowed text-gray-500",
  label: "block text-sm font-medium text-gray-700 mb-1",
  group: "space-y-1.5",
  loading: "relative",
  loadingIndicator: "absolute right-3 top-1/2 transform -translate-y-1/2",
  error: "text-sm text-red-600 mt-1"
}

export const EmployeeForm = ({ onClose, initialData }: EmployeeFormProps) => {
  const { addEmployee, updateEmployee, gradeLevels } = useStore()
  const [formData, setFormData] = useState<EmployeeFormData>(
    initialData || {
      fullName: '',
      email: '',
      phoneNumber: '',
      country: '',
      state: '',
      address: '',
      role: '',
      department: '',
      gradeLevel: '',
    }
  )

  const {
    countries,
    states,
    isLoadingCountries,
    isLoadingStates,
    error
  } = useLocationData(formData.country)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (initialData?.id) {
      updateEmployee(formData)
    } else {
      addEmployee(formData)
    }
    onClose()
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto px-4 -mx-4">
      {error && <div className={inputStyles.error}>{error}</div>}
      
      <div className={inputStyles.group}>
        <label htmlFor="fullName" className={inputStyles.label}>
          Full Name *
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className={inputStyles.base}
          placeholder="John Doe"
        />
      </div>

      <div className={inputStyles.group}>
        <label htmlFor="email" className={inputStyles.label}>
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputStyles.base}
          placeholder="john.doe@example.com"
        />
      </div>

      <div className={inputStyles.group}>
        <label htmlFor="phoneNumber" className={inputStyles.label}>
          Phone Number *
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className={inputStyles.base}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className={inputStyles.group}>
        <label htmlFor="country" className={inputStyles.label}>
          Country *
        </label>
        <div className={inputStyles.loading}>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className={`${inputStyles.base} ${isLoadingCountries ? inputStyles.disabled : ''}`}
            disabled={isLoadingCountries}
          >
            <option value="">Select a country</option>
            {countries.map((country: string) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {isLoadingCountries && (
            <div className={inputStyles.loadingIndicator}>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
            </div>
          )}
        </div>
      </div>

      <div className={inputStyles.group}>
        <label htmlFor="state" className={inputStyles.label}>
          State/Province *
        </label>
        <div className={inputStyles.loading}>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className={`${inputStyles.base} ${(!formData.country || isLoadingStates) ? inputStyles.disabled : ''}`}
            disabled={!formData.country || isLoadingStates}
          >
            <option value="">Select a state</option>
            {states.map((state: string) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {isLoadingStates && (
            <div className={inputStyles.loadingIndicator}>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
            </div>
          )}
        </div>
      </div>

      <div className={inputStyles.group}>
        <label htmlFor="address" className={inputStyles.label}>
          Address *
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className={inputStyles.base}
          placeholder="123 Main St, Apt 4B"
        />
      </div>

      <div className={inputStyles.group}>
        <label htmlFor="role" className={inputStyles.label}>
          Role
        </label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={inputStyles.base}
          required
          maxLength={20}
          placeholder="Enter role (max 20 characters)"
        />
      </div>

      <div className={inputStyles.group}>
        <label htmlFor="department" className={inputStyles.label}>
          Department *
        </label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          className={inputStyles.base}
        >
          <option value="">Select a department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div className={inputStyles.group}>
        <label htmlFor="gradeLevel" className={inputStyles.label}>
          Grade Level
        </label>
        <select
          id="gradeLevel"
          name="gradeLevel"
          value={formData.gradeLevel}
          onChange={handleChange}
          className={inputStyles.base}
        >
          <option value="">Select a grade level (optional)</option>
          {gradeLevels.map((level) => (
            <option key={level.id} value={level.id}>
              {level.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {initialData ? 'Update Employee' : 'Add Employee'}
        </button>
      </div>
    </form>
  )
} 