import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import cookie from 'react-cookies';
import exploreIcon from './img/exploreIcon.svg'
import mypageIcon from './img/mypageIcon.svg'
import communityIcon from './img/communityIcon.svg'
import connectionIcon from './img/connectionIcon.svg'
import messageIcon from './img/messageIcon.svg'

class LeftSide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address_json: '',
            address: '',
            usernickname: ''
        }
    }

    componentDidMount(){
        this.decoded();
    }

    decoded = () => {
        axios.post('/api/getAddress?type=decoded', {
            token3 : cookie.load('usernickname')
        })
        .then( response => {
            this.setState({usernickname : response.data.token3.number});
            this.getAddress();
        })
        .catch( error => {
            console.log('leftside1'+error)
        });
    }

    getAddress = () => {
        axios.post('/api/getAddress?type=list', {
            userNickname : this.state.usernickname
        })
        .then( response => {
            try {
                this.setState({ address_json: response });
                this.setState({ address: this.state.address_json.data.json[0].nickname });
            } catch (error) {
                console.log('leftside2'+error)
            }
        })
        .catch( error => {alert('error (Leftside2)');return false;} );
    }

    render () {
        return(
            <div className="leftside">
                <ul className="af">
                    <Link to={'/Home'} onClick={() => {window.location.href='/Home'}}>
                        <li className="menulist">
                        <img src={exploreIcon} alt="" width='23px' height='23px'/><p>블로그 새글</p>
                        </li>
                    </Link>
                    <Link to={'/mypage/'+this.state.address} onClick={() => {window.location.href='/mypage/'+this.state.address}}>
                        <li className="menulist">
                            <img src={mypageIcon} alt="" width='20px' height='20px'/><p>마이페이지</p>
                        </li>
                    </Link>
                    <Link to={'/Monsters'} onClick={() => {window.location.href='/Monsters'}}>
                        <li className="menulist">
                            <img src={messageIcon} alt="" width='21px' height='21px'/><p>메시지</p>
                        </li>
                    </Link>
                </ul>
            </div>
        );
    }
}

export default LeftSide;