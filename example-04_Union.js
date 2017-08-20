/**
 * Union schema
 */
import { normalize, schema } from 'normalizr';


const input = {
  collections: [{
    id: 1,
    title: 'Anne\'s Personal Collection',
    owner: { id: 1, type: 'user', name: 'Anne' }
  }, {
    id: 2,
    title: 'Hot Collection',
    owner: { id: 1, type: 'group', name: 'ANT Organization' }
  }]
};

const user = new schema.Entity('users');
const group = new schema.Entity('groups');
const collection = new schema.Entity('collections', {
  owner: new schema.Union({
    user: user,
    group: group
  }, 'type')
});
const feedSchema = { 
  collections: [collection] 
};

const normalizedData = normalize(input, feedSchema);

console.log(JSON.stringify(normalizedData, null, 2));


