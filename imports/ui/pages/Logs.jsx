import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
export default class LogsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLogs() {
    const logs = this.props.logs;
    return logs.map((log, index) => {
      return <p key={index} >{log.logs}</p>
    })
  }

  render() {
    return (
        <pre>{this.renderLogs()}</pre>
    );
  }
}
