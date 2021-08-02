import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import cookie from 'react-cookies';
import $ from 'jquery';
import Swal from 'sweetalert2';
import logo from './img/logoexample2.png'
import searchIcon from './img/searchIcon.svg'
import alarmIcon from './img/alarmIcon.svg'
import downIcon from './img/downIcon.svg'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernm:'',
        };
    }
    componentDidMount() {
        var cookie_userid = cookie.load('userid')
        var cookie_password = cookie.load('userpassword')

        if(cookie_userid != undefined){
            const expires = new Date()
            expires.setMinutes(expires.getMinutes() + 60)

            cookie.save('userid', cookie_userid
            , { path: '/', expires })
            cookie.save('userpassword', cookie_password
            , { path: '/', expires })

            $('.menulist').show()
            $('.header').show()
        }else{
            $('.menulist').hide()
            $('.header').hide()
        }
        this.callSessionInfoApi()
    }

    callSessionInfoApi = (type) => {
        axios.post('/api/LoginForm?type=SessionConfirm', {
            token1 : cookie.load('userid') 
        })
        .then( response => {
            this.setState({usernm : response.data.token1})
        })
        .catch( error => {
            this.sweetalert('작업중 오류가 발생하였습니다. (Header1)', error, 'error', '닫기');
        });
    }

    sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
          })
    }

    myInfoHover () {
        $(".hd_left > li > .box1").stop().fadeIn(300);
    }
    
    myInfoLeave () {
        $(".hd_left > li > .box1").stop().fadeOut(300);
    }

    logout = async e => {
        cookie.remove('userid', { path: '/'});
        cookie.remove('userpassword', { path: '/'});
        window.location.href = '/login';
    }

    render () {
        return(
            <header className='header'>

                <div className="logo">
                    <Link to={'/home'}><img src={logo} alt="" width='' height=''/></Link>
                </div>
                
                <div className='icons'>
                    <ul className="hd_left af1">
                        <li className="search_bar"><img src={searchIcon} alt="" width='15px' height='15px' /></li>
                        <li className="alarm"><img src={alarmIcon} alt="" width='16px' height='16px'/></li>
                        <li className="down" onMouseEnter={this.myInfoHover} onMouseLeave={this.myInfoLeave}><img src={downIcon} alt="" width='16px' height='16px'/>
                            <div className="box0 box1">
                                <ul>
                                    <li><a>내 정보 수정</a></li>
                                    <li><a href="javascript:" onClick={this.logout}>로그아웃</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>

            </header>
        );
    }
}

export default Header;