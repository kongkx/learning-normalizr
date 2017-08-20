import { normalize, schema } from 'normalizr';

const input = {
  '1': {
    id: 1, type: 'admin',
  },
  '2': {
    id: 2, type: 'user'
  }
}

const user = new schema.Entity('users');
const admin = new schema.Entity('admins');
const valuesSchema = new schema.Values({
  admin: admin,
  user: user
}, 'type');

const normalizedData = normalize(input, valuesSchema);

console.log(JSON.stringify(normalizedData, null, 2));
