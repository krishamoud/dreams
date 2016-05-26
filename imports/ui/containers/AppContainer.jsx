import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Containers } from '../../api/Containers/client/containers.js';
import { Stats } from '../../api/Stats/client/stats.js';
import { Hosts } from '../../api/Hosts/client/hosts.js';
import { Tracker } from 'meteor/tracker';
import App from '../layouts/App.jsx';

export default createContainer(() => {
  const containerSub = Meteor.subscribe('containers');
  const hostSub = Meteor.subscribe('dockerHosts');
  let containerIds = [];
  Tracker.autorun(() => {
    if (containerSub.ready()) {
      const containers = Containers.find().fetch();
      containers.forEach((container) =>{
        containerIds.push(container._id);
      })
    }
  });
  containerIds.forEach((container) => {
    Meteor.subscribe('dockerStats', container);
  });
  return {
    containers: Containers.find().fetch(),
    stats: Stats.find().fetch(),
    hosts: hostSub.ready() ? Hosts.find().fetch() : [],
  };
}, App);
