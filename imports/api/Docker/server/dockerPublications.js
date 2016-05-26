import { docker } from './Docker.js';
import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
Meteor.publish('containers', function () {
  docker.listContainers((err, containers) => {
    containers.forEach(container => {
      this.added('containers', container.Id, { container });
      this.ready();
    });
  });
});

Meteor.publish('containerLogs', function (containerId) {
  check(containerId, String);
  const onLogs = Meteor.bindEnvironment(data => {
    this.added('logs', Random.id(), { containerId, logs: data });
    this.ready();
  });
  const container = docker.getContainer(containerId);
  if (container) {
    container.logs({ follow: true, stdout: true, stderr: true }, (err, logs) => {
      if (logs) {
        logs.setEncoding('utf8');
        logs.on('data', onLogs);
        this.onStop(() => logs.removeListener('data', onLogs));
      } else {
        console.log(err);
      }
    });
  }
});

Meteor.publish('dockerStats', function (containerId) {
  check(containerId, String);
  let initializing = true;
  const onStats = Meteor.bindEnvironment(data => {
    if (initializing) {
      this.added('stats', containerId, { stats: data });
      initializing = false;
    } else {
      this.changed('stats', containerId, { stats: data });
    }
    this.ready();
  });
  const container = docker.getContainer(containerId);
  if (container) {
    container.stats((err, stats) => {
      if (stats) {
        stats.setEncoding('utf8');
        stats.on('data', onStats);
        this.onStop(() => stats.removeListener('data', onStats));
      } else {
        console.log(err);
      }
    });
  }
});

Meteor.publish('dockerHosts', function() {
  docker.info((err, info) => {
    if (info) {
      this.added('hosts', Random.id(), { hosts: info })
      this.ready();
    } else {
      console.log(err);
      this.ready();
    }
  });
})
