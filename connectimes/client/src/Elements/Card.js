import React, { Component } from 'react';

import './css/SearchBar.css'

class Card extends Component {

    render() {
        return (
            <div>
                <h2 className='zzz'>{this.props.name}</h2>
                <p className='zzz'>  {this.props.email}</p>
            </div>
        );
      }
    }

export default Card;