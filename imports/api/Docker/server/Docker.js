// need the file system to read our certs
import fs from 'fs';
import { Meteor } from 'meteor/meteor';
import { Docker } from 'meteor/djabatav:dockerode';

// create a new instance of docker from the dockerode package.
// learn more here: https://github.com/apocas/dockerode
export const docker = new Docker({ host: `http://${Meteor.settings.DOCKER_HOST}`,
                         port: 3376,
                         ca: fs.readFileSync(`${Meteor.settings.CERT_FILE_PATH}/ca.pem`),
                         cert: fs.readFileSync(`${Meteor.settings.CERT_FILE_PATH}/server.pem`),
                         key: fs.readFileSync(`${Meteor.settings.CERT_FILE_PATH}/server-key.pem`),
                       });
