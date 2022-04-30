import { Button } from '@chakra-ui/button';
import { Box, Link } from '@chakra-ui/layout';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { toErrorMap } from '../../utils/toErrorMap';
import login from '../login';
import { useChangePasswordMutation } from '../../generated/graphql';
import { useState } from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import NextLink from 'next/link';

export const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ newpassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newpassword,
            token,
          });

          if (response.data?.ChangePassword.errors) {
            const errorMap = toErrorMap(response.data.ChangePassword.errors);
            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.ChangePassword.user) {
            // worked
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='newpassword'
              placeholder='new password'
              label='New Password'
              type='password'
            />
            {tokenError ? (
              <Box>
                <Box>{tokenError}</Box>
                <NextLink href={'/forgot-password'} passHref>
                  <Link color='teal.500'>Reset Password</Link>
                </NextLink>
              </Box>
            ) : null}
            <Button
              mt={4}
              type='submit'
              isLoading={isSubmitting}
              colorScheme='teal'
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = async ({ query }) => {
  return { token: query.token as string };
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePassword);
