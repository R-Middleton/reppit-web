import { Button } from '@chakra-ui/button';
import { Box, Flex, Link } from '@chakra-ui/layout';
import NextLink from 'next/link';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  let body = null;

  if (isServer() || fetching) {
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
        <Button
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
          variant={'link'}
        >
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg={'green.200'} p={4}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};
