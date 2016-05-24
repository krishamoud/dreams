import { Mongo } from 'meteor/mongo';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';
export const Logs = new Mongo.Collection('logs');
export default Logs;
