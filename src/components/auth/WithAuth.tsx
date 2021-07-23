import { Flex, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Auth from '.';

import { useAuth } from '../../hooks/auth';
import SEO from '../SEO';

const withAuth = (Component: React.FC) => (): JSX.Element => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!user) {
      const timeoutRef = setTimeout(() => setShouldLogin(true), 1000);

      setTimeouts([...timeouts, timeoutRef]);
    }

    if (user) {
      setIsLoading(false);
      setShouldLogin(false);
      timeouts.map(timeout => clearTimeout(timeout));
    }
  }, [user]);

  // if isLoading return a loader
  if (isLoading && !shouldLogin) {
    return (
      <Flex height="10vh" align="center" justify="center">
        <Spinner />
      </Flex>
    );
  }

  if (shouldLogin) {
    return <Auth />;
  }

  // if is not loading returns the component
  if (!isLoading && !shouldLogin && user) {
    return <Component />;
  }

  return (
    <>
      <SEO title="Login" />

      <Flex height="10vh" align="center" justify="center">
        <Spinner />
      </Flex>
    </>
  );
};

export default withAuth;
