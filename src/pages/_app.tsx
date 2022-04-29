import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'urql';

export default function App({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
