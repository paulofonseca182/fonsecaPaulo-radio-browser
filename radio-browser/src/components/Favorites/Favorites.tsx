import { FavoritesPropsType } from '@/types/types';
import React from 'react'

function Favorites( { favoriteRadios, toggleFavorite }: FavoritesPropsType ) {
  return (
    <div>
      <div>
        {favoriteRadios.length === 0 ? (
          <p>You don&apos;t have any favorite radios yet.</p>
        ) : (
          <ul>
            {favoriteRadios.map((radio) => (
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

