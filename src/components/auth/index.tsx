import React from 'react';
import { Box, Button, Icon, Image, VStack } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../../hooks/auth';
import SEO from '../SEO';

const Auth: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <>
      <SEO title="Login" />

      <Box
        w="100vw"
        minH="100vh"
        py={16}
        backgroundImage="url('/assets/login-background.jpg')"
        backgroundSize="cover"
      >
        <VStack
          spacing={16}
          mx={[4, 'auto']}
          justify="center"
          maxW="max-content"
          p={16}
          bg="white"
          borderRadius="5px"
        >
          <Image src="/assets/logo.svg" alt="ecollect logo" />
          <Button
            colorScheme="green"
            leftIcon={<Icon fontSize={24} color="white" as={FaGoogle} />}
            onClick={signInWithGoogle}
          >
            Login with Google
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default Auth;
