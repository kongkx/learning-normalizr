import { normalize, schema } from 'normalizr';

const input = [ {
  id: 11232, 
  type: 'article',
  title: 'article Title',
  author: {
    id: 1,
    username: 'kongkx'
  }
}, {
  id: 88923,
  type: 'comment',
  title :'comment Title',
  content: 'comment Content',
  author: {
    id: 2,
    username: 'steven'
  }
}];

const user = new schema.Entity('users');
const article = new schema.Entity('articles', {
  author: user
});
const comment = new schema.Entity('comments', {
  author: user
});

const feedSchema = new schema.Array({
  articles: article,
  comments: comment
}, (input, parent, key) => {
  return `${input.type}s`
});

const normalizedData = normalize(input, feedSchema);

console.log(JSON.stringify(normalizedData, null, 2));

// Output
// {
//   "entities": {
//     "users": {
//       "1": {
//         "id": 1,
//           "username": "kongkx"
//       },
//       "2": {
//         "id": 2,
//           "username": "steven"
//       }
//     },
//     "articles": {
//       "11232": {
//         "id": 11232,
//           "type": "article",
//             "title": "article Title",
//               "author": 1
//       }
//     },
//     "comments": {
//       "88923": {
//         "id": 88923,
//           "type": "comment",
//             "title": "comment Title",
//               "content": "comment Content",
//                 "author": 2
//       }
//     }
//   },
//   "result": [
//     {
//       "id": 11232,
//       "schema": "articles" // "articles" value return from array schemaAttribute function
//     },
//     {
//       "id": 88923,
//       "schema": "comments"
//     }
//   ]
// }
