import { Container, Flex, Spinner, Stack, Text, theme } from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import React from 'react';
import { useAuth } from '../../hooks/auth';
import IPoint from '../../interfaces/point';
import PointItem from './_PointItem';

const PointsList: React.FC = () => {
  const { user } = useAuth();

  const { data: points, loading: pointsLoading } = useCollection<IPoint>(
    'points',
    {
      where: ['ownerId', '==', user?.uid],
      listen: true,
    },
  );

  return (
    <Container w="100%" px={0} h="max-content" borderRadius="5px">
      <Text
        fontWeight="700"
        color="green.400"
        borderBottom={`4px solid ${theme.colors.green[400]}`}
        fontSize={18}
        mb={2}
      >
        Your recycling points:
      </Text>

      {pointsLoading && (
        <Flex py={4} justify="center">
          <Spinner colorScheme="green" />
        </Flex>
      )}

      {!pointsLoading && points.length < 1 && (
        <Text>You dont&apos;t have any points :(</Text>
      )}

      {points?.length > 0 && (
        <Stack as="ul" listStyleType="none" spacing={4}>
          {points.map(point => (
            <PointItem key={point.id} {...point} />
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default PointsList;
