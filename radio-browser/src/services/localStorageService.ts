import { DescriptionsRadios, RadioStationType, ReproductionData } from "@/types/types";

export const loadFavorites = (): RadioStationType[] => {
  const storedFavorites = localStorage.getItem("favoriteRadios");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

export const saveFavorites = (favorites: RadioStationType[]): void => {
  localStorage.setItem("favoriteRadios", JSON.stringify(favorites));
};

export const loadDescription = (): DescriptionsRadios => {
  const storedDescriptions = localStorage.getItem("radioDescriptions");
  return storedDescriptions ? JSON.parse(storedDescriptions) : {}; 
};


export const saveDescription = (descriptions: DescriptionsRadios): void => {
  localStorage.setItem("radioDescriptions", JSON.stringify(descriptions));
};

export const loadReproductionData = () : ReproductionData => {
  const data = localStorage.getItem("reproductionData");
  return data ? JSON.parse(data) : 1;
}

export const saveReproductionData = (volume: ReproductionData): void => {
  localStorage.setItem("reproductionData", JSON.stringify(volume));
} 