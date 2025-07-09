
import './index.css'
import { useState } from 'react'
import { EmployeeList } from '@components/employees/EmployeeList'
import { EmployeeForm } from '@components/employees/EmployeeForm'
import { GradeLevelManagement } from '@components/grades/GradeLevelManagement'
import { Button } from '@components/ui/Button'
import { Toaster } from 'react-hot-toast'

function App() {
  const [showAddEmployee, setShowAddEmployee] = useState(false)
  const [activeTab, setActiveTab] = useState<'employees' | 'grades'>('employees')

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Staff Directory</h1>
            {activeTab === 'employees' && !showAddEmployee && (
              <Button onClick={() => setShowAddEmployee(true)}>
                Add Employee
              </Button>
            )}
          </div>

          <div className="flex gap-4 border-b border-gray-200">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'employees'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('employees')}
            >
              Employees
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'grades'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('grades')}
            >
              Grade Levels
            </button>
          </div>

          {activeTab === 'employees' ? (
            showAddEmployee ? (
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Add New Employee
                  </h2>
                  <Button
                    variant="secondary"
                    onClick={() => setShowAddEmployee(false)}
                  >
                    Cancel
                  </Button>
                </div>
                <EmployeeForm onSubmit={() => setShowAddEmployee(false)} />
              </div>
            ) : (
              <EmployeeList />
            )
          ) : (
            <GradeLevelManagement />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
