import React, { Component } from 'react';

import SearchBox from '../Elements/SearchBox';
import CardList from '../Elements/CardList';

class Monsters extends Component {

    constructor (props) {
        super(props);
        this.state = {
            monsters: [
                {name: '거북이', email:'2,314', id:'ds'},
                {name: '거봉', email:'660', id:'dfs'},
                {name: '거부기', email:'4,589', id:'dfs'},
                {name: '거', email:'46', id:'dfs'},
                {name: '거북', email:'24', id:'dfs'},
                {name: 'ㄱ', email:'125', id:'dfs'},
                {name: '거부', email:'209', id:'dfs'},
                {name: '거바', email:'44,636', id:'dfs'},
                {name: '거부기', email:'357', id:'dfs'},
                {name: '거북지', email:'388,276', id:'dfs'},
                {name: '거북치', email:'1,538', id:'dfs'},
                {name: '거북키', email:'111,345', id:'dfs'},
                {name: '거북기', email:'267', id:'dfs'},
                {name: '거복', email:'24', id:'dfs'}
            ],
            userInput: "",
        }
    }
    
    

    handleChange = (e) => {
        this.setState({
            userInput: e.target.value
        });
    };

    handleSearch = () => {
        const filtered = this.state.monsters.filter((monster) => {
            return monster.name.toLowerCase().indexOf(this.state.userInput) > -1;
        });
        return filtered;
    };


    render() {
        let _result = null;
        if (this.state.userInput) {
            _result = <CardList monsters={this.handleSearch()} />;
        } else {
            _result = <CardList monsters={this.state.monsters} />;
        }

    return (
        <div className="Monsters">
            <h1>검색기능 구현중</h1>
            <SearchBox handleChange={this.handleChange} />
            {_result}
        </div>
    );
    }
}

export default Monsters;