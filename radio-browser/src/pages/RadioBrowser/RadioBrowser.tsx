import React from 'react'
import Favorites from "@/components/Favorites/Favorites";
import Search from "@/components/Search/Search";
import { RadioStationType } from "@/types/types";
import { useEffect, useState } from "react";
import { loadFavorites, saveFavorites } from "@/services/localStorageService";
import CurrentRadioPlaying from "@/components/CurrentRadioPlaying/CurrentRadioPlaying";


function RadioBrowser() {
  const [favoriteRadios, setFavoriteRadios] = useState<RadioStationType[]>([]);
  const [currentRadioPlaying, setCurrentRadioPlaying] = useState<RadioStationType>();
  const [changeLayout, setChangeLayout] = useState<boolean>(true);

  const toggleFavorite = (radio: RadioStationType) => {
    setFavoriteRadios((prevFavoriteRadios) => {
      const isFavorite = prevFavoriteRadios.some(
        (fav) => fav.stationuuid === radio.stationuuid
      );
      const updatedFavorites = isFavorite
        ? prevFavoriteRadios.filter(
            (fav) => fav.stationuuid !== radio.stationuuid
          )
        : [...prevFavoriteRadios, radio];

      saveFavorites(updatedFavorites);
      return updatedFavorites;
    });
  };

  useEffect(() => {
    const savedFavorites = loadFavorites();
    setFavoriteRadios(savedFavorites);
  }, []);
  return (
    <div className="radio-browser">
      <div className="search-container-desktop">
        <Search
          favoriteRadios={favoriteRadios}
          toggleFavorite={toggleFavorite}
          currentRadioPlaying={currentRadioPlaying}
          setCurrentRadioPlaying={setCurrentRadioPlaying}
        />
      </div>
      <section className="section-body-playing">
        <CurrentRadioPlaying currentRadioPlaying={currentRadioPlaying} />

        <div className="change-layout">
          <p
            
            className={changeLayout ? '' : 'active'}
            onClick={() => setChangeLayout(false)}
            
          >Search</p>
          <span className='separator'>|</span>
          <p
            className={changeLayout ? 'active' : ''}
            onClick={() => setChangeLayout(true)}
            
          >Favorites</p>
        </div>
        
        {changeLayout ? (<Favorites
          favoriteRadios={favoriteRadios}
          toggleFavorite={toggleFavorite}
          setCurrentRadioPlaying={setCurrentRadioPlaying}
        />) : (<div className="search-container-mobile">
        <Search
          favoriteRadios={favoriteRadios}
          toggleFavorite={toggleFavorite}
          currentRadioPlaying={currentRadioPlaying}
          setCurrentRadioPlaying={setCurrentRadioPlaying}
        />
      </div>)}
        
      </section>
    </div>
  );
}

export default RadioBrowser
