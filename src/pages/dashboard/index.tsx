import { Box, Container, Stack } from '@chakra-ui/react';
import React from 'react';
import withAuth from '../../components/auth/WithAuth';
import Header from '../../components/Header';
import SEO from '../../components/SEO';
import AddPoint from './_AddPoint';
import PointsList from './_PointsList';

const Dashboard: React.FC = () => {
  return (
    <>
      <SEO title="Dashboard" />

      <Header />

      <Box minH="calc(100vh - 70px)">
        <Container maxW="1200px">
          <Stack
            pt={8}
            pb={16}
            mx="auto"
            align={['center', 'center', 'flex-start']}
            direction={['column', 'column', 'row']}
          >
            <PointsList />

            <AddPoint />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default withAuth(Dashboard);
