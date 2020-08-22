import Head from 'next/head'

import App from '../src/components/App';
import AuthContext from '../src/components/AuthContext';
import { fetchBook } from '../src/utils/airtable';

const currentUser = {
  email: 'user@email.com',
  firstName: 'Patrick',
  lastName: 'Wam',
  avatarUrl: 'https://d39qdlcrvnra4b.cloudfront.net/avatars/1846165/original/DSC_7016-small.jpg?1581154864'
};

function Home({ book, similarBooks } = {}) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthContext.Provider value={{currentUser: currentUser}}>
        <App book={book} similarBooks={similarBooks} />
      </AuthContext.Provider>
      <div id="modal-root"></div>
    </div>
  )
}

export async function getServerSideProps() {
  const result = await fetchBook();
  return {
    props: {
      book: result[0],
      similarBooks: result[1],
    }
  };
}

export default Home;
