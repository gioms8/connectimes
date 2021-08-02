import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import cookie from 'react-cookies';
import axios from "axios";

// css
import './css/new.css';

import Header from './Pages/Header';
import Home from './Pages/Home';
import MyPage from './Pages/MyPage'
import Register from './Pages/Register';
import PwChangeForm from './Pages/PwChangeForm';
import Monsters from './Pages/Monsters';

import LoginForm from './Elements/LoginForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    if(window.location.pathname.indexOf('/PwChangeForm') == -1){
      axios.post('/api/LoginForm?type=SessionConfirm', {
        token1 : cookie.load('userid')
      })
      .then( response => {
          this.state.userid = response.data.token1
          let password = cookie.load('userpassword')
          if(password !== undefined){
            axios.post('/api/LoginForm?type=SessionSignin', {
              is_Email: this.state.userid,
              is_Token : password
            })
            .then( response => {
              if(response.data.json[0].email === undefined){
                this.noPermission()
              }
            })
            .catch( error => {
              this.noPermission()
              console.log('에러임 :'+error)
            });
          }else{
            this.noPermission()
          }
      })
      .catch( response => this.noPermission());
    }
  }

  noPermission = (e) => {
    if(window.location.hash != 'nocookie'){
      this.remove_cookie();
      window.location.href = '/login/#nocookie';
    }
  };

  remove_cookie = (e) => {
    cookie.remove('userid', { path: '/'});
    cookie.remove('userpassword', { path: '/'});
    cookie.remove('usernickname', { path: '/'});
  }

  render () {
    return (
      <>
          <Header/>
          <div className='exercise'>
          <Route path='/' component={LoginForm} exact />
          <Route path='/login' component={LoginForm} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/PwChangeForm/:email/:token' component={PwChangeForm} exact />
          <Route path='/home' component={Home} exact />
          <Route path='/myPage' component={MyPage} />
          <Route path='/Monsters' component={Monsters} exact />
          </div>
      </>
    );
  }
}

export default App;