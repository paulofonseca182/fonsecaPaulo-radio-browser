import axios from "axios";
import { RadioStationType } from "../types/types";

export async function fetchRadioStations(
  country?: string,
  language?: string,
  name?: string,
  limit: number = 10,
  offset: number = 0
): Promise<RadioStationType[]> {
  const baseUrl = 'https://de1.api.radio-browser.info/json/stations/search?';
  if (!baseUrl) {
    throw new Error("Environment variable is not defined");
  }

  const searchParams: Record<string, string | number> = {
    limit,
    offset,
  };

  if (country) searchParams["country"] = country;
  if (language) searchParams["language"] = language;
  if (name) searchParams["name"] = name;

  const url = `${baseUrl}${new URLSearchParams(
    Object.entries(searchParams).map(([key, value]) => [key, String(value)])
  ).toString()}`;

  try {
    const response = await axios.get<RadioStationType[]>(url);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error when searching for stations: ${error.message}`);
    }
    throw error;
  }
}
