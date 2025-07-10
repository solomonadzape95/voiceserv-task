import { useState, useMemo } from 'react'
import { useStore } from '@store/index'
import { type EmployeeFormData } from '@schemas/employee'
import { EmployeeForm } from './EmployeeForm'
import { Dropdown } from '@components/ui/Dropdown'
import { ConfirmationModal } from '@components/ui/ConfirmationModal'
import {
  DotsVerticalIcon,
  EditIcon,
  ViewIcon,
  DeleteIcon,
  SearchIcon,
  FilterIcon,
  SortIcon,
  ExportIcon,
  UserGroupIcon,
} from '@components/ui/Icons'
import { EmptyState } from '@components/ui/EmptyState'
import { departments } from '@lib/constants'
import { Pagination } from './Pagination'
import { EmployeeViewModal } from './EmployeeViewModal'

const ITEMS_PER_PAGE = 10

type SortField = 'fullName' | 'email' | 'department' | 'role'
type SortOrder = 'asc' | 'desc'

export const EmployeeList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('fullName')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState<EmployeeFormData | null>(null)
  
  const { employees, deleteEmployee, gradeLevels } = useStore()
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeFormData | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const filteredEmployees = useMemo(() => {
    return employees
      .filter((employee) => {
        const matchesSearch = searchTerm === '' || 
          Object.values(employee).some(
            value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        const matchesDepartment = filterDepartment === '' || employee.department === filterDepartment
        return matchesSearch && matchesDepartment
      })
      .sort((a, b) => {
        const aValue = a[sortField]?.toString().toLowerCase() ?? ''
        const bValue = b[sortField]?.toString().toLowerCase() ?? ''
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      })
  }, [employees, searchTerm, filterDepartment, sortField, sortOrder])

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE)
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex)

  const handleView = (employee: EmployeeFormData) => {
    setSelectedEmployee(employee)
    setIsViewModalOpen(true)
  }

  const handleEdit = (employee: EmployeeFormData) => {
    setSelectedEmployee(employee)
    setIsEditModalOpen(true)
  }

  const handleDelete = (employee: EmployeeFormData) => {
    setEmployeeToDelete(employee)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (employeeToDelete?.id) {
      deleteEmployee(employeeToDelete.id)
      setEmployeeToDelete(null)
      setIsDeleteModalOpen(false)
    }
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Country', 'State', 'Address', 'Role', 'Department', 'Grade Level'],
      ...filteredEmployees.map(emp => [
        emp.fullName,
        emp.email,
        emp.phoneNumber,
        emp.country,
        emp.state,
        emp.address,
        emp.role,
        emp.department,
        gradeLevels.find(g => g.id === emp.gradeLevel)?.name || ''
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'employees.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getGradeLevelName = (id: string) => {
    const grade = gradeLevels.find((g) => g.id === id)
    return grade?.name || 'N/A'
  }

  return (
    <div className="space-y-4 min-h-screen">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <Dropdown
            trigger={
              <button className="cursor-pointer px-4 py-2 bg-white shadow-sm rounded-lg hover:bg-gray-50 flex items-center gap-2" >
                <FilterIcon className="w-5 h-5" />
                <span>Filter</span>
              </button>
            }
            items={[
              { label: 'All Departments', onClick: () => setFilterDepartment('') },
              ...departments.map(dept => ({
                label: dept,
                onClick: () => setFilterDepartment(dept)
              }))
            ]}
          />
          <Dropdown
            trigger={
              <button className="cursor-pointer px-4 py-2 bg-white shadow-sm rounded-lg hover:bg-gray-50 flex items-center gap-2" disabled={filteredEmployees.length === 0}>
                <SortIcon className="w-5 h-5" />
                <span>Sort</span>
              </button>
            }
            items={[
              { label: 'Name (A-Z)', onClick: () => handleSort('fullName') },
              { label: 'Name (Z-A)', onClick: () => { handleSort('fullName'); setSortOrder('desc') } },
              { label: 'Email (A-Z)', onClick: () => handleSort('email') },
              { label: 'Email (Z-A)', onClick: () => { handleSort('email'); setSortOrder('desc') } },
              { label: 'Department (A-Z)', onClick: () => handleSort('department') },
              { label: 'Department (Z-A)', onClick: () => { handleSort('department'); setSortOrder('desc') } },
              { label: 'Role (A-Z)', onClick: () => handleSort('role') },
              { label: 'Role (Z-A)', onClick: () => { handleSort('role'); setSortOrder('desc') } },
            ]}
          />
          <button
            onClick={handleExport}
            className="cursor-pointer px-4 py-2 bg-white shadow-sm rounded-lg hover:bg-gray-50 flex items-center gap-2"
            disabled={filteredEmployees.length === 0}
          >
            <ExportIcon className="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {filteredEmployees.length === 0 ? (
        <EmptyState
          icon={UserGroupIcon}
          title={searchTerm || filterDepartment ? "No matching employees" : "No employees"}
          description={searchTerm || filterDepartment 
            ? "Try adjusting your search or filters to find what you're looking for."
            : "Get started by adding your first employee."}
        />
      ) : (
        <div className="overflow-x-auto min-h-screen">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
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
              {currentEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">{employee.fullName}</div>
                      <div className="text-sm text-gray-500">{employee.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="text-sm text-gray-900">{employee.phoneNumber}</div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="text-sm text-gray-900">{employee.state ? `${employee.state}, ` : ''}{employee.country}</div>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-900">{employee.role}</td>
                  <td className="px-6 py-3 text-sm text-gray-900">{employee.department}</td>
                  <td className="px-6 py-3 text-sm text-gray-900">{getGradeLevelName(employee.gradeLevel || '')}</td>
                  <td className="px-6 py-3 text-right">
                    <Dropdown
                      trigger={
                        <button className="p-2 cursor-pointer rounded-full hover:bg-gray-100">
                          <DotsVerticalIcon className="w-5 h-5 text-gray-500 font-bold" />
                        </button>
                      }
                      items={[
                        {
                          label: 'View',
                          icon: <ViewIcon className="w-4 h-4" />,
                          onClick: () => handleView(employee),
                        },
                        {
                          label: 'Edit',
                          icon: <EditIcon className="w-4 h-4" />,
                          onClick: () => handleEdit(employee),
                        },
                        {
                          label: 'Delete',
                          icon: <DeleteIcon className="w-4 h-4" />,
                          onClick: () => handleDelete(employee),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={filteredEmployees.length}
        onPageChange={setCurrentPage}
      />

      {isViewModalOpen && selectedEmployee && (
        <EmployeeViewModal
          employee={selectedEmployee}
          onClose={() => setIsViewModalOpen(false)}
          getGradeLevelName={getGradeLevelName}
        />
      )}

      {isEditModalOpen && selectedEmployee && (
        <EmployeeForm
          initialData={selectedEmployee}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedEmployee(null)
          }}
        />
      )}

      {isDeleteModalOpen && employeeToDelete && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          title="Delete Employee"
          message={`Are you sure you want to delete ${employeeToDelete.fullName}? This action cannot be undone.`}
          confirmText="Delete"
          onConfirm={confirmDelete}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setEmployeeToDelete(null)
          }}
        />
      )}
    </div>
  )
} 