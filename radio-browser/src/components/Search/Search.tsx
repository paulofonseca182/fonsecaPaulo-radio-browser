import { fetchRadioStations } from '@/services/radioBrowserAPI'
import { RadioStationType } from '@/types/ApiType';
import React, { useCallback, useEffect, useState } from 'react'


function Search() {
  const [radios, setRadios] = useState<RadioStationType[]>([]);
  const [page, setPage] = useState<number>(1);
  const limit = 10;


  const handleSearch = useCallback(async () => {
    const offset = (page - 1) * limit;
    const data = await fetchRadioStations('Brazil', undefined, undefined, limit, offset )
    console.log(data);
    setRadios(data);
  },[page])

  useEffect(() => {
    handleSearch()
  }, [handleSearch])


  return (
    <>
    <div>
      <button onClick={() => handleSearch()}>Search</button>
    </div>

    <div>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage((prev) => prev + 1)} disabled={radios.length < limit}>
          Next
        </button>
      </div>
    </>
  )
}

export default Search