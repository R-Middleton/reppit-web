import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegsiterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const [, regsiter] = useRegsiterMutation();
  const router = useRouter();

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await regsiter({ options: values });
          if (response.data?.Register.errors) {
            setErrors(toErrorMap(response.data.Register.errors));
          } else if (response.data?.Register.user) {
            // worked
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='username'
              placeholder='username'
              label='Username'
            />
            <Box mt={4}>
              <InputField name='email' placeholder='email' label='email' />
            </Box>
            <Box mt={4}>
              <InputField
                name='password'
                placeholder='password'
                label='Password'
                type='password'
              />
            </Box>
            <Button
              mt={4}
              type='submit'
              isLoading={isSubmitting}
              colorScheme='teal'
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
