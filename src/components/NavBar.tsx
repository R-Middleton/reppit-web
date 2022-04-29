import { Button } from '@chakra-ui/button';
import { Box, Flex, Link } from '@chakra-ui/layout';
import NextLink from 'next/link';
import React from 'react';
import { useMeQuery } from '../generated/graphql';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href={'/login'} passHref>
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href={'/register'} passHref>
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button variant={'link'}>logout</Button>
      </Flex>
    );
  }
  return (
    <Flex bg={'green.200'} p={4}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};
