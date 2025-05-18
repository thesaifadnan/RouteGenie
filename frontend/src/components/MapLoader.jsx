
import { useJsApiLoader } from '@react-google-maps/api';

export function MapLoader({ children }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_API_KEY"
  });

  return isLoaded ? children : <div>Loading Maps...</div>;
}