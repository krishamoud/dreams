import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Containers } from '../../api/containers/client/containers.js';
import { Stats } from '../../api/Stats/client/stats.js';
import { Tracker } from 'meteor/tracker';
import App from '../layouts/App.jsx';

export default createContainer(() => {
  const containerSub = Meteor.subscribe('containers');
  let containerIds = [];
  Tracker.autorun(() => {
    if (containerSub.ready()) {
      const containers = Containers.find().fetch();
      // const stat = Stats.find().fetch();
      // console.log(stat);
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
  };
}, App);
