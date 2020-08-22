import Axios from 'axios';

const API_TOKEN = 'keyjnhfZY4RsMqkWT';

const httpClient = Axios.create({
  baseURL: 'https://api.airtable.com/v0/appskzwlULQeX6my9',
  timeout: 2000,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`
  },
});

export const fetchBook = () => (
  httpClient
    .get('/books/rectvnNGWsIE6Z0zc')
    .then(result => result.data)
    .then(_mapFromAirTable)
);

const _mapFromAirTable = (data) => {
  const attrs = data.fields;

  const {
    name,
    description,
    pages,
    language,
    progress,
    link,
    minimumPrice,
    suggestedPrice,
    collectedAmount,
    expectedAmount,
    readers,
    additionalInfo,
    authorsFullNames,
    authorsEmails,
    authorsAvatars,
    authorsInformations,
    similarBooksNames,
    similarBooksAuthors,
    similarBooksImages,
  } = attrs;

  const authors = attrs.authors.map(
    (_, index) => ({
      fullName: authorsFullNames[index],
      email: authorsEmails[index],
      avatar: authorsAvatars[index],
      information: authorsInformations[index],
    })
  );

  const similarBooks = attrs.similarBooks.map(
    (_, index) => ({
      name: similarBooksNames[index],
      author: similarBooksAuthors[index],
      image: similarBooksImages[index],
    })
  )

  return [{ 
    name,
    description,
    pages,
    language,
    progress,
    link,
    minimumPrice,
    suggestedPrice,
    collectedAmount,
    expectedAmount,
    readers,
    additionalInfo,
    authors,
  }, similarBooks];
};
