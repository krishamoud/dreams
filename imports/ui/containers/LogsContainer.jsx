import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import LogsPage from '../pages/Logs.jsx';
import { Logs } from '../../api/Logs/client/logs.js';

export default createContainer(({ params: { id } }) => {
  const logsSub = Meteor.subscribe('containerLogs', id);
  return {
    logs: Logs.find({ containerId: id }).fetch(),
  };
}, LogsPage);
