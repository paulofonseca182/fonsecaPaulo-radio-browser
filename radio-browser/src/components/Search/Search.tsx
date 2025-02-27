import { fetchRadioStations } from '@/services/radioBrowserAPI'
import React from 'react'

const handleSearch = async () => {
  const data = await fetchRadioStations('Brazil', undefined, 'Hunter FM - Rock HQ')
  console.log(data);
  
}

function Search() {
  return (
    <div>
      <p>INICIO</p>
      <button onClick={() => handleSearch()}>Teste</button>
    </div>
  )
}

export default Search
