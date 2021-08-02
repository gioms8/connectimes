import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import cookie from 'react-cookies';
import $, { ajaxPrefilter } from 'jquery';
import Swal from 'sweetalert2';

import LeftSide from './LeftSide';
import RightSide from './RightSide';

import dots from './img/3dots.png'

import like_full from './img/like_full.svg'

import menu from './img/menu.svg'


import TextareaAutosize from 'react-autosize-textarea';


class MyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            saveIntroduce: '',
            append_Introduce: '',
            savePost: '',
            append_Post: '',
            selectedFile: null,
            selectedFile2: null,
            selectedFile3: null,
            testing: '',
            usernum: '',
            saveTopTag: '',
            append_TopTag: '',
            usernumFromNick: '',
            saveComment: '',
            append_Comment: '',
            items: 3,
            preItems: 0,
            commentList: '',
            saveTarget: '',
            division: '',
            targetVal:'',
            savePostNum:'',
            testtt1 : 0
        }
    }

    componentDidMount(){
        $(document).ready(function() {

            $('#loading').hide();
            $('#trans').submit(function(){
                $('#loading').show();
                return true;
                });
            });
            
        this.usernumsave();
        this.callIntroduceApi();
        this.callFollow();
        this.callPostApi();
        this.callTopTag();
        this.appear();
        window.addEventListener('scroll', this._infiniteScroll, true)

    }

    // 내 페이지 일때만 코멘트 작성, 대문 정보 수정 버튼 보이게.
    // default를 display:none 으로 해놓고 일치하면 보이게.
    appear = () => {
        var path = window.location.pathname;
        
        axios.post('/api/writehidden?type=list', {
            nickName : decodeURI(path.substr(8))
        })
        .then( response => {
            try {
                this.setState({ usernumFromNick : response });
                var usernumFromNick = this.state.usernumFromNick.data

                if(usernumFromNick.json[0].usernum == this.state.usernum){
                    $("#mypagewrite").css("display","block");
                    $("#fixButton").css("display","inline-block");
                    $("#followButton_yes").css("display","none");
                    $("#followButton_no").css("display","none");
                }
            } catch (error) {
                alert('mypage11sdsdsd'+error)
            }
        })
    }

    callTopTag = () => {
        var path = window.location.pathname;

        axios.post('/api/calltoptag?type=list', {
            nickName : decodeURI(path.substr(8))
        })
        .then( response => {
            try {
                this.setState({ saveTopTag: response });
                this.setState({ append_TopTag: this.SaveTopTagAppend() });
            } catch (error) {
                alert('mypage111111'+error)
            }
        })
    }

    SaveTopTagAppend = () => {
        let result4 = []
        var SaveTopTag = this.state.saveTopTag.data

        if(SaveTopTag.json.length > 4) {
            for(let i=0; i<5; i++){
                var data2 = SaveTopTag.json[i]
                result4.push(
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            {i+1}
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div className='Mypage_hash'>#</div>
                            <input className='Mypage_tagnames' type='button' id={'test'+i} onClick={e=>this.tagClick1(e)} value={data2.tagname}/>
                            <div className='Mypage_TagCounting'>{data2.counting}</div>
                        </div>
                    </div>
                )
            }
            result4.push(
                <div className='Mypage_Tag_Bottom'></div>
        )
        } else if ( SaveTopTag.json.length == 4 ) {
            for(let i=0; i<4; i++){
                var data2 = SaveTopTag.json[i]
                result4.push(
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            {i+1}
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div className='Mypage_hash'>#</div>
                            <input className='Mypage_tagnames' type='button' id={'test'+i} onClick={e=>this.tagClick1(e)} value={data2.tagname}/>
                            <div className='Mypage_TagCounting'>{data2.counting}</div>
                        </div>
                    </div>
                )
            }
            result4.push(
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            5
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div>-</div>
                        </div>
                        <div className='Mypage_Tag_Bottom'></div>
                    </div>
            )
        } else if ( SaveTopTag.json.length == 3 ) {
            for(let i=0; i<3; i++){
                var data2 = SaveTopTag.json[i]
                result4.push(
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            {i+1}
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div className='Mypage_hash'>#</div>
                            <input className='Mypage_tagnames' type='button' id={'test'+i} onClick={e=>this.tagClick1(e)} value={data2.tagname}/>
                            <div className='Mypage_TagCounting'>{data2.counting}</div>
                        </div>
                    </div>
                )
            }
            result4.push(
                <div>
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            4
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div>-</div>
                        </div>
                    </div>
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            5
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div>-</div>
                        </div>
                    </div>
                    <div className='Mypage_Tag_Bottom'></div>
                </div>
            )
        } else if ( SaveTopTag.json.length == 2 ) {
            for(let i=0; i<2; i++){
                var data2 = SaveTopTag.json[i]
                result4.push(
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            {i+1}
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div className='Mypage_hash'>#</div>
                            <input className='Mypage_tagnames' type='button' id={'test'+i} onClick={e=>this.tagClick1(e)} value={data2.tagname}/>
                            <div className='Mypage_TagCounting'>{data2.counting}</div>
                        </div>
                    </div>
                )
            }
            result4.push(
                <div>
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            3
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div>-</div>
                        </div>
                    </div>
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            4
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div>-</div>
                        </div>
                    </div>
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            5
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div>-</div>
                        </div>
                    </div>
                    <div className='Mypage_Tag_Bottom'></div>
            </div>
            )
        } else if ( SaveTopTag.json.length == 1 ) {
            for(let i=0; i<1; i++){
                var data2 = SaveTopTag.json[i]
                result4.push(
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            {i+1}
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <input className='Mypage_tagnames' type='button' id={'test'+i} onClick={e=>this.tagClick1(e)} value={data2.tagname}/>
                            <div className='Mypage_TagCounting'>{data2.counting}</div>
                        </div>
                    </div>
                )
            }
            result4.push(
                <div>
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            2
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div>-</div>
                        </div>
                    </div>
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            3
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div>-</div>
                        </div>
                    </div>
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            4
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div>-</div>
                        </div>
                    </div>
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            5
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div>-</div>
                        </div>
                    </div>
                    <div className='Mypage_Tag_Bottom'></div>
            </div>
            )
        } else if ( SaveTopTag.json.length == 0 ) {

            result4.push(
                <div>
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            1
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div>-</div>
                        </div>
                    </div>
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            2
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div>-</div>
                        </div>
                    </div>
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            3
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div>-</div>
                        </div>
                    </div>
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            4
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div>-</div>
                        </div>
                    </div>
                    <div className='Mypage_TopTag'>
                        <div className='Mypage_TopTagNumber'>
                            5
                        </div>
                        <div className='Mypage_TopTagNameAndCounting'>
                            <div>-</div>
                        </div>
                    </div>
                    <div className='Mypage_Tag_Bottom'></div>
            </div>
            )
        }
        
        return result4
    }

    tagClick1 = (e) => {
         window.location.href = '#top';
        this.setState({ preItems: 0 })
        this.setState({ targetVal: e.target.value })
        $('#targetValue').val(e.target.value )
        $("div[id^='testing']").empty()
        $('#preItems').val('0')
        this.setState({ division: 'noMain' })
        this.setState({ savePost: '' })
        this.setState({ savePostNum: '' })
        this.tagClick();
    }
    
    tagClick = async () => {
        $("div[id^='testing']").empty()
        this.setState({ GoOrStop : 'stop' })
        var path = window.location.pathname;

        axios.post('/api/callPost?type=list2', {
            nickName : decodeURI(path.substr(8)),
            tagname : $('#targetValue').val(),
            preItems : $('#preItems').val(),
            items : this.state.items
        })
        .then( response => {
            try {
                var arr4 = this.state.savePostNum
                var arr5 = []
                for(let i=0; i<response.data.json.length; i++){
                    arr5.push(response.data.json[i].postnum)
                }
                var arr6 = [...arr4, ...arr5]

                var arr1 = this.state.savePost
                var arr2 = response.data.json
                var arr3 = [...arr1, ...arr2]

                this.setState({ savePost: arr3 });
                this.setState({ append_Post: this.PostAppend() });


                this.setState({ savePostNum: arr6 });
                this.getCommentList();
                $("div[id^='testing']").empty()
            } catch (error) {
                console.log(error)
                alert('error (MyPage3)');
            }
        })
        .catch( error => {alert('error (MyPage4)');return false;} );

    }

    usernumsave = () => {
        axios.post('/api/calltoptag?type=decoded', {
            token4 : cookie.load('usernickname')
        })
        .then( response => {
            try {
                this.setState({ usernum: response.data.token4.number });
                this.appendFollowBtn();
            } catch (error) {
                console.log(error)
            }
        })
    }
    
    callIntroduceApi = async () => {
        var path = window.location.pathname;
        
        axios.post('/api/callIntroduce?type=list', {
            nickName : decodeURI(path.substr(8))
        })
        .then( response => {
            try {
                var introsave = response.data.json
                this.setState({ saveIntroduce: introsave });
                this.setState({ append_Introduce: this.SaveIntroduceAppend() });
            } catch (error) {
                alert('error (MyPage1)');
            }
        })
        .catch( error => {alert('error (MyPage2)');return false;} );
        
    }
    
    // 마이페이지 팔로잉, 팔로워 수 표시.
    callFollow = () => {
        var path = window.location.pathname;

        axios.post('/api/followClick?type=list1', {
            nickname : decodeURI(path.substr(8))
        })
        .then( response => {

            var followbutton1 = document.getElementById('Mypage_followWord1');
        
            var followbutton2 = document.createElement('button');
            followbutton2.className = 'Mypage_followNum'
            followbutton2.textContent = response.data.json[0].follower;
            followbutton2.type = 'button';
            followbutton2.id = 'following'
            followbutton2.onclick = () => this.unfollowClick();
            $('#following').remove()
            followbutton1.appendChild(followbutton2);

        })
        .catch( error => {console.log('error (MyPage2c3)'+error);return false;} );

        axios.post('/api/followClick?type=list2', {
            nickname : decodeURI(path.substr(8))
        })
        .then( response => {

            var followbutton1 = document.getElementById('Mypage_followWord2');
        
            var followbutton2 = document.createElement('button');
            followbutton2.className = 'Mypage_followNum'
            followbutton2.textContent = response.data.json[0].following;
            followbutton2.type = 'button';
            followbutton2.id = 'followerNum'
            followbutton2.onclick = () => this.unfollowClick();
            $('#followerNum').remove()
            followbutton1.appendChild(followbutton2);

            
        })
        .catch( error => {console.log('error (MyPage2c3)'+error);return false;} );


        var path = window.location.pathname;
        
        axios.post('/api/writehidden?type=list', {
            nickName : decodeURI(path.substr(8))
        })
        .then( response => {
            try {
                this.setState({ usernumFromNick : response });
                var usernumFromNick = this.state.usernumFromNick.data

                if(usernumFromNick.json[0].usernum !== this.state.usernum){
                    $("#followButton_yes").css("display","flex");
                    $("#followButton_no").css("display","flex");
                }
            } catch (error) {
                alert('mypage11sdsdsd'+error)
            }
        })
        

    }
    
    appendFollowBtn =  async () => {
        var path = window.location.pathname;

        axios.post('/api/followCheck?type=list', {
            usernum : this.state.usernum,
            nickname : decodeURI(path.substr(8))
        })
        .then( response => {

            // 가지고온 값이 있으면(해당 유저를 팔로우 했으면) response.data.json.lenth가 1, 없으면(안했으면) 0

                if (response.data.json.length == 1) {

                    var followbutton1 = document.getElementById('followButton');
                
                    var followbutton2 = document.createElement('button');
                    followbutton2.className = 'Mypage_follow_Button'
                    followbutton2.textContent = '팔로우';
                    followbutton2.type = 'button';
                    followbutton2.id = 'followButton_yes'
                    followbutton2.onclick = () => this.unfollowClick();
                    $('#followButton_no').remove()
                    followbutton1.appendChild(followbutton2);
                    this.callFollow();

                } else if (response.data.json.length == 0) {

                    var followbutton3 = document.getElementById('followButton');
                
                    var followbutton4 = document.createElement('button');
                    followbutton4.className = 'Mypage_follow_Button2'
                    followbutton4.textContent = '팔로우하기';
                    followbutton4.type = 'button';
                    followbutton4.id = 'followButton_no'
                    followbutton4.onclick = () => this.followClick();
                    
                    $('#followButton_yes').remove()
                    followbutton3.appendChild(followbutton4);
                    this.callFollow();

                }
            
        })
        .catch( error => {console.log('error (MyPage2c3)'+error);return false;} );

        
    }
    
    followClick = () => {
        
        var path = window.location.pathname;

        axios.post('/api/followClick?type=follow', {
            usernum : this.state.usernum,
            nickname : decodeURI(path.substr(8))
        })
        .then( response => {
                console.log(response);
                this.appendFollowBtn();
        })
        .catch( error => {alert('error (MyPage22x)');return false;} );

    }

    unfollowClick = () => {
        var path = window.location.pathname;

        if (!window.confirm(decodeURI(path.substr(8))+" 님을 언팔로우 하시겠습니까?")) {
            
        } else {
            //'예' 클릭시 실행될 것.
            axios.post('/api/followClick?type=unfollow', {
                usernum : this.state.usernum,
                nickname : decodeURI(path.substr(8))
            })
            .then( response => {
                    console.log(response);
                    this.appendFollowBtn();
            })
            .catch( error => {alert('error (MyPage22x)');return false;} );
            }
    }

    SaveIntroduceAppend = () => {

        let result3 = []
        
        for(let i=0; i<this.state.saveIntroduce.length; i++){
            var data = this.state.saveIntroduce[i]
            result3.push(
                <div>
                    <button id='fixButton' type='button' className='Mypage_fixButton' onClick={this.BtnClick}><img src={dots} alt="" width='15px' height='15px' /></button>
                    <section id='Mypage_infofix' className='Mypage_infofix'>
                        <form name="frm2" id="frm2" action="" onsubmit="" method="post" >
                            <input id='userNum' type='hidden' name='userNum' value={this.state.usernum}/>
                            <div>
                                타이틀
                                <div className='Mypage_PicOrVideo_Button'>
                                    <label for="uploadbtn2" className="btn_file">사진등록</label>
                                    <input type="text" id="manualfile2" className="fileName fileName2" readonly="readonly" placeholder="선택된 파일 없음"/>
                                    <input type="file" id="uploadbtn2" className="uploadBtn uploadbtn2" accept='.jpg, .png, .jpeg' onChange={e => this.handleFileInput2('manual',e)}/>
                                    <input type="button" id="d1eletd" className='Myapge_deleteBtn' onClick={this.filedelete2} />
                                    <div id="upload_menual2"></div>
                                </div>
                            </div>
                            <div>
                                프로필
                                <div className='Mypage_PicOrVideo_Button'>
                                    <label for="uploadbtn3" className="btn_file">사진등록</label>
                                    <input type="text" id="manualfile3" className="fileName fileName3" readonly="readonly" placeholder="선택된 파일 없음"/>
                                    <input type="file" id="uploadbtn3" className="uploadBtn uploadbtn3" accept='.jpg, .png, .jpeg' onChange={e => this.handleFileInput3('manual',e)}/>
                                    <input type="button" id="d2elett" className='Myapge_deleteBtn' onClick={this.filedelete3} />
                                    <div id="upload_menual3"></div>
                                </div>
                            </div>
                            <div className='Mypage_introductionText'>
                                소개글
                                <TextareaAutosize className='MyPage_introductionInput' cols='' rows='1' name="textArea2" maxlength='100' id='textArea2' placeholder="소개글을 입력해보세요." spellcheck="false"/>
                            </div>
                            <div>
                                주요활동위치
                            </div>
                        </form>
                        <button className='Mypage_Posting_Button' id='submitButton' type="button" onClick={this.BtnClick}>취소</button>
                        <button className='Mypage_Posting_Button' id='submitButton' type="button" onClick={(e) => this.submitClick2('update', e)}>저장</button>
                    </section>
                    <section className='Mypage_ProfilePhoto1'>
                            <img src={data.profilephoto} />
                    </section>
                    <div className='Mypage_IntroWrap'>
                        <section className='Mypage_Blogphoto'>
                            <img src={data.blogphoto} />
                        </section>
                        <section className='Mypage_NicknameAndConnectionNum'>
                            <div className='Mypage_IntroWrap2'>
                                <div className='Mypage_Nickname1'>
                                    {data.nickname}
                                </div>
                                <div id='followButton' className='Mypage_Connection1'>
                                </div>
                            </div>
                            <div className='Mypage_Introduction'>
                                {data.introduction}
                            </div>
                            <div className='Mypage_followBox'>
                                <div id='Mypage_followWord1' className='Mypage_followWord'>팔로잉</div>
                                <div id='Mypage_followWord2' className='Mypage_followWord'>팔로워</div>
                            </div>
                        </section>
                    </div>
                </div>
            )
        }
        return result3
    }


    BtnClick = async () => {
        
        var path = window.location.pathname;
        
        axios.post('/api/callbloginfo?type=list', {
            nickName : decodeURI(path.substr(8))
        })
        .then( response => {
            try {

                var data = response.data.json[0]
                
                var profilePhoto = data.profilephoto.replace('/profilePhoto/','')
                var blogPhoto = data.blogphoto.replace('/blogPhoto/','')
                
                $('#manualfile2').val(profilePhoto)
                $('#d1eletd').val('x')
                $('#manualfile3').val(blogPhoto)
                $('#d2elett').val('x')
                $('#textArea2').val(data.introduction)
            } catch (error) {
                alert('작업중 오류가 발생하였습니다.'+error)
            }
        })
        .catch( error => {alert('작업중 오류가 발생하였습니다.'+error);return false;} );
        
        $('#Mypage_infofix').toggle('active');
    }

    submitClick2 = async (type, e) => {

        var jsonstr = $("form[name='frm2']").serialize();
        jsonstr = decodeURIComponent(jsonstr);
        var Json_form = JSON.stringify(jsonstr).replace(/\"/gi,'')
        Json_form = "{\"" +Json_form.replace(/\&/g,'\",\"').replace(/=/gi,'\":"')+"\"}";

        try {
            const response = await fetch('/api/submitClick2?type='+type, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: Json_form
            });
            const body = await response.text();
            if(body == "succ"){
                if(type == 'update'){
                    this.sweetalertSucc('수정이 완료되었습니다.', false)
                }
                setTimeout(function() {
                    window.location.reload()
                    }.bind(this),1000
                );
                
            }else{
                console.log('작업중 오류가 발생하였습니다.4423d')
            }  
        } catch (error) {
            alert('작업중 오류가 발생하였습니다.5235'+error)
        }


    }

    handleFileInput2(type, e){
        if(type =='manual'){
            $('#manualfile2').val(e.target.files[0].name)
            $('#d1eletd').val('x')
        }
        this.setState({
          selectedFile2 : e.target.files[0],
        })
        setTimeout(function() {
            if(type =='manual'){
                this.handlePostMenual2()
            }
        }.bind(this),1
        );
    }

    // 이게 작동되면서 blogPhoto 폴더에 파일이 저장됨. 들어옴.
    handlePostMenual2(){
        const formData = new FormData();
        formData.append('file', this.state.selectedFile2);
        console.log(formData)
        return axios.post("/api/upload?type=uploads/blogPhoto/", formData)
        .then(res => {
            this.setState({menualName2 : res.data.filename})
            $('#is_MenualName2').remove()
            $('#upload_menual2').prepend('<input id="is_MenualName2" type="hidden"'
            +'name="is_MenualName2" value="/blogPhoto/'+this.state.menualName2+'"}/>')
        }).catch(error => {
            alert('작업중 오류가 발생하였습니다.4', error, 'error', '닫기')
        })
    }
    
    filedelete2 = () => {
        $('#manualfile2').val('')
        $('#is_MenualName2').remove()
        $('#d1eletd').val('')
    }
    
    handleFileInput3(type, e){
        if(type =='manual'){
            $('#manualfile3').val(e.target.files[0].name)
            $('#d2elett').val('x')
        }
        this.setState({
          selectedFile3 : e.target.files[0],
        })
        setTimeout(function() {
            if(type =='manual'){
                this.handlePostMenual3()
            }
        }.bind(this),1
        );
    }

    // 이게 작동되면서 profilePhoto 폴더에 파일이 저장됨. 들어옴.
    handlePostMenual3(){
        const formData = new FormData();
        formData.append('file', this.state.selectedFile3);
        console.log(formData)
        return axios.post("/api/upload?type=uploads/profilePhoto/", formData).then(res => {
            this.setState({menualName3 : res.data.filename})
            $('#is_MenualName3').remove()
            $('#upload_menual3').prepend('<input id="is_MenualName3" type="hidden"'
            +'name="is_MenualName3" value="/profilePhoto/'+this.state.menualName3+'"}/>')
        }).catch(error => {
            alert('작업중 오류가 발생하였습니다.5', error, 'error', '닫기')
        })
    }

    filedelete3 = () => {
        $('#manualfile3').val('')
        $('#is_MenualName3').remove()
        $('#d2elett').val('')
    }

    callPostApi = async () => {
        var path = window.location.pathname;
        $('#preItems').val(Number(0))
    
        
        this.setState({ division: 'main'})
        
        axios.post('/api/callPost?type=list', {
            nickName : decodeURI(path.substr(8)),
            preItems : this.state.preItems,
            items : this.state.items
        })
        .then( response => {
            try {

                var arr4 = this.state.savePostNum
                var arr5 = []
                for(let i=0; i<response.data.json.length; i++){
                    arr5.push(response.data.json[i].postnum)
                }
                var arr6 = [...arr4, ...arr5]

                var arr1 = this.state.savePost
                var arr2 = response.data.json
                var arr3 = [...arr1, ...arr2]

                this.setState({ savePost: arr3 });
                this.setState({ append_Post: this.PostAppend() });

                // 최초로 표시되는 PostNum 값 세 개를 추출.
                this.setState({ savePostNum: arr6 });
                this.getCommentList();
                
            } catch (error) {
                console.log(error)
                console.log('error (MyPage3d)');
            }
        })
        .catch( error => {alert('error (MyPage42d2)');return false;} );

    }
    
    callPostApi2 = async () => {
        var path = window.location.pathname;
        this.setState({ GoOrStop : 'stop' })
        this.setState({ division: 'main'})
        
        axios.post('/api/callPost?type=list', {
            nickName : decodeURI(path.substr(8)),
            preItems : $('#preItems').val(),
            items : this.state.items
        })
        .then( response => {
            try {
                
                var arr4 = this.state.savePostNum
                var arr5 = []
                for(let i=0; i<3; i++){
                    arr5.push(response.data.json[i].postnum)
                }
                

                var arr1 = this.state.savePost
                var arr2 = response.data.json
                var arr3 = [...arr1, ...arr2]

                this.setState({ savePost: arr3 });
                this.setState({ append_Post: this.PostAppend() });

                this.setState({ savePostNum: arr5 });
                this.getCommentList();
            } catch (error) {
                console.log(error)
                console.log('error (MyPage3d)');
            }
        })
        .catch( error => {alert('error (MyPage42s2)');return false;} );

    }

    // [댓글] 댓글 통신해서 아래 postCommentList에 넘겨줌. 랜더링 하라고.
    getCommentList = () => {

        for(let i=0; i<this.state.savePostNum.length; i++){

            axios.post('/api/callcommentlist?type=list', {
                postNum : this.state.savePostNum[i]
            })
            .then( response => {
                try {

                    this.setState({ testtt1 : 0 })
                    this.setState({ commentList: response.data.json })
                    this.postCommentList( this.state.savePostNum[i] );

                } catch (error) {
                    console.log(error)
                    console.log('error (MyPage3d0)');
                }
            })
            .catch( error => {alert('error (MyPage2s22)');return false;} );

        }
    }
    
    // [댓글 - 1. 첫화면, 2. 태그클릭]
    // [대댓글 - ]
    // [더보기]
    postCommentList = (PostNumber) => {
        
        var commentArr = []
        
        for(let i=0; i<this.state.commentList.length; i++){
            var testing1 = this.state.commentList[i]

            this.setState({ testtt1 : testing1.commentcount })
            
            this.setState({ PostNumber: commentArr })
            
            //이렇게 두번째 인자로 `요거 쓰고 안에는 달러+중괄호로 변수 넘기면 됨.
            //처음 마이페이지로 들어가서 랜더링되는건 좋아요 순서대로 상위 3개가 나오도록함.
            document.getElementById(String('testing1')+PostNumber).insertAdjacentHTML('beforeend', 
                `
                    <div style='display: flex; margin: 20px 20px 0px 45px;' id='newComment'>
                    
                        <section style='margin-right: 10px;'>
                            <div style=' width:30px; height:30px;'>
                            <img style=' border-radius: 50%; border: 1px solid rgb(243, 243, 243); width:30px; height:30px;' src=${testing1.profilephoto} />
                            </div>
                        </section>
                
                        <section style='display: flex;'>
                            <div style='display: flex; margin-right: 8px; font-weight: bold; >
                                <div style='font-weight: bold;'>
                                    ${testing1.nickname}
                                </div>
                                <div style='font-size: 11px; color: gray;'>
                                    ${testing1.regtime}
                                </div>
                            </div>
                        </section>
                            
                        <section style='margin: 0px 45px;'>
                            <div style='margin-left: 41px;'>
                                ${testing1.text}
                            </div>
                            <div style='display: flex; margin-left: 41px;'>
                                <div style='display: flex;'>
                                    <div style='display: flex; margin-right: 5px; align-items: center;'><img src=${like_full} width='12px' height='12px' /></div>
                                    ${testing1.likecount}
                            </div>
                            <div id=${'re_comment8'+testing1.commentnum} style='display: flex; margin-left:10px;'>
                            </div>
                        </section>

                        <section id=${'re_comment5'+testing1.commentnum} style='display:none; margin-top:10px;'>
                            <div style='display: flex; margin: 0px 20px 30px 20px; align-items: center; justify-content: space-between;'>
                                <div style='display: flex;'>
                                    <div style='margin-left:60px;'>
                                        <img src=${testing1.profilephoto} style='border-radius: 50%; border: 1px solid rgb(243, 243, 243); width:30px; height:30px;'/>
                                    </div>
                                    <div id=${'re_comment6'+testing1.commentnum} style='margin-left : 10px;'>
                                    </div>
                                </div>
                                <div>
                                        <label style='background-color: #f7f8f9; cursor: pointer; border: 1px solid rgb(236, 236, 236); border-radius: 20px 20px 20px 20px; text-align: center; font-size: var(--font-small); padding: 7px 17px 7px 17px;' id=${'re_comment7'+testing1.commentnum} className='Mypage_commentBtn'>
                                        등록</label>
                                </div>
                            </div>
                        </section>

                        <input id=${'re_comment12'+testing1.commentnum} type='hidden' name='commentnum2' value='${testing1.commentnum}' />
                    </div>
                `
                
                )

                var func4 = (e) => {
                    $('#re_comment5'+e.target.value).toggle('active')
                    $('#textarea4id'+e.target.value).remove()
                    var textarea3 = document.getElementById('re_comment6'+e.target.value);

                    var textarea4 = document.createElement('textarea');
                    textarea4.cols = '';
                    textarea4.rows = '1';
                    textarea4.name= 'textArea5'+e.target.value;
                    textarea4.maxlength = '500';
                    textarea4.id = 'textarea4id'+e.target.value;
                    textarea4.placeholder = '답글을 작성해보세요';
                    textarea4.className = 'textarea5';
                    textarea4.spellcheck = 'false';

                    
                    textarea3.append(textarea4);

                }

                var func5 = (e) => {
                    
                    axios.post('/api/re_commentPosting?type=post', {
                        userNum: document.getElementById('userNum').value,
                        commentNum: e.target.value,
                        text: document.getElementById('textarea4id'+e.target.value).value
                    })
                    .then( response => {
                        try {
                            $('#textarea4'+e.target.value).val('')
                            
                        } catch (error) {
                            console.log(error)
                            console.log('error (MyPage3dswd)');
                        }
                    })
                    .catch( error => {alert('error (MyPage4as2s2)'+error);return false;} );
                }

                //'답글 n개' 버튼 누르면 대댓글(답글) 받아와서 뿌려줌.
                var func10 = (e) => {

                    console.log('this is ddd')
                    console.log($('#re_commentCheck'+e.target.value).val())

                    //처음엔 대댓글이 아예 없으니 undefined로 나옴.
                    if( $('#re_commentCheck'+e.target.value).val() == undefined ) {

                        $('#re_commentCheck'+e.target.value).val('0')
                        console.log($("div[id^='re_comment123"+e.target.value+"']"))

                        axios.post('/api/callre_commentlist?type=list', {
                            commentNum: e.target.value,
                        })
                        .then( response => {
                            try {
                                postReCommentList1(response.data.json, 'a')
                                
                            } catch (error) {
                                console.log(error)
                                console.log('error (MyPage3dswd)');
                            }
                        })
                        .catch( error => {alert('error (MyPage4as2s2)'+error);return false;} );

                    } else if ( $('#re_commentCheck'+e.target.value).val() == 'a' ) {

                        $("div[id^='re_comment123"+e.target.value+"']").remove()

                        axios.post('/api/callre_commentlist?type=list', {
                            commentNum: e.target.value,
                        })
                        .then( response => {
                            try {
                                postReCommentList1(response.data.json, 'b')
                                $("div[id^='re_comment123"+e.target.value+"']").remove()
                                
                            } catch (error) {
                                console.log(error)
                                console.log('error (MyPage3dswd)');
                            }
                        })
                        .catch( error => {alert('error (MyPage4as2s2)'+error);return false;} );

                        

                    } else if ( $('#re_commentCheck'+e.target.value).val() == 'b' ) {
                        
                        $('#re_commentCheck'+e.target.value).val('0')
                        console.log($("div[id^='re_comment123"+e.target.value+"']"))

                        axios.post('/api/callre_commentlist?type=list', {
                            commentNum: e.target.value,
                        })
                        .then( response => {
                            try {
                                postReCommentList1(response.data.json, 'a')
                                
                            } catch (error) {
                                console.log(error)
                                console.log('error (MyPage3dswd)');
                            }
                        })
                        .catch( error => {alert('error (MyPage4as2s2)'+error);return false;} );
                    }

                }

                // func10에서 re_comment리스트 받아와서 append함.
                var postReCommentList1 = (re_comment, checkValue) => {

                    console.log(re_comment)
                    
                    for(let i=0; i<re_comment.length; i++){
                        let re_comment1 = re_comment[i]
                        console.log(re_comment1)
                        document.getElementById('re_comment12'+re_comment1.commentnum).insertAdjacentHTML('afterend', 
                            `
                                <div style='display: flex; margin: 20px 20px 0px 80px;' id=${'re_comment123'+re_comment1.commentnum}>
                                
                                    <section style='margin-right: 10px;'>
                                        <div style=' width:30px; height:30px;'>
                                        <img style=' border-radius: 50%; border: 1px solid rgb(243, 243, 243); width:30px; height:30px;' src=${re_comment1.profilephoto} />
                                        </div>
                                    </section>
                            
                                    <section style='display: flex;'>
                                        <div style='display: flex; margin-right: 8px; font-weight: bold; >
                                            <div style='font-weight: bold;'>
                                                ${re_comment1.nickname}
                                            </div>
                                            <div style='font-size: 11px; color: gray;'>
                                                ${re_comment1.regtime}
                                            </div>
                                        </div>
                                    </section>
                                        
                                    <section style='margin: 0px 45px;' id=${'re_comment123'+re_comment1.commentnum}>
                                        <div style='margin-left: 76px;' id=${'re_comment123'+re_comment1.commentnum}>
                                            ${re_comment1.text}
                                        </div>
                                        <div style='display: flex; margin-left: 76px;' id=${'re_comment123'+re_comment1.commentnum}>
                                        <div style='display: flex;'>
                                            <div style='display: flex; margin-right: 5px; align-items: center;'><img src=${like_full} width='12px' height='12px' /></div>
                                            ${re_comment1.likecount}
                                        </div>
                                    </section>

                                    <input id='commentnum2' type='hidden' name='commentnum2' value='${re_comment1.re_commentnum}' />
                                    <input id=${'re_commentCheck'+re_comment1.commentnum} type='hidden' name='re_commentCheck' value=${checkValue} />
                                </div>
                            `
                            
                        )
                    }
                }
                
                
                // 답글n개 보기 버튼 추가
                var re_commentAppend = document.getElementById('re_comment8'+testing1.commentnum);

                var re_commentAppend2 = document.createElement('div');
                re_commentAppend2.className = 'Mypage_re_commentAppend';
                re_commentAppend2.textContent = '답글 '+testing1.re_commentcount+'개'
                re_commentAppend2.onclick = (e) => func10(e);
                re_commentAppend2.value = testing1.commentnum;
            
                re_commentAppend.appendChild(re_commentAppend2);


                //'답글' 표시 따로 추가
                var testing23 = document.getElementById('re_comment8'+testing1.commentnum);

                var div2 = document.createElement('div');
                div2.className = 'Mypage_commentBtn6 '+testing1.commentnum;
                div2.textContent = '답글';
                div2.value = testing1.commentnum;
                div2.onclick = (e) => func4(e);

                testing23.append(div2);
                

                //'답글' 눌렀을 때 등록 버튼 추가
                var re_commentBtn3 = document.getElementById('re_comment7'+testing1.commentnum);

                var re_commentBtn4 = document.createElement('input');
                re_commentBtn4.type = 'button';
                re_commentBtn4.className = 'Mypage_re_commentBtn6';
                re_commentBtn4.value = testing1.commentnum;
                re_commentBtn4.onclick = e => func5(e);

                re_commentBtn3.appendChild(re_commentBtn4);

        }

        if( this.state.testtt1 > 0 ){
            document.getElementById(String('testing2')+PostNumber).insertAdjacentHTML('beforeend', 
            `
            <div style='margin: 0 5px 0 5px; display: flex;'>
                ${testing1.commentcount}
            </div>
            `
        )} else {
            document.getElementById(String('testing2')+PostNumber).insertAdjacentHTML('beforeend', 
            `
                <div style='margin: 0 5px 0 5px; display: flex;'>
                    0
                </div>
            `
            )}






        // 더보기버튼 누르면 호출됨. (인자로 postnumber 들어옴)
        function func(e) {

            // postnumber와 선택된 option
            var postNum4 = e.target.value
            var selectOption = $("#testing4"+postNum4).val()
            
            axios.post('/api/callcommentlist?type=list3', {
                postNum: postNum4,
                //Mapper에서 order 값 받을 때 # 말고 $로 받게함. 가끔 #은 인식이 안됨. 왠지 모르겠음.
                order: selectOption
            })
            .then( response => {
                try {

                    var commentData = response.data.json

                    var postCommentList3 = (PostNumber) => {

                        $("div[id^='testing1"+PostNumber+"']").empty()
                        $("div[id^='testing2"+PostNumber+"']").empty()
                        $("#testing1"+postNum4).css({"overflow":"scroll", "margin-right":"30px", "height": "350px"})
                        
                        for(let i=0; i<commentData.length; i++){
                            var testing2 = commentData[i]
                            
                            //이렇게 두번째 인자로 `요거 쓰고 안에는 달러+중괄호로 변수 넘기면 됨.
                            //처음 마이페이지로 들어가서 랜더링되는건 좋아요 순서대로 상위 3개가 나오도록함.
                            document.getElementById(String('testing1')+PostNumber).insertAdjacentHTML('beforeend', 
                                `
                                    <div style='display: flex; margin: 20px 20px 0px 45px;' id='newComment'>
                                    
                                        <section style='margin-right: 10px;'>
                                            <div style=' width:30px; height:30px;'>
                                            <img style=' border-radius: 50%; border: 1px solid rgb(243, 243, 243); width:30px; height:30px;' src=${testing2.profilephoto} />
                                            </div>
                                        </section>
                                
                                        <section style='display: flex;'>
                                            <div style='display: flex; margin-right: 8px; font-weight: bold; >
                                                <div style='font-weight: bold;'>
                                                    ${testing2.nickname}
                                                </div>
                                                <div style='font-size: 11px; color: gray;'>
                                                    ${testing2.regtime}
                                                </div>
                                            </div>
                                        </section>
                                            
                                        <section style='margin: 0px 45px;'>
                                            <div style='margin-left: 41px;'>
                                                ${testing2.text}
                                            </div>
                                            <div style='display: flex; margin-left: 41px;'>
                                                <div style='display: flex;'>
                                                    <div style='display: flex; margin-right: 5px; align-items: center;'><img src=${like_full} width='12px' height='12px' /></div>
                                                    ${testing2.likecount}
                                            </div>
                                            <div id=${'re_comment13'+testing2.commentnum} style='display: flex; margin-left:10px;'>
                                            </div>
                                        </section>

                                        <section id=${'re_comment2'+testing2.commentnum} style='display:none; margin-top:10px;'>
                                            <div style='display: flex; margin: 0px 20px 30px 20px; align-items: center; justify-content: space-between;'>
                                                <div style='display: flex;'>
                                                    <div style='margin-left:60px;'>
                                                        <img src=${testing2.profilephoto} style='border-radius: 50%; border: 1px solid rgb(243, 243, 243); width:30px; height:30px;'/>
                                                    </div>
                                                    <div id=${'re_comment3'+testing2.commentnum} style='margin-left : 10px;'>
                                                    </div>
                                                </div>
                                                <div>
                                                        <label style='background-color: #f7f8f9; cursor: pointer; border: 1px solid rgb(236, 236, 236); border-radius: 20px 20px 20px 20px; text-align: center; font-size: var(--font-small); padding: 7px 17px 7px 17px;' id=${'re_comment4'+testing2.commentnum} className='Mypage_commentBtn'>
                                                        등록</label>
                                                </div>
                                            </div>
                                        </section>
                
                                        <input id=${'re_comment14'+testing2.commentnum} type='hidden' name='commentnum2' value='${testing2.commentnum}' />
                                    </div>
                                `
                                
                                )

                            // 대댓글 창 출력 함수
                            var func2 = (e) => {
                                $('#re_comment2'+e.target.value).toggle('active')
                                
                                var textarea2 = document.getElementById('re_comment3'+e.target.value);

                                var textarea1 = document.createElement('textarea');
                                textarea1.cols = '';
                                textarea1.rows = '1';
                                textarea1.name= 'textArea5'+e.target.value;
                                textarea1.maxlength = '500';
                                textarea1.id = 'textarea1id'+e.target.value;
                                textarea1.placeholder = '답글을 작성해보세요';
                                textarea1.className = 'textarea5';
                                textarea1.spellcheck = 'false';
    
                                $('#textarea1id'+e.target.value).remove()
                                textarea2.append(textarea1);

                            }

                            // 대댓글 입력 함수
                            var func3 = (e) => {
                                
                                axios.post('/api/re_commentPosting?type=post', {
                                    userNum: document.getElementById('userNum').value,
                                    commentNum: e.target.value,
                                    text: document.getElementById('textarea1id'+e.target.value).value
                                })
                                .then( response => {
                                    try {
                                        $('#textarea4'+e.target.value).val('')
                                        
                                    } catch (error) {
                                        console.log(error)
                                        console.log('error (MyPage3dswd)');
                                    }
                                })
                                .catch( error => {alert('error (MyPage4as2s2)'+error);return false;} );
                            }

                            //'답글 n개' 버튼 누르면 대댓글(답글) 받아와서 뿌려주는 함수.
                            var func11 = (e) => {

                                console.log('this is func11')
                                console.log($('#re_commentCheck'+e.target.value).val())

                                //처음엔 대댓글이 아예 없으니 undefined로 나옴.
                                if( $('#re_commentCheck2'+e.target.value).val() == undefined ) {

                                    $('#re_commentCheck2'+e.target.value).val('0')
                                    console.log($("div[id^='re_comment234"+e.target.value+"']"))

                                    axios.post('/api/callre_commentlist?type=list', {
                                        commentNum: e.target.value,
                                    })
                                    .then( response => {
                                        try {
                                            postReCommentList2(response.data.json, 'a')
                                            
                                        } catch (error) {
                                            console.log(error)
                                            console.log('error (MyPage3dswd)');
                                        }
                                    })
                                    .catch( error => {alert('error (MyPage4as2s2)'+error);return false;} );

                                } else if ( $('#re_commentCheck2'+e.target.value).val() == 'a' ) {

                                    $("div[id^='re_comment234"+e.target.value+"']").remove()

                                    axios.post('/api/callre_commentlist?type=list', {
                                        commentNum: e.target.value,
                                    })
                                    .then( response => {
                                        try {
                                            postReCommentList2(response.data.json, 'b')
                                            $("div[id^='re_comment234"+e.target.value+"']").remove()
                                            
                                        } catch (error) {
                                            console.log(error)
                                            console.log('error (MyPage3dswd)');
                                        }
                                    })
                                    .catch( error => {alert('error (MyPage4as2s2)'+error);return false;} );

                                    

                                } else if ( $('#re_commentCheck2'+e.target.value).val() == 'b' ) {
                                    
                                    $('#re_commentCheck2'+e.target.value).val('0')
                                    console.log($("div[id^='re_comment234"+e.target.value+"']"))

                                    axios.post('/api/callre_commentlist?type=list', {
                                        commentNum: e.target.value,
                                    })
                                    .then( response => {
                                        try {
                                            postReCommentList2(response.data.json, 'a')
                                            
                                        } catch (error) {
                                            console.log(error)
                                            console.log('error (MyPage3dswd)');
                                        }
                                    })
                                    .catch( error => {alert('error (MyPage4as2s2)'+error);return false;} );
                                }

                            }

                            // func10에서 re_comment리스트 받아와서 append함.
                            var postReCommentList2 = (re_comment, checkValue) => {

                                console.log(re_comment)
                                
                                for(let i=0; i<re_comment.length; i++){
                                    let re_comment2 = re_comment[i]
                                    console.log(re_comment2)
                                    document.getElementById('re_comment14'+re_comment2.commentnum).insertAdjacentHTML('afterend', 
                                        `
                                            <div style='display: flex; margin: 20px 20px 0px 80px;' id=${'re_comment234'+re_comment2.commentnum}>
                                            
                                                <section style='margin-right: 10px;'>
                                                    <div style=' width:30px; height:30px;'>
                                                    <img style=' border-radius: 50%; border: 1px solid rgb(243, 243, 243); width:30px; height:30px;' src=${re_comment2.profilephoto} />
                                                    </div>
                                                </section>
                                        
                                                <section style='display: flex;'>
                                                    <div style='display: flex; margin-right: 8px; font-weight: bold; >
                                                        <div style='font-weight: bold;'>
                                                            ${re_comment2.nickname}
                                                        </div>
                                                        <div style='font-size: 11px; color: gray;'>
                                                            ${re_comment2.regtime}
                                                        </div>
                                                    </div>
                                                </section>
                                                    
                                                <section style='margin: 0px 45px;' id=${'re_comment234'+re_comment2.commentnum}>
                                                    <div style='margin-left: 76px;' id=${'re_comment234'+re_comment2.commentnum}>
                                                        ${re_comment2.text}
                                                    </div>
                                                    <div style='display: flex; margin-left: 76px;' id=${'re_comment234'+re_comment2.commentnum}>
                                                    <div style='display: flex;'>
                                                        <div style='display: flex; margin-right: 5px; align-items: center;'><img src=${like_full} width='12px' height='12px' /></div>
                                                        ${re_comment2.likecount}
                                                    </div>
                                                </section>

                                                <input id='commentnum2' type='hidden' name='commentnum2' value='${re_comment2.re_commentnum}' />
                                                <input id=${'re_commentCheck2'+re_comment2.commentnum} type='hidden' name='re_commentCheck2' value=${checkValue} />
                                            </div>
                                        `
                                        
                                    )
                                }
                            }

                            // '답글n개 보기' 버튼 추가
                            var re_commentAppend3 = document.getElementById('re_comment13'+testing2.commentnum);

                            var re_commentAppend4 = document.createElement('div');
                            re_commentAppend4.className = 'Mypage_re_commentAppend';
                            re_commentAppend4.textContent = '답글 '+testing2.re_commentcount+'개'
                            re_commentAppend4.onclick = (e) => func11(e);
                            re_commentAppend4.value = testing2.commentnum;

                            re_commentAppend3.appendChild(re_commentAppend4);                        


                            //'답글' 표시 추가
                            var testing22 = document.getElementById('re_comment13'+testing2.commentnum);
            
                            var div = document.createElement('div');
                            div.className = 'Mypage_commentBtn6 '+testing2.commentnum;
                            div.textContent = '답글';
                            div.value = testing2.commentnum;
                            div.onclick = (e) => func2(e);

                            testing22.append(div);


                            //'답글' 눌렀을 때 등록 버튼 추가
                            var re_commentBtn1 = document.getElementById('re_comment4'+testing2.commentnum);

                            var re_commentBtn2 = document.createElement('input');
                            re_commentBtn2.type = 'button';
                            re_commentBtn2.className = 'Mypage_re_commentBtn6';
                            re_commentBtn2.value = testing2.commentnum;
                            re_commentBtn2.onclick = e => func3(e);

                            re_commentBtn1.appendChild(re_commentBtn2);

                        }
                
                        // 댓글수 표시함.
                        if( testing2.commentcount > 0 ){
                            document.getElementById(String('testing2')+PostNumber).insertAdjacentHTML('beforeend', 
                            `
                            <div style='margin: 0 5px 0 5px; display: flex;'>
                                ${testing2.commentcount}
                            </div>
                            `
                        )} else {
                            document.getElementById(String('testing2')+PostNumber).insertAdjacentHTML('beforeend', 
                            `
                                <div style='margin: 0 5px 0 5px; display: flex;'>
                                    0
                                </div>
                            `
                            )}
                        
                        
                
                    }

                    postCommentList3(postNum4);
                    
                    
                } catch (error) {
                    console.log(error)
                    console.log('error (MyPage3dsd0)');
                }
            })
            .catch( error => {alert('error (MyPage2s22)');return false;} );



        }

        if(testing1.commentcount > 3) {

            const testing = document.getElementById('testing3' + PostNumber);
            
            const label = document.createElement('label');
            label.className = 'Mypage_commentBtn5 '+PostNumber;
            label.textContent = '더보기';
            label.id = 'Mypage_commentBtn5 '+PostNumber;

            const input = document.createElement('input');
            input.id = 'asdfad';
            input.type = 'button'
            input.className = 'Mypage_commentBtn4';
            input.value = PostNumber;
            input.onclick = e => func(e);

            label.appendChild(input);

            testing.appendChild(label);
        

        }

    }

    // [카드 - 첫화면]
    PostAppend = () => {
        let result2 = []
        
        if (this.state.savePost.length !== 0) {

            for(let i=0; i<this.state.savePost.length; i++){
                var data = this.state.savePost[i]

                result2.push(
                    
                    <div className='Posting_Card_Wrap'>

                        <section className='Posting_Card_Header'>
                            <Link to={'/mypage/'+data.nickname} onClick={() => {window.location.href='/mypage/'+data.nickname}}>
                                <div className='Posting_Card_Header2'>
                                    <div className='Posting_Card_Header_profilePhoto'>
                                        <input id='postNum' type='hidden' name='postNum' value={data.postnum}/>
                                        <img src={data.profilephoto} />
                                    </div>
                                    <div className='Posting_Card_Header_nickname'>
                                        {data.nickname}
                                    </div>
                                </div>
                            </Link> 
                            <div>
                                {data.regtime}
                            </div>
                        </section>

                        <section className='Posting_Card_Contents'>
                            <div className='Posting_Card_Text'>
                                {data.text}
                            </div>
                            <div className='Posting_Card_Image'>
                                <img src={data.image} />
                            </div>
                        </section>

                        <section className='Posting_Card_Downside'>
                            <ul className='Posting_Card_Downside2'>
                                <li><div className='Posting_Card_Downside2_like'><img src={like_full} width='12px' height='12px' /></div>{data.likes}</li>
                                <li>댓글</li>
                                <li># {data.tagname}</li>
                                <li>위치정보</li>
                            </ul>
                            <ul className='Posting_Card_Downside3'>
                                <div>댓글수</div>
                                <div classNmae='Posting_Card_Comment3' id={String('testing2')+data.postnum}></div>
                            </ul>
                            <ul className='Posting_Card_Downside4'>
                                <img src={menu} width='15px' height='15px' />
                                <select onChange={this.orderChange} id={String('testing4')+data.postnum} name='by_tag1' className='Posting_Card_Select'>
                                    <option value="likes DESC">인기순</option>
                                    <option value="regtime DESC">최신순</option>
                                    <option value="regtime ASC">오래된순</option>
                                </select>
                            </ul>
                        </section>

                        <section className='Posting_Card_comment'>
                            <div className='Posting_Card_comment2'>
                                <div className='Posting_Card_commentPrifile'>
                                    <img src={data.profilephoto} />
                                </div>
                                <div className='Posting_Card_commenttext1'>
                                    <TextareaAutosize className='Posting_Card_commenttext2' cols='' rows='1' name="textArea3" maxlength='500' id={data.postnum} placeholder="댓글을 작성해보세요" maxRows='1' spellcheck="false"/>
                                </div>
                            </div>
                            <div>
                                    <label  className='Mypage_commentBtn'><input type="button" id="asdfa" className='Mypage_commentBtn2' value={data.postnum} placeholder="입력" onClick={e => this.commentPosting(e)} />등록</label>
                            </div>
                        </section>

                        <div id={String('testing1')+data.postnum} className='Posting_Card_commnetBox' ></div>
                        <div id={String('testing3')+data.postnum} ></div>
                    </div>
                )
            }
            this.setState({ GoOrStop : 'go' })

        } else {
            result2.push(
                <div className='Posting_Card_Empty'>
                    아직 작성된 포스트가 없습니다. 
                </div>
            )
        }
        return result2
        
    }

    // [댓글 - 순서 바꿀때]
    orderChange = (e) => {
        var postnumber = e.target.id

        //포스트넘버와 선택된 option값
        var postnum = postnumber.slice(8)
        var order = e.target.value

        console.log(postnum)

        // 댓글수랑 댓글만 리셋. testing3는 더보기, testing4는 옵션들.
        $("div[id^='testing1"+postnum+"']").empty()
        $("div[id^='testing2"+postnum+"']").empty()

        axios.post('/api/callcommentlist?type=list2', {
            postNum: postnum,
            //Mapper에서 order 값 받을 때 # 말고 $로 받게함. 가끔 #은 인식이 안됨. 왠지 모르겠음.
            order: order
        })
        .then( response => {
            try {

                this.setState({ testtt1 : 0 })
                this.setState({ commentList: response.data.json })
                this.postCommentList2( response.data.json[0].postnum );

            } catch (error) {
                console.log(error)
                console.log('error (MyPage3d0)');
            }
        })
        .catch( error => {alert('error (MyPage2s22)');return false;} );

    }

    // [댓글 - 3. 순서 바꿀때]
    postCommentList2 = (PostNumber) => {
        
        var commentArr = []
        
        for(let i=0; i<this.state.commentList.length; i++){
            var testing1 = this.state.commentList[i]

            this.setState({ testtt1 : testing1.commentcount })
            
            this.setState({ PostNumber: commentArr })
            
            //이렇게 두번째 인자로 `요거 쓰고 안에는 달러+중괄호로 변수 넘기면 됨.
            //처음 마이페이지로 들어가서 랜더링되는건 좋아요 순서대로 상위 3개가 나오도록함.
            document.getElementById(String('testing1')+PostNumber).insertAdjacentHTML('beforeend', 
                `
                    <div style='display: flex; margin: 20px 20px 0px 45px;' id='newComment'>
                    
                        <section style='margin-right: 10px;'>
                            <div style=' width:30px; height:30px;'>
                            <img style=' border-radius: 50%; border: 1px solid rgb(243, 243, 243); width:30px; height:30px;' src=${testing1.profilephoto} />
                            </div>
                        </section>

                        <section style='display: flex;'>
                            <div style='display: flex; margin-right: 8px; font-weight: bold; >
                                <div style='font-weight: bold;'>
                                    ${testing1.nickname}
                                </div>
                                <div style='font-size: 11px; color: gray;'>
                                    ${testing1.regtime}
                                </div>
                            </div>
                        </section>
                
                        <section style='margin: 0px 45px;'>
                            <div style='margin-left: 41px;'>
                                ${testing1.text}
                            </div>
                            <div style='display: flex; margin-left: 41px;'>
                                <div style='display: flex;'>
                                    <div style='display: flex; margin-right: 5px; align-items: center;'><img src=${like_full} width='12px' height='12px' /></div>
                                    ${testing1.likecount}
                                </div>
                                <div id=${'re_comment15'+testing1.commentnum} style='display: flex; margin-left:10px;'>
                            </div>
                        </section>

                        <section id=${'re_comment10'+testing1.commentnum} style='display:none; margin-top:10px;'>
                            <div style='display: flex; margin: 0px 20px 30px 20px; align-items: center; justify-content: space-between;'>
                                <div style='display: flex;'>
                                    <div style='margin-left:60px;'>
                                        <img src=${testing1.profilephoto} style='border-radius: 50%; border: 1px solid rgb(243, 243, 243); width:30px; height:30px;'/>
                                    </div>
                                    <div id=${'re_comment9'+testing1.commentnum} style='margin-left : 10px;'>
                                    </div>
                                </div>
                                <div>
                                        <label style='background-color: #f7f8f9; cursor: pointer; border: 1px solid rgb(236, 236, 236); border-radius: 20px 20px 20px 20px; text-align: center; font-size: var(--font-small); padding: 7px 17px 7px 17px;' id=${'re_comment11'+testing1.commentnum} className='Mypage_commentBtn'>
                                        등록</label>
                                </div>
                            </div>
                        </section>

                        <input id=${'re_comment14'+testing1.commentnum} type='hidden' name='commentnum2' value='${testing1.commentnum}' />
                    </div>
                `
                
                )

                // 대댓글 창 출력 함수
                var func2 = (e) => {
                    $('#re_comment10'+e.target.value).toggle('active')
                    
                    var textarea5 = document.getElementById('re_comment9'+e.target.value);

                    var textarea6 = document.createElement('textarea');
                    textarea6.cols = '';
                    textarea6.rows = '1';
                    textarea6.name= 'textArea5'+e.target.value;
                    textarea6.maxlength = '500';
                    textarea6.id = 'textarea1id'+e.target.value;
                    textarea6.placeholder = '답글을 작성해보세요';
                    textarea6.className = 'textarea4';
                    textarea6.spellcheck = 'false';

                    $('#textarea1id'+e.target.value).remove()
                    textarea5.append(textarea6);

                }

                // 대댓글 입력 함수
                var func3 = (e) => {
                    
                    axios.post('/api/re_commentPosting?type=post', {
                        userNum: document.getElementById('userNum').value,
                        commentNum: e.target.value,
                        text: document.getElementById('textarea1id'+e.target.value).value
                    })
                    .then( response => {
                        try {
                            $('#textarea4'+e.target.value).val('')
                            
                        } catch (error) {
                            console.log(error)
                            console.log('error (MyPage3dswd)');
                        }
                    })
                    .catch( error => {alert('error (MyPage4as2s2)'+error);return false;} );
                }

                //'답글 n개' 버튼 누르면 대댓글(답글) 받아와서 뿌려주는 함수.
                var func12 = (e) => {

                    console.log('this is func11')
                    console.log($('#re_commentCheck'+e.target.value).val())

                    //처음엔 대댓글이 아예 없으니 undefined로 나옴.
                    if( $('#re_commentCheck3'+e.target.value).val() == undefined ) {

                        $('#re_commentCheck3'+e.target.value).val('0')
                        console.log($("div[id^='re_comment345"+e.target.value+"']"))

                        axios.post('/api/callre_commentlist?type=list', {
                            commentNum: e.target.value,
                        })
                        .then( response => {
                            try {
                                postReCommentList3(response.data.json, 'a')
                                
                            } catch (error) {
                                console.log(error)
                                console.log('error (MyPage3dswd)');
                            }
                        })
                        .catch( error => {alert('error (MyPage4as2s2)'+error);return false;} );

                    } else if ( $('#re_commentCheck3'+e.target.value).val() == 'a' ) {

                        $("div[id^='re_comment345"+e.target.value+"']").remove()

                        axios.post('/api/callre_commentlist?type=list', {
                            commentNum: e.target.value,
                        })
                        .then( response => {
                            try {
                                postReCommentList3(response.data.json, 'b')
                                $("div[id^='re_comment345"+e.target.value+"']").remove()
                                
                            } catch (error) {
                                console.log(error)
                                console.log('error (MyPage3dswd)');
                            }
                        })
                        .catch( error => {alert('error (MyPage4as2s2)'+error);return false;} );

                        

                    } else if ( $('#re_commentCheck3'+e.target.value).val() == 'b' ) {
                        
                        $('#re_commentCheck3'+e.target.value).val('0')
                        console.log($("div[id^='re_comment345"+e.target.value+"']"))

                        axios.post('/api/callre_commentlist?type=list', {
                            commentNum: e.target.value,
                        })
                        .then( response => {
                            try {
                                postReCommentList3(response.data.json, 'a')
                                
                            } catch (error) {
                                console.log(error)
                                console.log('error (MyPage3dswd)');
                            }
                        })
                        .catch( error => {alert('error (MyPage4as2s2)'+error);return false;} );
                    }

                }

                // func10에서 re_comment리스트 받아와서 append함.
                var postReCommentList3 = (re_comment, checkValue) => {

                    console.log(re_comment)
                    
                    for(let i=0; i<re_comment.length; i++){
                        let re_comment3 = re_comment[i]
                        console.log(re_comment3)
                        document.getElementById('re_comment14'+re_comment3.commentnum).insertAdjacentHTML('afterend', 
                            `
                                <div style='display: flex; margin: 20px 20px 0px 80px;' id=${'re_comment345'+re_comment3.commentnum}>
                                
                                    <section style='margin-right: 10px;'>
                                        <div style=' width:30px; height:30px;'>
                                        <img style=' border-radius: 50%; border: 1px solid rgb(243, 243, 243); width:30px; height:30px;' src=${re_comment3.profilephoto} />
                                        </div>
                                    </section>
                            
                                    <section style='display: flex;'>
                                        <div style='display: flex; margin-right: 8px; font-weight: bold; >
                                            <div style='font-weight: bold;'>
                                                ${re_comment3.nickname}
                                            </div>
                                            <div style='font-size: 11px; color: gray;'>
                                                ${re_comment3.regtime}
                                            </div>
                                        </div>
                                    </section>
                                        
                                    <section style='margin: 0px 45px;' id=${'re_comment345'+re_comment3.commentnum}>
                                        <div style='margin-left: 76px;' id=${'re_comment345'+re_comment3.commentnum}>
                                            ${re_comment3.text}
                                        </div>
                                        <div style='display: flex; margin-left: 76px;' id=${'re_comment345'+re_comment3.commentnum}>
                                        <div style='display: flex;'>
                                            <div style='display: flex; margin-right: 5px; align-items: center;'><img src=${like_full} width='12px' height='12px' /></div>
                                            ${re_comment3.likecount}
                                        </div>
                                    </section>

                                    <input id='commentnum2' type='hidden' name='commentnum2' value='${re_comment3.re_commentnum}' />
                                    <input id=${'re_commentCheck3'+re_comment3.commentnum} type='hidden' name='re_commentCheck3' value=${checkValue} />
                                </div>
                            `
                            
                        )
                    }
                }

                // '답글n개 보기' 버튼 추가
                var re_commentAppend5 = document.getElementById('re_comment15'+testing1.commentnum);

                var re_commentAppend6 = document.createElement('div');
                re_commentAppend6.className = 'Mypage_re_commentAppend';
                re_commentAppend6.textContent = '답글 '+testing1.re_commentcount+'개'
                re_commentAppend6.onclick = (e) => func12(e);
                re_commentAppend6.value = testing1.commentnum;

                re_commentAppend5.appendChild(re_commentAppend6);                        

                //'답글' 표시 따로 추가
                var testing24 = document.getElementById('re_comment15'+testing1.commentnum);

                var div = document.createElement('div');
                div.className = 'Mypage_commentBtn6 '+testing1.commentnum;
                div.textContent = '답글';
                div.value = testing1.commentnum;
                div.onclick = (e) => func2(e);

                testing24.append(div);
                

                //'답글' 눌렀을 때 등록 버튼 추가
                var re_commentBtn5 = document.getElementById('re_comment11'+testing1.commentnum);

                var re_commentBtn6 = document.createElement('input');
                re_commentBtn6.type = 'button';
                re_commentBtn6.className = 'Mypage_re_commentBtn6';
                re_commentBtn6.value = testing1.commentnum;
                re_commentBtn6.onclick = e => func3(e);

                re_commentBtn5.appendChild(re_commentBtn6);
                
        }

        // 댓글 수 표시함.
        if( this.state.testtt1 > 0 ){
            document.getElementById(String('testing2')+PostNumber).insertAdjacentHTML('beforeend', 
            `
            <div style='margin: 0 5px 0 5px; display: flex;'>
                ${testing1.commentcount}
            </div>
            `
        )} else {
            document.getElementById(String('testing2')+PostNumber).insertAdjacentHTML('beforeend', 
            `
                <div style='margin: 0 5px 0 5px; display: flex;'>
                    0
                </div>
            `
            )}

    }

    // [댓글 - 등록시]
    commentPosting = (e) => {

        axios.post('/api/commentPosting?type=post', {
            userNum: this.state.usernum,
            commentPostNum: e.target.value,
            text: document.getElementById(e.target.value).value
        })
        .then( response => {
            console.log(response)
            this.sweetalertSucc('댓글이 등록되었습니다.', false)
            $('#textArea3').val('')
        })
        .catch( error => {alert('error (MyPage2452)'+error);return false;} );

    }

    ///무한스크롤
    _infiniteScroll = () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;

        if(scrollTop + clientHeight + 1 >= scrollHeight) {

            if(this.state.GoOrStop == 'stop'){
                
            } else {
                $('#preItems').val( Number($('#preItems').val())+Number(3) )
                if ( this.state.division == 'main') {
                    this.callPostApi2();
                } else {
                    this.tagClick();
                }

            }
        }
    }

    submitClick = async (type, e) => {

        this.textArea_checker = $('#textArea').val();
        this.file_checker = $('#manualfile').val();
        var usernumb = this.state.usernum

        if( this.file_checker !== '') {

            var jsonstr = $("form[name='frm']").serialize();
            jsonstr = decodeURIComponent(jsonstr);
            var Json_form = JSON.stringify(jsonstr).replace(/\"/gi,'')
            Json_form = "{\"" +Json_form.replace(/\&/g,'\",\"').replace(/=/gi,'\":"')+"\"}";

            try {
                const response = await fetch('/api/submitClick?type='+type, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: Json_form
                });
                const body = await response.text();
                if(body == "succ"){
                    if(type == 'save'){
                        this.sweetalertSucc('게시글이 등록되었습니다.', false)
                    }else if(type == "modify"){
                        this.sweetalertSucc('게시글 수정이 완료되었습니다.', false)
                    }
                    setTimeout(function() {
                        window.location.reload()
                        }.bind(this),1000
                    );
                    
                }else{
                    console.log('작업중 오류가 발생하였습니다.44d')
                }  
            } catch (error) {
                alert('작업중 오류가 발생하였습니다.55')
            }
            
        } else if ( this.textArea_checker !== '' ) {

            axios.post('/api/textonlyposting?type=post', {
                userNum: this.state.usernum,
                textArea: $('#textArea').val(),
                is_MenualName: '',
                tag_name: $('#tag_name').val()
            })
            .then( response => {
                try {
                    console.log(response)
                    this.sweetalertSucc('게시글이 등록되었습니다.', false);
                    setTimeout(function() {
                        window.location.reload()
                        }.bind(this),1000
                    );
                } catch (error) {
                    console.log('에러1'+error);
                }
            })
            .catch( error => console.log('에러2'+error) );

        } else {
            alert('내용을 넣어주세요')
        }
    };

    //ok
    sweetalertSucc = (title, showConfirmButton) => {
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: title,
            showConfirmButton: showConfirmButton,
            timer: 1000
        })
    }

    // 파일선택을 하면 이게 작동함. 파일 명을 파일선택버튼 옆에 랜더링하고 handlePostMenual 함수를 실행.
    handleFileInput(type, e){
        if(type =='manual'){
            $('#manualfile').val(e.target.files[0].name)
            $('#delet').val('x')
        }
        this.setState({
          selectedFile : e.target.files[0],
        })
        setTimeout(function() {
            if(type =='manual'){
                this.handlePostMenual()
            }
        }.bind(this),1
        );
    }

    // 이게 작동되면서 swmanual 폴더에 파일이 저장됨. 들어옴.
    handlePostMenual(){
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);

        return axios.post("/api/upload?type=uploads/swmanual/",
        formData
        ).then(res => {
            this.setState({menualName : res.data.filename})
            $('#is_MenualName').remove()
            $('#upload_menual').prepend('<input id="is_MenualName" type="hidden"'
            +'name="is_MenualName" value="/swmanual/'+this.state.menualName+'"}/>')
        })
        .catch(error => {
            alert('작업중 오류가 발생하였습니다.3', error, 'error', '닫기')
        })

    }

    filedelete = () => {
        $('#manualfile').val('')
        $('#is_MenualName').remove()
        $('#delet').val('')
    }

    render () {
        return (
            <>
                <LeftSide/>
                <div className='Mypage'>

                    <section className='Mypage_Introduce'>
                        {this.state.append_Introduce}
                    </section>

                    <form name="frm" id="frm" action="" onsubmit="" method="post" >
                        <input id='userNum' type='hidden' name='userNum' value={this.state.usernum}/>
                        <input id='targetValue' type='hidden' name='targetValue' />
                        <input id='preItems' type='hidden' name='preItems' />
                        <section className='Mypage_Main'>
                            <div className='Mypage_WriteAndContents'>
                                <div id='mypagewrite' className='Mypage_Write'>
                                    <div className='Mypage_ProfilephotoAndCommentform'>   
                                        <TextareaAutosize className='MyPage_CommentsInput'  name="textArea" maxlength='500' id='textArea' placeholder="코멘트를 작성해보세요" spellcheck="false"/>
                                    </div>
                                    <div className='Mypage_CommentsForms'>
                                        <div id="mypageTag" className='Mypage_Tag'>
                                                <div className='Mypage_PicOrVideo_Button'>
                                                    <label for="uploadBtn1" className="btn_file">사진 / 동영상</label>
                                                    <input type="text" id="manualfile" className="fileName fileName1" readonly="readonly" placeholder="선택된 파일 없음"/>
                                                    <input type="file" id="uploadBtn1" className="uploadBtn uploadBtn1" accept='video/*, image/*' onChange={e => this.handleFileInput('manual',e)}/>
                                                    <input type="button" id="delet" className='Myapge_deleteBtn' onClick={this.filedelete} />
                                                    
                                                    <div id="upload_menual"></div>
                                                </div>
                                                <div className='Mypage_Tag2'>
                                                    <label className='Mypage_label' for='tag_name' >#</label> 
                                                    <input className='Mypage_Tag2_input' maxlength='13' type="text" id='tag_name' name="tag_name" placeholder="|" onKeyPress={this.pwdKeyPress} />
                                                </div>
                                        </div>

                                        <button className='Mypage_Posting_Button' id='submitButton' type="button" onClick={(e) => this.submitClick('save', e)}>포스팅</button>

                                    </div>                            
                                </div>
                                <div className='Mypage_Contents'>
                                    {this.state.append_Post}
                                </div>
                            </div>
                            <div className='Mypage_Information'>
                                <div className='Mypage_Toprate'>
                                    <div className='Mypage_Toprate_Title'>태그 TOP 5</div>
                                    
                                    {this.state.append_TopTag}
                                </div>
                                <div className='Mypage_VisitorsNum'>
                                    방문자수
                                </div>
                            </div>
                        </section>
                    </form>

                </div>
                <RightSide/>
            </>
        );
    }

}

export default MyPage;

/*

1. 처음 화면이 랜더링 되거나(태그 누르거나), 인기순-최신순-오래된순 버튼 바꾸거나, 더보기 누르거나.
   이렇게 세가지 상황으로 댓글 다루는게 다름.


*/