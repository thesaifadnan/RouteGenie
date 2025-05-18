import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

export function RouteMap({ optimalRoute, waypoints }) {
  const center = waypoints?.[0] || { lat: 30.3165, lng: 78.0322 };

  if (!optimalRoute?.path) return <div>No route data available</div>;

  return (
    <LoadScript
      googleMapsApiKey="YOUR_ACTUAL_KEY"
      loadingElement={<div>Loading...</div>}
    >
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '500px' }}
          center={center}
          zoom={14}
        >
         {waypoints?.map((_, index) => (
          <Marker 
            key={index}
            position={locations[optimalRoute?.path?.[index]]}
            label={index === 0 ? "S" : `${index}`}
          />
        ))}
        {pathCoordinates && (
          <Polyline
            path={pathCoordinates}
            options={{ strokeColor: "#FF0000", strokeWeight: 3 }}
          />
        )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}
