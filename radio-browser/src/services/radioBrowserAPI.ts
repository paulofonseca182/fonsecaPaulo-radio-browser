import axios from "axios";
import { RadioStationType } from "../types/ApiType";

export async function fetchRadioStations(
  country?: string,
  language?: string,
  name?: string,
  limit: number = 10,
  offset: number = 0
): Promise<RadioStationType[]> {
  const baseUrl = process.env.NEXT_PUBLIC_RADIO_API_URL;
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

  const url = `${baseUrl}/json/stations/search?${new URLSearchParams(
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
