import React, { Component } from 'react';

class SearchPreview extends Component {

    render(){
        return (
            <div
               className={`search-preview ${this.props.index == 0 ? "start" : ""}`}
            >
            <div className="first">
            <p className="name">{this.props.name}</p>
            <p className="sub-header">{this.props.position}</p>
            </div>
            {/* <div className="second">
            <p className="age">{age}</p>
            <p className="sub-header">age</p>
            </div> */}
        </div>
        );
    }

}

  export default SearchPreview;