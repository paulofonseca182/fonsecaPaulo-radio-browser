import React, { useEffect, useState } from "react";
import { DescriptionsRadios, FavoritesPropsType } from "@/types/types";
import {
  loadDescription,
  saveDescription,
} from "@/services/localStorageService";

function Favorites({ favoriteRadios, toggleFavorite }: FavoritesPropsType) {
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
      <div>
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

      <div>
        {currentRadios.length === 0 ? (
          <p>You don&apos;t have any favorite radios yet.</p>
        ) : (
          <ul>
            {currentRadios.map((radio) => (
              <li key={radio.stationuuid}>
                <p>{radio.name}</p>
                <div>
                  <i
                    onClick={() => toggleDescription(radio.stationuuid)}
                    className="fa fa-pencil"
                  ></i>
                  <i
                    onClick={() => toggleFavorite(radio)}
                    className="fa fa-trash-o"
                  ></i>
                </div>

                {descriptions[radio.stationuuid] && (
                  <p>{descriptions[radio.stationuuid]}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
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
  );
}

export default Favorites;
