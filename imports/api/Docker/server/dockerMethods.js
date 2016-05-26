import { HTTP } from 'meteor/http';
import { _ } from 'meteor/underscore';
import { docker } from './Docker.js';
import fs from 'fs';

Meteor.methods({
  getNodes() {
    // const nodes = HTTP.get(`${Meteor.settings.CONSUL_ADDR}/v1/kv/docker/nodes?recurse`).data;
    // const instances = _.filter(nodes, node => !!node.Value);
    // let dockerArr = [];
    // instances.forEach(instance => {
    //   instance.Key = instance.Key.replace(/docker\/nodes\//g, '').split(':')[0];
    //   const dockerInstance = new Docker({ host: `http://${instance.Key}`,
    //     port: 2376,
    //     // ca: fs.readFileSync(`${Meteor.settings.CERT_FILE_PATH}/ca.pem`),
    //     // cert: fs.readFileSync(`${Meteor.settings.CERT_FILE_PATH}/server.pem`),
    //     // key: fs.readFileSync(`${Meteor.settings.CERT_FILE_PATH}/server-key.pem`),
    //   });
    //   dockerInstance.info((err, info) => {
    //     console.log('here');
    //     console.log(info);
    //     console.log(err);
    //   });
    // });
    //
    docker.info((err, info) => console.log(info));
  }
})
