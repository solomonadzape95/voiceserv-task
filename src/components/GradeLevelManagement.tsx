import { useState } from 'react'
import { useStore } from '../store'
import { GradeLevel } from '../schemas/employee'
import { EmptyState } from './ui/EmptyState'
import { AcademicCapIcon } from '@heroicons/react/24/outline'

export const GradeLevelManagement = () => {
  const { gradeLevels, addGradeLevel, updateGradeLevel, deleteGradeLevel } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<GradeLevel | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedGradeLevel) {
      updateGradeLevel(selectedGradeLevel.id, { name, description })
    } else {
      addGradeLevel({ name, description })
    }
    handleCloseModal()
  }

  const handleOpenModal = (gradeLevel?: GradeLevel) => {
    if (gradeLevel) {
      setSelectedGradeLevel(gradeLevel)
      setName(gradeLevel.name)
      setDescription(gradeLevel.description)
    } else {
      setSelectedGradeLevel(null)
      setName('')
      setDescription('')
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedGradeLevel(null)
    setName('')
    setDescription('')
  }

  const handleDelete = (gradeLevel: GradeLevel) => {
    if (window.confirm('Are you sure you want to delete this grade level?')) {
      deleteGradeLevel(gradeLevel.id)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Grade Levels</h2>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Grade Level
        </button>
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
                    <p className="text-sm text-gray-500">{gradeLevel.description}</p>
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
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
    </div>
  )
} 