import React from 'react';
import ContainerList from './ContainerList';
import { _ } from 'meteor/underscore';
import { Containers } from '../../api/containers/client/containers.js';
export default class StatsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  formatMemoryUsagePercent(used, limit) {
    return ((used / limit) * 100).toFixed(2);
  }

  formatMemoryUsage(used, limit) {
    let formatUsed;
    let formatLimit;
    if (used >= 1000000000 ) {
      formatUsed = `${used / 1000000000} GB`;
    } else {
      formatUsed = `${used / 1000000} MB`;
    }

    if (limit >= 1000000000) {
      formatLimit = `${limit / 1000000000} GB`;
    } else {
      formatLimit = `${limit / 1000000} MB`;
    }
    return `${formatUsed} / ${formatLimit}`
  }
  formatCPUUsage(stats) {
    let percent = 0;
    const cpuDelta = stats.cpu_stats.cpu_usage.total_usage - stats.precpu_stats.cpu_usage.total_usage;
    const systemDelta = stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage;
    return ((cpuDelta / systemDelta) * 100).toFixed(2);
  }

  getContainerImage(containerId) {
    const container = _.findWhere(this.props.containers, { _id: containerId });
    return container.container.Image;
  }

  getContainerName(containerId) {
    const container = _.findWhere(this.props.containers, { _id: containerId });
    return container.container.Names[0].replace(/\/.*\//g, '');
  }

  renderTableRows() {
    return this.props.stats.map((container, index) => {
      const stats = container ? JSON.parse(container.stats) : {};
      if (container) {
        return (
          <tr key={index} >
            <td>{index+1}</td>
            <td>{this.getContainerImage(container._id)}</td>
            <td>{container._id.substring(0, 12)}</td>
            <td>{this.formatCPUUsage(stats)}</td>
            <td>{this.formatMemoryUsage(stats.memory_stats.usage, stats.memory_stats.limit)}</td>
            <td>{this.formatMemoryUsagePercent(stats.memory_stats.usage, stats.memory_stats.limit)}%</td>
            <td><a href={`/logs/${container._id}`} rel="noopener noreferrer" target="_blank">{this.getContainerName(container._id)}</a></td>
          </tr>
        );
      }
    });
  }

  render() {
    return (
      <table className="cl table" data-sort="table">
        <thead>
          <tr>
            <th>#</th>
            <th>IMAGE</th>
            <th>ID</th>
            <th>CPU %</th>
            <th>MEM USAGE / LIMIT</th>
            <th>MEM %</th>
            <th>LOGS</th>
          </tr>
        </thead>
        <tbody>
          { this.renderTableRows() }
        </tbody>
      </table>
    );
  }
}

StatsTable.contextTypes = {
  router: React.PropTypes.object,
};
