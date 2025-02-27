import { fetchRadioStations } from '../services/radioBrowserAPI';
export default function Home() {
  return (
    <div>
      <p>INICIO</p>
      <button onClick={() => fetchRadioStations()}>Teste</button>
    </div>
  );
}
