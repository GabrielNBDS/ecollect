import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import React, { useState } from 'react';
import SEO from '../../components/SEO';
import IPoint from '../../interfaces/point';

import Map from './_Map';

const Find = (): JSX.Element => {
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const [currentPoint, setCurrentPoint] = useState<IPoint | null>(null);

  const { data: points, loading: pointsLoading } = useCollection<IPoint>(
    'points',
    {
      listen: true,
    },
  );

  return (
    <>
      <SEO title="Find points" description="Find recycling points near your." />

      <Box w="100vw" h="100vh">
        <Map center={center} setCenter={setCenter}>
          {!pointsLoading &&
            points.map(point => (
              <Box
                onClick={() => setCurrentPoint(point)}
                h="15px"
                w="15px"
                borderRadius="full"
                bg="green.500"
                lat={point.markerPos.latitude}
                lng={point.markerPos.longitude}
              />
            ))}
        </Map>
      </Box>

      <Modal
        isOpen={currentPoint !== null}
        onClose={() => setCurrentPoint(null)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentPoint?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Image src={currentPoint?.image} />
              <Text fontSize={18}>{currentPoint?.name}</Text>
              <Text>{currentPoint?.address}</Text>

              <Button
                colorScheme="green"
                as="a"
                target="_blank"
                href={`https://www.google.com/maps/dir/${currentPoint?.markerPos.latitude},${currentPoint?.markerPos.longitude}`}
              >
                Directions
              </Button>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={() => setCurrentPoint(null)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Find;
