import { Mongo } from 'meteor/mongo';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';
export const Containers = new Mongo.Collection('containers');
export default Containers;
