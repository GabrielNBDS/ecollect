import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

interface IProps {
  center: [number, number];
  setCenter: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const Map: React.FC<IProps> = ({ center, setCenter, children }) => {
  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setCenter([latitude, longitude]);
      setCanShow(true);
    });
  }, []);

  const onChange = ({ center: center_ }) =>
    setCenter([center_.lat, center_.lng]);

  return (
    <>
      {canShow && (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_MAPS_KEY,
          }}
          defaultCenter={center}
          defaultZoom={15}
          onChange={onChange}
        >
          {children}
        </GoogleMapReact>
      )}
    </>
  );
};

export default Map;
