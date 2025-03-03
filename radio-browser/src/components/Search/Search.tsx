import React, { useState, useEffect, useCallback } from "react";
import { fetchRadioStations } from "@/services/radioBrowserAPI";
import { RadioStationType, PropsType, FiltersType} from "@/types/types"
import "font-awesome/css/font-awesome.min.css";

function Search( { favoriteRadios, toggleFavorite, setCurrentRadioPlaying}: PropsType  ) {
  const [searchField, setSearchField] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<FiltersType>(undefined);
  const [radios, setRadios] = useState<RadioStationType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<boolean>(true);
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

  const handleCheckboxChange = (filter: "country" | "language" | "name") => {
    setSelectedFilter((prevFilter) =>
      prevFilter === filter ? undefined : filter
    );
  };

  useEffect(() => {
    handleSearch();
  }, [page]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };
  

  

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className=" search-filters-container ">
          <i onClick={() => setFilter(!filter)} className="fa fa-bars">
            {" "}
            Filter
          </i>

          {filter && (
            <section className="search-filters">
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
            </section>
          )}
        </div>

        <div className="input-search-container">
          <input
            type="text"
            placeholder="Search term"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : <i className="fa fa-search"> Search</i>}
          </button>
        </div>
      </form>

      {isLoading ? (
        //colocar className no p para centralizar texto ao centro com lib tailwindcss
        <p className="text-center">Loading...</p>
      ) : (
        <div>
          <h3 className="text-radios">Radios:</h3>
          <ul>
            {radios.length === 0 ? (
              <p>No stations found.</p>
            ) : (
              radios.map((radio) => (
                <li className="search-radios" key={radio.stationuuid}>
                  <i
                    className="fa fa-play-circle"
                    onClick={() => setCurrentRadioPlaying?.(radio)}
                  ></i>
                  <p className="">{radio.name}</p>
                  <button onClick={() => toggleFavorite(radio)}>
                    <i
                      className={`fa ${
                        favoriteRadios.some(
                          (fav) => fav.stationuuid === radio.stationuuid
                        )
                          ? "fa-heart"
                          : "fa-heart-o"
                      }`}
                    ></i>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      <div className=" pagination-search ">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          <i className="fa fa-chevron-left"></i>
        </button>
        <span> Page {page} </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={radios.length < limit}
        >
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default Search;
