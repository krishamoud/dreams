import React from 'react';
import ContainerList from './ContainerList';
import StatsTable from './StatsTable';
import { _ } from 'meteor/underscore';
export default class HostInformation extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSystemStatus() {
    const hosts = this.props.hosts ? this.props.hosts.hosts : {SystemStatus: []};
    return hosts.SystemStatus.map((host, index) => {
      return <p key={index} >{host.join(' ')}</p>
    });
  }

  getPanelColor(status) {
    switch (status) {
      case 'Healthy':
        return 'panel panel-success';
        break;
      case 'Pending':
        return 'panel panel-danger';
        break;
      default:
        return 'panel panel-primary';
        break;
    }
  }

  getMemoryPercent(memory) {
    const memoryNumbers = memory.split('/');
    const used = memoryNumbers[0].split(' ');
    const limit = memoryNumbers[1].split(' ');
    let formatUsed;
    let formatLimit;
    if (used[1] == 'GiB' ) {
      formatUsed = used[0] * 1000000000;
    } else {
      formatUsed = used[0] * 1000000;
    }

    if (limit[2] == 'GiB') {
      formatLimit = limit[1] * 1000000000;
    } else {
      formatLimit = limit[1] * 1000000;
    }
    const percent = ((formatUsed/formatLimit) * 100).toFixed(2);
    return percent !== 'NaN' ? `${percent}%` : '';
  }

  renderHostData() {
    const hosts = this.props.hosts ? this.props.hosts.hosts : {SystemStatus: []};
    let hostArr = [];
    return hosts.SystemStatus.slice(4).map((host, index) => {
      if (!(index % 9)) {
        const machine = host.join(' ');
        return (
            <div className="col-lg-4" key={index}>
              <div className={this.getPanelColor(hosts.SystemStatus.slice(4)[index + 1][1])}>
                <div className="panel-heading">
                  {machine}
                </div>
                  <ul className="list-group">
                    <li className="list-group-item">{hosts.SystemStatus.slice(4)[index + 1].join(': ').replace(/└/g, '')}</li>
                    <li className="list-group-item">{hosts.SystemStatus.slice(4)[index + 2].join(': ').replace(/└/g, '')}</li>
                    <li className="list-group-item">{hosts.SystemStatus.slice(4)[index + 3].join(': ').replace(/└/g, '')}</li>
                    <li className="list-group-item">{hosts.SystemStatus.slice(4)[index + 4].join(': ').replace(/└/g, '')}</li>
                    <li className="list-group-item">Reserved Memory Percent: {this.getMemoryPercent(hosts.SystemStatus.slice(4)[index + 4][1])}</li>
                    <li className="list-group-item">{hosts.SystemStatus.slice(4)[index + 5].join(': ').replace(/└/g, '')}</li>
                    <li className="list-group-item">{hosts.SystemStatus.slice(4)[index + 6].join(': ').replace(/└/g, '')}</li>
                    <li className="list-group-item">{hosts.SystemStatus.slice(4)[index + 7].join(': ').replace(/└/g, '')}</li>
                    <li className="list-group-item">{hosts.SystemStatus.slice(4)[index + 8].join(': ').replace(/└/g, '')}</li>
                  </ul>
              </div>
            </div>
          )
      }
    })
  }

  render() {
    return (
      <div className="col-lg-12">
        <div className="row">
          {this.renderHostData()}
        </div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            System Status
          </div>
          <div className="panel-body">
            {this.renderSystemStatus()}
          </div>
        </div>
      </div>
    );
  }
}
