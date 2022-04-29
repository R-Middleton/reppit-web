import { dedupExchange, fetchExchange } from '@urql/core';
import { cacheExchange } from '@urql/exchange-graphcache';
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegsiterMutation,
} from '../generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          Logout: (result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result,
              () => ({ me: null })
            );
          },
          Login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.Login.errors) {
                  return query;
                } else {
                  return {
                    me: result.Login.user,
                  };
                }
              }
            );
          },
          Register: (_result, args, cache, info) => {
            betterUpdateQuery<RegsiterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.Register.errors) {
                  return query;
                } else {
                  return {
                    me: result.Register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
