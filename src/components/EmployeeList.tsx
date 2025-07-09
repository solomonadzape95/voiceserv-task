import { useState, useMemo } from 'react'
import { useStore } from '../store'
import { type EmployeeFormData } from '../schemas/employee'
import { EmployeeForm } from './EmployeeForm'
import { Dropdown } from './ui/Dropdown'
import {
  DotsVerticalIcon,
  EditIcon,
  ViewIcon,
  DeleteIcon,
  SearchIcon,
  FilterIcon,
  SortIcon,
  ExportIcon,
  EmailIcon,
  PhoneIcon,
  LocationIcon,
  BriefcaseIcon,
  BuildingIcon,
  StarIcon,
} from './ui/Icons'
import { EmptyState } from './ui/EmptyState'
import { UsersIcon } from '@heroicons/react/24/outline'

const ITEMS_PER_PAGE = 10

type SortField = 'fullName' | 'email' | 'department' | 'role'
type SortOrder = 'asc' | 'desc'

export const EmployeeList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('fullName')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [filterDepartment, setFilterDepartment] = useState('')
  
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
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(employee.id!)
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

  const uniqueDepartments = [...new Set(employees.map(emp => emp.department))]

  return (
    <div className="space-y-4">
      {filteredEmployees.length > 0 && <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <Dropdown
            trigger={
              <button className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <FilterIcon className="w-5 h-5" />
                <span>Filter</span>
              </button>
            }
            items={[
              { label: 'All Departments', onClick: () => setFilterDepartment('') },
              ...uniqueDepartments.map(dept => ({
                label: dept,
                onClick: () => setFilterDepartment(dept)
              }))
            ]}
          />
          <Dropdown
            trigger={
              <button className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <SortIcon className="w-5 h-5" />
                <span>Sort</span>
              </button>
            }
            items={[
              { label: 'Name (A-Z)', onClick: () => { setSortField('fullName'); setSortOrder('asc') } },
              { label: 'Name (Z-A)', onClick: () => { setSortField('fullName'); setSortOrder('desc') } },
              { label: 'Email (A-Z)', onClick: () => { setSortField('email'); setSortOrder('asc') } },
              { label: 'Email (Z-A)', onClick: () => { setSortField('email'); setSortOrder('desc') } },
              { label: 'Department (A-Z)', onClick: () => { setSortField('department'); setSortOrder('asc') } },
              { label: 'Department (Z-A)', onClick: () => { setSortField('department'); setSortOrder('desc') } },
              { label: 'Role (A-Z)', onClick: () => { setSortField('role'); setSortOrder('asc') } },
              { label: 'Role (Z-A)', onClick: () => { setSortField('role'); setSortOrder('desc') } },
            ]}
          />
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <ExportIcon className="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>
      </div>}

      {filteredEmployees.length === 0 ? (
        <EmptyState
          icon={<UsersIcon className="w-12 h-12 text-gray-400" />}
          title={searchTerm || filterDepartment ? "No matching employees" : "No employees"}
          description={searchTerm || filterDepartment 
            ? "Try adjusting your search or filters to find what you're looking for."
            : "Get started by adding your first employee."}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">{employee.fullName}</div>
                      <div className="text-sm text-gray-500">{employee.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{employee.phoneNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{employee.country}</div>
                    <div className="text-sm text-gray-500">{employee.state}</div>
                    <div className="text-sm text-gray-500">{employee.address}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{getGradeLevelName(employee.gradeLevel || '')}</td>
                  <td className="px-6 py-4 text-right">
                    <Dropdown
                      trigger={
                        <button className="p-1 rounded-full hover:bg-gray-100">
                          <DotsVerticalIcon className="w-5 h-5 text-gray-500" />
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

      {totalPages > 1 && (
        <div className="flex justify-between items-center px-6 py-3 bg-white border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(endIndex, filteredEmployees.length)}
                </span>{' '}
                of <span className="font-medium">{filteredEmployees.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === currentPage
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-gray-900">Employee Details</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-medium text-blue-700">
                    {selectedEmployee.fullName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{selectedEmployee.fullName}</h3>
                  <p className="text-sm text-gray-500">{selectedEmployee.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center gap-3">
                  <EmailIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{selectedEmployee.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900">{selectedEmployee.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <LocationIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-sm text-gray-900">
                      {selectedEmployee.address}
                      <br />
                      {selectedEmployee.state}, {selectedEmployee.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BriefcaseIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Role</p>
                    <p className="text-sm text-gray-900">{selectedEmployee.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BuildingIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Department</p>
                    <p className="text-sm text-gray-900">{selectedEmployee.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <StarIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Grade Level</p>
                    <p className="text-sm text-gray-900">
                      {getGradeLevelName(selectedEmployee.gradeLevel || '')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
            <EmployeeForm
              onClose={() => setIsEditModalOpen(false)}
              initialData={selectedEmployee}
            />
          </div>
        </div>
      )}
    </div>
  )
} 