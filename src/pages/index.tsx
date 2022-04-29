import { NavBar } from '../components/NavBar';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => (
  <>
    <NavBar />
    <h1>Hello Next.js</h1>
  </>
);

export default withUrqlClient(createUrqlClient)(Index);
