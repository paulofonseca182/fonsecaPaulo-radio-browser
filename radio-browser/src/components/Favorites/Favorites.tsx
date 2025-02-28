import React, { useState } from "react";
import { FavoritesPropsType } from "@/types/types";

function Favorites({ favoriteRadios, toggleFavorite }: FavoritesPropsType) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
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
  const currentRadios = filteredRadios.slice(indexOfFirstRadio, indexOfLastRadio);


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
                <i onClick={() => toggleFavorite(radio)} className="fa fa-trash-o"></i>
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
