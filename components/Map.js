import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useState } from 'react';
import { getCenter } from 'geolib';

function Map({ searchResults }) {
  const [selectLocation, setSelectLocation] = useState({});

  // Transform object
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle={'mapbox://styles/tokyoprogramming/ckxl36hoa5pbe15sctecvhpay'}
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result, index) => (
        <div key={index}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              onClick={() => setSelectLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
            >
              📍
            </p>
          </Marker>

          {selectLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}
export default Map;
