import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUserInterests } from '../features/userSlice'
import { X } from 'lucide-react'

interface InterestModalProps {
  isOpen: boolean
  onClose: () => void
}

const INTERESTS = [
  { id: 'pausas-fisicas', name: 'Pausas activas físicas' },
  { id: 'pausas-visuales', name: 'Pausas activas visuales' },
  { id: 'pausas-cognitivas', name: 'Pausas activas cognitivas' },
  { id: 'pausas-recreativas', name: 'Pausas recreativas' },
  { id: 'pausas-ergonomicas', name: 'Pausas activas ergonómicas' }
]

const InterestModal: React.FC<InterestModalProps> = ({ isOpen, onClose }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const dispatch = useDispatch()

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interestId)) {
        return prev.filter(id => id !== interestId)
      } else if (prev.length < 3) {
        return [...prev, interestId]
      }
      return prev
    })
  }

  const handleContinue = () => {
    if (selectedInterests.length === 3) {
      dispatch(updateUserInterests(selectedInterests))
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Selecciona tus intereses</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          Elige exactamente 3 tipos de pausas activas que más te interesen:
        </p>

        <div className="space-y-3 mb-6">
          {INTERESTS.map((interest) => (
            <label 
              key={interest.id}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                selectedInterests.includes(interest.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedInterests.includes(interest.id)}
                onChange={() => handleInterestToggle(interest.id)}
                className="mr-3 h-4 w-4 text-blue-600"
                disabled={!selectedInterests.includes(interest.id) && selectedInterests.length >= 3}
              />
              <span className="text-gray-700">{interest.name}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {selectedInterests.length}/3 seleccionados
          </span>
          <button
            onClick={handleContinue}
            disabled={selectedInterests.length !== 3}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              selectedInterests.length === 3
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}

export default InterestModal