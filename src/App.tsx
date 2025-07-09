import { useState, useEffect } from 'react'
import { EmployeeList } from './components/EmployeeList'
import { EmployeeForm } from './components/EmployeeForm'
import { GradeLevelManagement } from './components/GradeLevelManagement'
import './styles/App.css'

export const App = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isAddGradeModalOpen, setIsAddGradeModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'employees' | 'grades'>('employees')

  useEffect(() => {
    // Clear old storage format if exists
    const oldStorage = localStorage.getItem('employee-storage')
    if (oldStorage) {
      try {
        const data = JSON.parse(oldStorage)
        if (!data.version) {
          localStorage.removeItem('employee-storage')
          window.location.reload()
        }
      } catch (e) {
        localStorage.removeItem('employee-storage')
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Staff Directory</h1>
            <p className="mt-2 text-sm text-gray-700">
              {activeTab === 'employees' 
                ? 'Manage employees and grade levels in your organization.'
                : 'Manage grade levels for employee classifications.'}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            {activeTab === 'employees' ? (
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
              >
                Add Employee
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddGradeModalOpen(true)}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
              >
                Add Grade Level
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('employees')}
              className={`
                border-b-2 py-4 px-1 text-sm font-medium
                ${
                  activeTab === 'employees'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }
              `}
            >
              Employees
            </button>
            <button
              onClick={() => setActiveTab('grades')}
              className={`
                border-b-2 py-4 px-1 text-sm font-medium
                ${
                  activeTab === 'grades'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }
              `}
            >
              Grade Levels
            </button>
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'employees' ? (
            <EmployeeList />
          ) : (
            <GradeLevelManagement isModalOpen={isAddGradeModalOpen} onCloseModal={() => setIsAddGradeModalOpen(false)} />
          )}
        </div>
      </div>

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
            <EmployeeForm onClose={() => setIsAddModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
