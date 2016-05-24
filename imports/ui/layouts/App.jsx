import React from 'react';
import { Meteor } from 'meteor/meteor';
import DeploymentPanel from '../components/DeploymentPanel';
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  listDeployments() {
    const containers = this.props.containers;
    return <DeploymentPanel containers={containers} stats={this.props.stats} />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
