import React, { useState } from "react";
import { FavoritesPropsType } from "@/types/types";

function Favorites({ favoriteRadios, toggleFavorite }: FavoritesPropsType) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<boolean>(false);

  // Filtrando as rádios com base no nome digitado
  const filteredRadios = favoriteRadios.filter((radio) =>{
    return (
      radio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      radio.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      radio.language.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  );

  return (
    <div>

      <div>
        <i onClick={() => setFilter(!filter)} className="fa fa-search"> Search</i>
        {filter && <input
        type="text"
        placeholder="Search radio..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />}
      </div>

      <div>
        {filteredRadios.length === 0 ? (
          <p>You don&apos;t have any favorite radios yet.</p>
        ) : (
          <ul>
            {filteredRadios.map((radio) => (
              <li key={radio.stationuuid}>
                <p>{radio.name}</p>
                <i
                  onClick={() => toggleFavorite(radio)}
                  className="fa fa-trash-o"
                ></i>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Favorites;
