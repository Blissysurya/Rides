import React from 'react'

const LocationSearchPanel = (props) => {
  const { suggestions = [], onSuggestionClick } = props

  return (
    <div>
      {suggestions.length === 0 && (
        <div className="text-gray-400 text-center py-4">No suggestions</div>
      )}
      {suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={() => {
            onSuggestionClick(elem)
            props.setVehiclePanel(false)
            props.setPanelOpen(false)
          }}
          className='flex my-2 border-white active:border-black border-2 p-3 rounded-xl gap-4 items-center justify-start'
        >
          <h2 className='bg-[#eee] h-10 flex items-center justify-center w-10 rounded-full'>
            <i className='ri-map-pin-fill'></i>
          </h2>
          <h4 className='font-medium'>{elem}</h4>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel