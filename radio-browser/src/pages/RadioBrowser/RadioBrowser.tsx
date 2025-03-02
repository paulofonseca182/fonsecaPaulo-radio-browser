import React from 'react'
import Favorites from "@/components/Favorites/Favorites";
import Search from "@/components/Search/Search";
import { RadioStationType } from "@/types/types";
import { useEffect, useState } from "react";
import { loadFavorites, saveFavorites } from "@/services/localStorageService";
import CurrentRadioPlaying from "@/components/CurrentRadioPlaying/CurrentRadioPlaying";


function RadioBrowser() {
    const [favoriteRadios, setFavoriteRadios] = useState<RadioStationType[]>([]);
    const [currentRadioPlaying, setCurrentRadioPlaying] =
      useState<RadioStationType>();
  
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
    <div className="flex flex-row ">
      <Search
        favoriteRadios={favoriteRadios}
        toggleFavorite={toggleFavorite}
        currentRadioPlaying={currentRadioPlaying}
        setCurrentRadioPlaying={setCurrentRadioPlaying}
      />
      <section>
        <h2>Radio Browser</h2>
      <CurrentRadioPlaying currentRadioPlaying={currentRadioPlaying} />
      <Favorites
        favoriteRadios={favoriteRadios}
        toggleFavorite={toggleFavorite}
        setCurrentRadioPlaying={setCurrentRadioPlaying}
      />
      </section>
    </div>
  )
}

export default RadioBrowser
