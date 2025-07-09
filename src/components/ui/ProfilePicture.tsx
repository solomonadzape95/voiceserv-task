import { useState, useRef } from 'react'

const EMOJI_OPTIONS = ['👨', '👨🏻', '👩', '👩🏻']

interface ProfilePictureProps {
  value: string
  type: 'emoji' | 'image'
  onChange: (type: 'emoji' | 'image', value: string) => void
  size?: 'sm' | 'md' | 'lg'
}

export const ProfilePicture = ({ value, type, onChange, size = 'md' }: ProfilePictureProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl'
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onChange('image', result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="relative">
      <div 
        className={`${sizeClasses[size]} rounded-full bg-purple-100 flex items-center justify-center cursor-pointer overflow-hidden`}
        onClick={() => setShowEmojiPicker(true)}
      >
        {type === 'emoji' ? (
          <span className="select-none">{value || '👤'}</span>
        ) : (
          value ? (
            <img src={value} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="select-none">👤</span>
          )
        )}
      </div>

      {showEmojiPicker && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-2 z-50">
          <div className="flex gap-2 mb-2">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  onChange('emoji', emoji)
                  setShowEmojiPicker(false)
                }}
                className="text-2xl hover:bg-gray-100 p-1 rounded"
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="border-t pt-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              Upload Image
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <button
            onClick={() => setShowEmojiPicker(false)}
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
} 