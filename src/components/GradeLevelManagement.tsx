import { useState } from 'react'
import { useStore } from '../store'
import type { GradeLevel } from '../store'
import { EmptyState } from './ui/EmptyState'
import { ConfirmationModal } from './ui/ConfirmationModal'
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import { inputStyles } from './EmployeeForm'

export const GradeLevelManagement = () => {
  const { gradeLevels, addGradeLevel, deleteGradeLevel } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<GradeLevel | null>(null)
  const [gradeToDelete, setGradeToDelete] = useState<GradeLevel | null>(null)
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedGradeLevel) {
      // Since we don't have updateGradeLevel, we'll delete and add
      deleteGradeLevel(selectedGradeLevel.id)
      addGradeLevel(name)
    } else {
      addGradeLevel(name)
    }
    handleCloseModal()
  }

  const handleOpenModal = (gradeLevel?: GradeLevel) => {
    if (gradeLevel) {
      setSelectedGradeLevel(gradeLevel)
      setName(gradeLevel.name)
    } else {
      setSelectedGradeLevel(null)
      setName('')
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedGradeLevel(null)
    setName('')
  }

  const handleDelete = (gradeLevel: GradeLevel) => {
    setGradeToDelete(gradeLevel)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (gradeToDelete) {
      deleteGradeLevel(gradeToDelete.id)
      setGradeToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      {gradeLevels.length === 0 ? (
        <EmptyState
          icon={<AcademicCapIcon className="w-12 h-12 text-gray-400" />}
          title="No grade levels"
          description="Get started by adding your first grade level."
        />
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {gradeLevels.map((gradeLevel) => (
              <li key={gradeLevel.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{gradeLevel.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(gradeLevel)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(gradeLevel)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedGradeLevel ? 'Edit Grade Level' : 'Add Grade Level'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputStyles.base}
                  placeholder="Enter grade level name"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {selectedGradeLevel ? 'Update Grade Level' : 'Add Grade Level'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Grade Level"
        message={`Are you sure you want to delete ${gradeToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  )
} 