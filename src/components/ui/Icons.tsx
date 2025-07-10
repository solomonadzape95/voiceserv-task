import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  EyeIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  StarIcon,
  FolderIcon,
  AcademicCapIcon,
  UserIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

interface IconProps {
  className?: string
}

export const DotsVerticalIcon = ({ className = '' }: IconProps) => (
  <EllipsisVerticalIcon className={className} />
)

export const EditIcon = ({ className = '' }: IconProps) => (
  <PencilSquareIcon className={className} />
)

export const ViewIcon = ({ className = '' }: IconProps) => (
  <EyeIcon className={className} />
)

export const DeleteIcon = ({ className = '' }: IconProps) => (
  <TrashIcon className={className} />
)

export const SearchIcon = ({ className = '' }: IconProps) => (
  <MagnifyingGlassIcon className={className} />
)

export const FilterIcon = ({ className = '' }: IconProps) => (
  <FunnelIcon className={className} />
)

export const SortIcon = ({ className = '' }: IconProps) => (
  <ArrowsUpDownIcon className={className} />
)

export const ExportIcon = ({ className = '' }: IconProps) => (
  <ArrowDownTrayIcon className={className} />
)

export const EmailIcon = ({ className = '' }: IconProps) => (
  <EnvelopeIcon className={className} />
)

export const LocationIcon = ({ className = '' }: IconProps) => (
  <MapPinIcon className={className} />
)

export const RoleIcon = ({ className = '' }: IconProps) => (
  <BriefcaseIcon className={className} />
)

export const DepartmentIcon = ({ className = '' }: IconProps) => (
  <BuildingOfficeIcon className={className} />
)

export const GradeIcon = ({ className = '' }: IconProps) => (
  <StarIcon className={className} />
)

export const EmptyIcon = ({ className = '' }: IconProps) => (
  <FolderIcon className={className} />
)

export const AcademicIcon = ({ className = '' }: IconProps) => (
  <AcademicCapIcon className={className} />
)

export const UserSingleIcon = ({ className = '' }: IconProps) => (
  <UserIcon className={className} />
)

export const UserGroupIcon = ({ className = '' }: IconProps) => (
  <UsersIcon className={className} />
)

export const PhoneContactIcon = ({ className = '' }: IconProps) => (
  <PhoneIcon className={className} />
) 