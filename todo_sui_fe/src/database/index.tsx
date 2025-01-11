import Realm from 'realm';
import { UserSchema } from './user';
import { ProductSchema } from './product';

Realm.flags.THROW_ON_GLOBAL_REALM = true;
const realm = new Realm({
  schema: [UserSchema, ProductSchema], 
  schemaVersion: 1, 
});

export default realm;