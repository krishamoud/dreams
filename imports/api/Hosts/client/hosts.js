import { Mongo } from 'meteor/mongo';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';
export const Hosts = new Mongo.Collection('hosts');
export default Hosts;
