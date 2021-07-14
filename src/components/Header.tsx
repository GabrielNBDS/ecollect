import React from 'react';
import {
  Icon,
  Button,
  Image,
  Container,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  LightMode,
} from '@chakra-ui/react';
import { FiPower } from 'react-icons/fi';

import { useAuth } from '../hooks/auth';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Flex as="header" bg="green.100" w="100vw" height="70px">
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        maxW="1200px"
      >
        <Image w="160px" src="/assets/logo.svg" />

        <Popover>
          <PopoverTrigger>
            <Button
              height="60px"
              width="60px"
              _focus={{ boxShadow: 'none' }}
              variant="unstyled"
            >
              <Image
                src={user.photoURL}
                borderRadius="full"
                width="60px"
                border="2px solid white"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <LightMode>
                <Button
                  color="white"
                  size="sm"
                  colorScheme="red"
                  rightIcon={<Icon as={FiPower} />}
                  onClick={signOut}
                >
                  Logout
                </Button>
              </LightMode>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Container>
    </Flex>
  );
};

export default Header;
