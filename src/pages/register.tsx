import React from 'react';
import { Formik, Form } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
} from '@chakra-ui/react';
import { values } from 'lodash';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';

interface registerProps {}

const RESGISTER_MUT = `
mutation Regsiter($username: String!, $password: String!) {
  Register(options: {username:$username, password:$password} ) {
    errors {
      field
      message
    }
    user {
      username
      _id
    }
  }
}`;

export const Register: React.FC<registerProps> = ({}) => {
  const [, regsiter] = useMutation(RESGISTER_MUT);

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          console.log(values);
          return regsiter({
            username: values.username,
            password: values.password,
          });
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

export default Register;
