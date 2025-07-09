import { FolderIcon } from '@heroicons/react/24/outline'

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
}

export const EmptyState = ({
  title,
  description,
  icon = <FolderIcon className="w-12 h-12 text-gray-400" />,
}: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  )
} 