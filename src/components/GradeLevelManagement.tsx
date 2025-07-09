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

  const confirmDelete = () => {
    if (gradeToDelete) {
      deleteGradeLevel(gradeToDelete.id)
      setGradeToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-lg font-medium text-gray-900">Grade Levels</h2>
          <p className="mt-2 text-sm text-gray-700">
            Manage grade levels for employee classifications.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Grade Level
          </button>
        </div>
      </div>

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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-medium mb-4">
              {selectedGradeLevel ? 'Edit Grade Level' : 'Add Grade Level'}
            </h2>
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
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {selectedGradeLevel ? 'Save Changes' : 'Add Grade Level'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Grade Level"
        message={`Are you sure you want to delete "${gradeToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  )
} 