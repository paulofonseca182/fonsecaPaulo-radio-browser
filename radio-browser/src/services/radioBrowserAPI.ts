import axios from 'axios';
import {RadioStationType} from '../types/ApiType';

export async function fetchRadioStations(limit: number = 10): Promise<RadioStationType[]> {
  const baseUrl = process.env.NEXT_PUBLIC_RADIO_API_URL;
  if (!baseUrl) {
    throw new Error('A variável de ambiente não está definida');
  }
  
  const url = `${baseUrl}?limit=${limit}`;

  try {
    const response = await axios.get<RadioStationType[]>(url);
    console.log(response);    
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Erro ao buscar as estações: ${error.message}`);
    }
    throw error;
  }
}
