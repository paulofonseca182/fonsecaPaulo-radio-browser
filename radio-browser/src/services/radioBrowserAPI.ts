import axios from 'axios';
import { RadioStationType } from '../types/ApiType';

export async function fetchRadioStations(
  country?: string,
  language?: string,
  name?: string,
  limit: number = 10
): Promise<RadioStationType[]> {
  const baseUrl = process.env.NEXT_PUBLIC_RADIO_API_URL;
  if (!baseUrl) {
    throw new Error('Environment variable is not defined');
  }

  const params = new URLSearchParams({ limit: String(limit) });

  if (country) params.append('country', country);
  if (language) params.append('language', language);
  if (name) params.append('name', name);

  try {
    const { data } = await axios.get<RadioStationType[]>(`${baseUrl}?${params}`);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error when searching for stations: ${error.message}`);
    }
    throw error;
  }
}
