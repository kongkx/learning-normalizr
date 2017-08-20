/**
 * Example 01, normalize feed
 */
import { normalize, schema } from 'normalizr';

var input = {
  feed: [{
    id: 1,
    title: 'Some Article',
    author: {
      id: 3,
      name: 'Mike Persson'
    },
    collections: [{
      id: 1,
      title: 'Awesome Writing',
      curator: {
        id: 4,
        name: 'Andy Warhol'
      }
    }, {
      id: 7,
      title: 'Even Awesomer',
      curator: {
        id: 100,
        name: 'T.S. Eliot'
      }
    }]
  }, {
    id: 2,
    title: 'Other Article',
    collections: [{
      id: 2,
      title: 'Neverhood',
      curator: {
        id: 120,
        name: 'Ada Lovelace'
      }
    }],
    author: {
      id: 2,
      name: 'Pete Hunt'
    }
  }]
};

Object.freeze(input);

const user = new schema.Entity('ursers');
const collection = new schema.Entity('collections', {
  curator: user
});
const article = new schema.Entity('articles', {
  author: user,
  collections: [ collection ]
});

const feedSchema = {
  feed: [ article ]
}

const normalizedData = normalize(input, feedSchema);

console.log(JSON.stringify(normalizedData, null, 2));
