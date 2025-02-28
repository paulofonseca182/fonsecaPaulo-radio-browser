import React, { useState, useEffect, useCallback } from "react";
import { fetchRadioStations } from "@/services/radioBrowserAPI";
import { RadioStationType } from "@/types/ApiType";
import 'font-awesome/css/font-awesome.min.css';

type FiltersType = "country" | "language" | "name" | undefined;

function Search() {
  const [searchField, setSearchField] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<FiltersType>(undefined);
  const [radios, setRadios] = useState<RadioStationType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        country: selectedFilter === "country" ? searchField : undefined,
        language: selectedFilter === "language" ? searchField : undefined,
        name: selectedFilter === "name" ? searchField : undefined,
      };

      const offset = (page - 1) * limit;
      const stations = await fetchRadioStations(
        params.country,
        params.language,
        params.name,
        limit,
        offset
      );

      setRadios(stations);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchField, selectedFilter]);

  useEffect(() => {
    handleSearch();
  }, [page]);

  const handleCheckboxChange = (filter: "country" | "language" | "name") => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? undefined : filter));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="checkbox"
              checked={selectedFilter === "country"}
              onChange={() => handleCheckboxChange("country")}
            />
            Country
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFilter === "language"}
              onChange={() => handleCheckboxChange("language")}
            />
            Language
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFilter === "name"}
              onChange={() => handleCheckboxChange("name")}
            />
            Name
          </label>
        </div>
        <input
          type="text"
          placeholder="Search term"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        />


        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : <i className="fa fa-search" aria-hidden="true"> Search</i>}
        </button>
      </form>

      <h3>Radios:</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {radios.length === 0 ? (
            <p>No stations found.</p>
          ) : (
            radios.map((radio) => (
              <li key={radio.stationuuid}>
                <p>{radio.name}</p>
              </li>
            ))
          )}
        </ul>
      )}

      <div>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage((prev) => prev + 1)} disabled={radios.length < limit}>
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default Search;
