import React, { Component } from 'react';
import axios from "axios";
import Swal from 'sweetalert2'
import $ from 'jquery';

class Register extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }

    submitClick = async (type, e) => {

        this.email_val_checker = $('#email_val').val();
        this.email2_val_checker = $('#email2_val').val();
        this.pwd_val_checker = $('#pwd_val').val();
        this.pwd_cnf_val_checker = $('#pwd_cnf_val').val();
        this.nickName_val_checker = $('#nickName_val').val();

        this.fnValidate = (e) => {
            var pattern1 = /[0-9]/;
            var pattern2 = /[a-zA-Z]/;
            var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;

            if(this.email_val_checker === '') {
                $('#email_val').addClass('border_validate_err');
                this.sweetalert('이메일 주소를 다시 확인해주세요.', '', 'info', '닫기')
                return false;
            }
            if(this.email_val_checker.search(/\s/) !== -1) {
                $('#email_val').addClass('border_validate_err');
                this.sweetalert('이메일 공백을 제거해주세요.', '', 'info', '닫기')
                return false;
            }
            $('#email_val').removeClass('border_validate_err');

            if(this.email2_val_checker ==='') {
                $('#email2_val').addClass('border_validate_err');
                this.sweetalert('이메일 주소를 다시 확인해주세요.', '', 'info', '닫기')
                return false;
            }
            $('#email2_val').removeClass('border_validate_err');

            if(this.pwd_val_checker ==='') {
                $('#pwd_val').addClass('border_validate_err');
                this.sweetalert('비밀번호를 입력해주세요.', '', 'info', '닫기')
                return false;
            }
            if(this.pwd_val_checker !=='') {
                var str = this.pwd_val_checker;
                if(str.search(/\s/) !== -1) {
                    $('#pwd_val').addClass('border_validate_err');
                    this.sweetalert('비밀번호 공백을 제거해주세요.', '', 'info', '닫기')
                    return false;
                } 
                if(!pattern1.test(str) || !pattern2.test(str) || !pattern3.test(str)
                || str.length < 8 || str.length > 16) {
                    $('#pwd_val').addClass('border_validate_err');
                    this.sweetalert('8~16자 영문 대 소문자\n숫자, 특수문자를 사용하세요.', '', 'info', '닫기')
                    return false; 
                } 
            }
            $('#pwd_val').removeClass('border_validate_err');

            if(this.pwd_cnf_val_checker ==='') {
                $('#pwd_cnf_val').addClass('border_validate_err');
                this.sweetalert('비밀번호 확인을 입력해주세요.', '', 'info', '닫기')
                return false;
            }
            if(this.pwd_val_checker !== this.pwd_cnf_val_checker) {
                $('#pwd_val').addClass('border_validate_err');
                $('#pwd_cnf_val').addClass('border_validate_err');
                this.sweetalert('비밀번호가 일치하지 않습니다.', '', 'info', '닫기')
                return false;
            }
            $('#pwd_cnf_val').removeClass('border_validate_err');

            if(this.nickName_val_checker ==='') {
                $('#nickName_val').addClass('border_validate_err');
                this.sweetalert('닉네임을 입력해주세요.', '', 'info', '닫기')
                return false;
            }
            if(this.nickName_val_checker.search(/\s/) !== -1) {
                $('#nickName_val').addClass('border_validate_err');
                this.sweetalert('닉네임에 공백을 제거해주세요.', '', 'info', '닫기')
                return false;
            }
            $('#nickName_val').removeClass('border_validate_err');

            return true;
        }

        if(this.fnValidate()){
            this.state.full_email = this.email_val_checker+'@'+this.email2_val_checker
            axios.post('/api/register?type=dplicheck', {
                is_Email: this.email_val_checker+'@'+this.email2_val_checker
            })
            .then( response => {
                try {
                    const dupli_count = response.data.json[0].num;
                    if(dupli_count !== 0){
                        $('#email_val').addClass('border_validate_err');
                        $('#email2_val').addClass('border_validate_err');
                        this.sweetalert('이미 존재하는 이메일입니다.', '', 'info', '닫기')
                    }else{
                        $('#email_val').removeClass('border_validate_err');
                        $('#email2_val').removeClass('border_validate_err');
                        this.fnSignInsert('signup', e)
                    }
                } catch (error) {
                    this.sweetalert('작업중 오류가 발생하였습니다.qqq (Register1)', error, 'error', '닫기')
                }
            })
            .catch( response => { return false; } );
        }

        this.fnSignInsert = async (type, e) => {
            var jsonstr = $("form[name='frm']").serialize();
            jsonstr = decodeURIComponent(jsonstr);
            var Json_form = JSON.stringify(jsonstr).replace(/\"/gi,'')
            Json_form = "{\"" +Json_form.replace(/\&/g,'\",\"').replace(/=/gi,'\":"')+"\"}";
           
            try {
                const response = await fetch('/api/register?type='+type, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: Json_form,
                });
                const body = await response.text();
                if(body === "succ"){
                    this.sweetalert('회원가입이 완료되었습니다.', '', 'info', '닫기')
                    this.props.history.push('/');
                }else{
                    this.sweetalert('작업중 오류가 발생하였습니다. (Register2)', body, 'error', '닫기');
                }  
            } catch (error) {
                this.sweetalert('작업중 오류가 발생하였습니다. (Register3)', error, 'error', '닫기');
            }
        }
    };

    emailKeyPress = (e) => {
        $('#email_val').removeClass('border_validate_err');
    };

    pwdKeyPress = (e) => {
        $('#pwd_val').removeClass('border_validate_err');
    };

    pwdCnfKeyPress = (e) => {
        $('#pwd_cnf_val').removeClass('border_validate_err');
    };

    nickNameKeyPress = (e) => {
        $('#nickName_val').removeClass('border_validate_err');
    };

    handleSubmit = (e) => {
        e.preventDefault();
    };
    
    mustNumber = (id) => {
        var pattern1 = /[0-9]/;
        var str = $('#'+id).val();
        if(!pattern1.test(str.substr(str.length - 1, 1))){
            $('#'+id).val(str.substr(0, str.length-1));
        }
    }

    sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
          })
    }

    render () {
        return (
            <div>
                <section className="sub_wrap" >
                    <article className="s_cnt re_1 ct1">
                        <div className="li_top">
                            <h2 className="s_tit1">회원가입</h2>
                            <form method="post" name="frm">
                                <div className="re1_wrap">
                                    <div className="re_cnt ct2">
                                        <table className="table_ty1">
                                            <tr className="re_email">
                                                <th>이메일</th>
                                                <td>
                                                    <input id="email_val" type="text" name="is_email1"
                                                    placeholder="이메일을 입력해주세요." onKeyPress={this.emailKeyPress}/>
                                                    <span className="e_goll">@</span>
                                                    <select id="email2_val" name="is_email2" className="select_ty1">
                                                            <option value="">선택하세요</option>
                                                            <option value='naver.com'>naver.com</option>
                                                            <option value='hanmail.net'>hanmail.net</option>
                                                            <option value='nate.com'>nate.com</option>
                                                            <option value='gmail.com'>gmail.com</option>
                                                            <option value='yahoo.co.kr'>yahoo.co.kr</option>
                                                            <option value='yahoo.com'>yahoo.com</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>비밀번호</th>
                                                <td>
                                                    <input id="pwd_val" type="password" name="is_pw"
                                                    placeholder="비밀번호를 입력해주세요." onKeyPress={this.pwdKeyPress} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>비밀번호 확인</th>
                                                <td>
                                                    <input id="pwd_cnf_val" type="password" name="is_pw"
                                                    placeholder="비밀번호를 한번 더 입력해주세요." onKeyPress={this.pwdCnfKeyPress}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>닉네임</th>
                                                <td>
                                                    <input id="nickName_val" type="text" name="is_nickName"
                                                    placeholder="닉네임을 입력해주세요." onKeyPress={this.nameKeyPress}/>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div className="btn_confirm">
                                    <div className="bt_ty bt_ty2 submit_ty1" 
                                    onClick={(e) => this.submitClick('signup', e)}>회원가입</div>
                                </div>
                            </form>
                        </div>
                    </article>
                </section>
            </div>
        );
    }
}

export default Register;