import React, { Component } from 'react';

import Card from './Card';

class CardList extends Component {

    render() {
        return (
            <div className='card-list'>
                {this.props.monsters.map((monster) => {
                    return (
                        <Card id={monster.id} name={monster.name} email={monster.email} />
                    )
                })}
            </div>
        );
      }
    }

export default CardList;