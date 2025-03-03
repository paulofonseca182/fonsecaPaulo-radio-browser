import React, { useEffect, useState } from "react";
import { DescriptionsRadios, PropsType } from "@/types/types";
import {
  loadDescription,
  saveDescription,
} from "@/services/localStorageService";

function Favorites({ favoriteRadios, toggleFavorite, setCurrentRadioPlaying }: PropsType) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [descriptions, setDescriptions] = useState<DescriptionsRadios>({});
  const radiosPerPage = 10;

  const filteredRadios = favoriteRadios.filter((radio) => {
    return (
      radio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      radio.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      radio.language.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastRadio = currentPage * radiosPerPage;
  const indexOfFirstRadio = indexOfLastRadio - radiosPerPage;
  const currentRadios = filteredRadios.slice(
    indexOfFirstRadio,
    indexOfLastRadio
  );
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const storedDescriptions = loadDescription();
    setDescriptions(storedDescriptions);
  }, []);

  const toggleDescription = (stationuuid: string) => {
    const newDescription = prompt(
      "Enter a description for this radio:",
      descriptions[stationuuid]
    );
    if (newDescription !== null) {
      const updatedDescriptions = {
        ...descriptions,
        [stationuuid]: newDescription,
      };
      setDescriptions(updatedDescriptions);
      saveDescription(updatedDescriptions);
    }
  };

  return (
    <div>
      <div className="search-favorites-container">
        <i onClick={() => setFilter(!filter)} className="fa fa-search">
          {" "}
          Search
        </i>
        {filter && (
          <input
            type="text"
            placeholder="Search radio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </div>

      <div className="favorites-radios-container">
        {currentRadios.length === 0 ? (
          <p className="no-favorites">
            You don&apos;t have any favorite radios yet.
          </p>
        ) : (
          <div className="favorites-radios-sub-container">
            <ul>
              {currentRadios.map((radio) => (
                <li className="favorites-radios" key={radio.stationuuid}>
                  <i
                    className="fa fa-play-circle"
                    onClick={() => setCurrentRadioPlaying?.(radio)}
                  ></i>
                  <div className="favorites-radios-info">
                    <p>{radio.name}</p>
                    {descriptions[radio.stationuuid] && (
                      <p>{descriptions[radio.stationuuid]}</p>
                    )}
                  </div>
                  <div className="favorites-radios-actions">
                    <i
                      onClick={() => toggleDescription(radio.stationuuid)}
                      className="fa fa-pencil"
                    ></i>
                    <i
                      onClick={() => toggleFavorite(radio)}
                      className="fa fa-trash-o"
                    ></i>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pagination-favorites">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fa fa-chevron-left"></i>
              </button>
              <span>{`Page ${currentPage}`}</span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage * radiosPerPage >= filteredRadios.length}
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
