import React from 'react';
import { Icon, Image, Container, Flex, IconButton } from '@chakra-ui/react';
import { FiPower } from 'react-icons/fi';

import { useAuth } from '../hooks/auth';

const Header: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Flex as="header" width="100%" height="70px">
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        maxW="1200px"
      >
        <Image h={['40px']} src="/assets/logo.svg" />

        <IconButton
          onClick={signOut}
          aria-label="logout"
          colorScheme="red"
          icon={<Icon as={FiPower} />}
        />
      </Container>
    </Flex>
  );
};

export default Header;
