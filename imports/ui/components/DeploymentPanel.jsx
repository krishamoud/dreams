import React from 'react';
import ContainerList from './ContainerList';
import StatsTable from './StatsTable';
import { _ } from 'meteor/underscore';
export default class DeploymentPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  subdomainStats(subdomain) {
    const containerIds = this.props.deployment.containerIds;
    return containerIds.map(containerId => {
      const stats =  _.findWhere(this.props.stats, { _id: containerId });
      return stats;
    })
  }


  render() {
    return (
      <div className="col-lg-12">
        <div className="panel panel-success">
          <div className="panel-body">
            <StatsTable
              containers={this.props.containers}
              stats={this.props.stats}
            />
          </div>
        </div>
      </div>
    );
  }
}
