import { Button } from '@chakra-ui/button';
import { Box, Flex, Spacer, Link } from '@chakra-ui/layout';
import { Formik, Form } from 'formik';
import router from 'next/router';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { toErrorMap } from '../utils/toErrorMap';
import login from './login';
import NextLink from 'next/link';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          const response = await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              <Box>Password reset email sent</Box>
              <Box mt={4}>
                <NextLink href={'/'} passHref>
                  <Link color='teal.500'>Home</Link>
                </NextLink>
              </Box>
            </Box>
          ) : (
            <Form>
              <InputField name='email' placeholder='email' label='Email' />
              <Button
                mt={4}
                type='submit'
                isLoading={isSubmitting}
                colorScheme='teal'
              >
                Reset Password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
