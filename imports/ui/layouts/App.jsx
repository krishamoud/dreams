import React from 'react';
import { Meteor } from 'meteor/meteor';
import DeploymentPanel from '../components/DeploymentPanel';
import HostInformation from '../components/HostInformation';
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  listDeployments() {
    const containers = this.props.containers;
    return <DeploymentPanel containers={containers} stats={this.props.stats} />
  }

  listHosts() {
    const hosts = this.props.hosts;
    return <HostInformation hosts={hosts[0]} />
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 content">
              <div className="row">
                <div className="col-md-12 m-b-md">
                  {this.listDeployments()}
                </div>
                <div className="row">
                  {this.listHosts()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
