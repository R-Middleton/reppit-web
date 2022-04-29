import { ChakraProvider } from '@chakra-ui/react';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';
import {
  LoginMutation,
  RegsiterMutation,
  MeDocument,
  MeQuery,
} from '../generated/graphql';

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
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
    fetchExchange,
  ],
});

export default function App({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
