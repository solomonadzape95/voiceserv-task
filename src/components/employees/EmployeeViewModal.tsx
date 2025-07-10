import { type EmployeeFormData } from '@schemas/employee'
import {
  EmailIcon,
  PhoneContactIcon,
  LocationIcon,
  RoleIcon,
  DepartmentIcon,
  GradeIcon,
  UserSingleIcon,
} from '@components/ui/Icons'

interface EmployeeViewModalProps {
  employee: EmployeeFormData
  onClose: () => void
  getGradeLevelName: (id: string) => string
}

export const EmployeeViewModal = ({ employee, onClose, getGradeLevelName }: EmployeeViewModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-lg w-full overflow-y-auto max-h-[calc(100vh-6rem)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold text-gray-900">Employee Details</h2>
          <button
            onClick={onClose}
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
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-xl font-medium text-purple-700">
                <UserSingleIcon className="w-6 h-6" />
              </span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{employee.fullName}</h3>
              <p className="text-sm text-gray-500">{employee.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center gap-3">
              <EmailIcon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-sm text-gray-900">{employee.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <PhoneContactIcon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-sm text-gray-900">{employee.phoneNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LocationIcon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-sm text-gray-900">
                  {employee.address}
                  <br />
                  {employee.state && `${employee.state}, `}{employee.country}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <RoleIcon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="text-sm text-gray-900">{employee.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DepartmentIcon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Department</p>
                <p className="text-sm text-gray-900">{employee.department}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <GradeIcon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Grade Level</p>
                <p className="text-sm text-gray-900">{getGradeLevelName(employee.gradeLevel || '')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 