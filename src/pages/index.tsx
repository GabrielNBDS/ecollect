import React from 'react';
import Link from 'next/link';
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import SEO from '../components/SEO';

const SplitScreen: React.FC = () => {
  return (
    <>
      <SEO
        title="Ecollect"
        description="Ecollect is your recycling points marketplace. Finding
        or making recycling points visible was never too easy."
        shouldExcludeTitleSuffix
        shouldIndexPage
      />

      <Stack minH="100vh" direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align="center" justify="center">
          <Stack spacing={6} w="full" maxW="lg">
            <Image mr="auto" height="40px" src="/assets/logo.svg" />

            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as="span"
                color="#322153"
                position="relative"
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'green.400',
                  zIndex: -1,
                }}
              >
                Finding
              </Text>
              <br />{' '}
              <Text color="green.400" as="span">
                recycling points
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color="gray.500">
              &quot;Ecollect&quot; is your recycling points marketplace. Finding
              or making recycling points visible was never too easy.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Link href="/find">
                <Button
                  cursor="pointer"
                  as="a"
                  rounded="full"
                  bg="green.400"
                  color="white"
                  _hover={{
                    bg: 'green.500',
                  }}
                >
                  Start Finding
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button cursor="pointer" as="a" rounded="full">
                  Add a new point
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Flex>
        <Flex display={['none', 'none', 'flex']} maxH="100vh" flex={1}>
          <Image
            alt="Ecollect point example"
            objectFit="cover"
            src="/assets/hero.jpg"
          />
        </Flex>
      </Stack>
    </>
  );
};

export default SplitScreen;
