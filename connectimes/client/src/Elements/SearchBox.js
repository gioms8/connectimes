import React, { Component } from 'react';

class SearchBox extends Component {

    render() {
        return (
          <input
            className="search"
            type="search"
            placeholder="Search..."
            onChange={this.props.handleChange}
          />
        );
      }
    }

export default SearchBox;