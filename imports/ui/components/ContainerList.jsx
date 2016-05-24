import React from 'react';

export default class ContainerList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(event) {
    event.preventDefault();
  }

  listContainerIds() {
    return this.props.containers.map((container, index) => {
      return (
          <a href="#"
            onClick={this.handleClick.bind(this)}
            className="list-group-item"
            key={index}>{container.substring(0, 12)}</a>
      )
    });
  }

  render() {
    return (
      <ul className="list-group">
        {this.listContainerIds()}
      </ul>
    );
  }
}
