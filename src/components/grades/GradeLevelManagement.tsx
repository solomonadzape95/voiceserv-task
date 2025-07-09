import { useState } from 'react'
import { useStaffStore } from '../../store'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { v4 as uuidv4 } from 'uuid'

export const GradeLevelManagement = () => {
  const { gradeLevels, addGradeLevel, deleteGradeLevel } = useStaffStore()
  const [newGradeLevel, setNewGradeLevel] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newGradeLevel.trim()) {
      setError('Please enter a grade level name')
      return
    }

    const exists = gradeLevels.some(
      (level) => level.name.toLowerCase() === newGradeLevel.toLowerCase()
    )

    if (exists) {
      setError('This grade level already exists')
      return
    }

    addGradeLevel({
      id: uuidv4(),
      name: newGradeLevel.trim(),
    })
    
    setNewGradeLevel('')
    setError('')
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <Input
          placeholder="Enter new grade level..."
          value={newGradeLevel}
          onChange={(e) => setNewGradeLevel(e.target.value)}
          error={error}
          className="flex-1"
        />
        <Button type="submit">Add Grade Level</Button>
      </form>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade Level
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {gradeLevels.map((level) => (
              <tr key={level.id}>
                <td className="px-6 py-4 whitespace-nowrap">{level.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button
                    variant="danger"
                    onClick={() => deleteGradeLevel(level.id)}
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