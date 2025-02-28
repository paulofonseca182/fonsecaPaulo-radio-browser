import { RadioStationType } from "@/types/types";

export const loadFavorites = (): RadioStationType[] => {
  const storedFavorites = localStorage.getItem("favoriteRadios");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

export const saveFavorites = (favorites: RadioStationType[]): void => {
  localStorage.setItem("favoriteRadios", JSON.stringify(favorites));
};
