import { useState } from 'react'
import { useStaffStore } from '../../store'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Employee } from '../../types'
import { EmptyState } from '../ui/EmptyState'

export const EmployeeList = () => {
  const { employees, gradeLevels, deleteEmployee } = useStaffStore()
  const [nameFilter, setNameFilter] = useState('')
  const [gradeLevelFilter, setGradeLevelFilter] = useState('')

  const filteredEmployees = employees.filter((employee) => {
    const matchesName = employee.fullName
      .toLowerCase()
      .includes(nameFilter.toLowerCase())
    const matchesGradeLevel =
      !gradeLevelFilter || employee.gradeLevel === gradeLevelFilter
    return matchesName && matchesGradeLevel
  })

  if (employees.length === 0) {
    return (
      <EmptyState
        title="No employees yet"
        description="Add your first employee to get started"
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search by name..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="flex-1"
        />
        <Select
          options={gradeLevels.map((level) => ({
            value: level.id,
            label: level.name,
          }))}
          value={gradeLevelFilter}
          onChange={(e) => setGradeLevelFilter(e.target.value)}
          className="w-full sm:w-48"
          placeholder="Filter by grade"
        />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade Level
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee: Employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.state}, {employee.country}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {gradeLevels.find((level) => level.id === employee.gradeLevel)
                    ?.name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button
                    variant="danger"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 