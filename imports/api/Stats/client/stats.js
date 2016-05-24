import { Mongo } from 'meteor/mongo';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';
export const Stats = new Mongo.Collection('stats');
export default Stats;
