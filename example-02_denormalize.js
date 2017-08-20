/**
 * Denormalizr Data
 * denormalize(input, schema, entities)
 * input 与 schema 的字段结构要匹配
 */

import { denormalize, schema } from 'normalizr';

const user = new schema.Entity('users');
const mySchema = { users: [ user ] };
const articleSchema = { author: user };
const entities = { 
  articles: {
    '1': {
      id: 1,
      title: 'Example Article',
      author: 1
    }
  },
  users: { 
    '1': { id: 1, username: 'kongkx' }, 
    '2': { id: 2, username: 'steven' }
  }
};

const denormalizeData = denormalize({ users: [1, 2] }, mySchema, entities);

console.log(JSON.stringify(denormalizeData, null, 2));

const denormalizeArticle = denormalize({
  id: 1,
  title: 'Example Article',
  author: 1
}, articleSchema, entities);

console.log(JSON.stringify(denormalizeArticle, null, 2));