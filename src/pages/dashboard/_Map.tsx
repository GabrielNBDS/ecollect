import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Box } from '@chakra-ui/react';

interface IProps {
  center: [number, number];
  setCenter: React.Dispatch<React.SetStateAction<[number, number]>>;
  markerPos: [number, number];
  setMarkerPos: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const Map: React.FC<IProps> = ({
  center,
  markerPos,
  setCenter,
  setMarkerPos,
}) => {
  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setCenter([latitude, longitude]);
      setMarkerPos([latitude, longitude]);
      setCanShow(true);
    });
  }, []);

  const onClick = ({ lat, lng }) => setMarkerPos([lat, lng]);
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
          onClick={onClick}
          onChange={onChange}
        >
          <Box
            h="15px"
            w="15px"
            borderRadius="full"
            bg="green.500"
            lat={markerPos[0]}
            lng={markerPos[1]}
          />
        </GoogleMapReact>
      )}
    </>
  );
};

export default Map;
