import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'
import cookie from 'react-cookies';
import $ from 'jquery';

import LeftSide from './LeftSide'
import RightSide from './RightSide'

import like_full from './img/like_full.svg'
import rightArrow1 from './img/rightArrow1.svg'
import settings3 from './img/settings3.svg'
import cancel from './img/settings3.svg'

import TextareaAutosize from 'react-autosize-textarea';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            responsePost: '',
            append_Post: '',
            saveTagList: '',
            append_SaveTagList: '',
            saveConnectionList: '',
            testing1: '',
            usernickname: '',
            tagGroupBox: ''
        }
    }

    componentDidMount() {
        this.decoded();
    }
    
    // 화면 첫 랜더링시 #1/5
    // 쿠키로 현재 유저의 닉네임을 가져옴.
    decoded = () => {
        axios.post('/api/saveTag?type=decoded', {
            token2 : cookie.load('usernickname')
        })
        .then( response => {
            //usernickname은 닉네임이 아니라 유저 넘버를 가져온것.
            this.setState({usernickname : response.data.token2.number})
            this.callSaveTagApi()
        })
        .catch( error => {
            this.sweetalert('작업중 오류가 발생하였습니다. (Header1)', error, 'error', '닫기');
        });
    }

    // 화면 첫 랜더링시 #2/5
    // 현재 유저의 저장 태그 리스트를 가져옴.
    callSaveTagApi = () => {
        axios.post('/api/saveTag?type=list', {
            userNickname : this.state.usernickname
        })
        .then( response => {
            try {
                this.setState({ saveTagList: response });
                this.setState({ append_SaveTagList: this.SaveTagListAppend() });
                this.setState({ testing1: this.callPostListApi_Tag() });
                this.setState({ tagGroupBox: this.callTagGroupEdit() });
                this.callTagGroupElement();
            } catch (error) {
                alert('작업중 오류가 발생하였습니다. (Home11)');
            }
        })
        .catch( error => {alert('작업중 오류가 발생하였습니다. (Home22)');return false;} );
    }

    // 화면 첫 랜더링시 #3/5
    SaveTagListAppend = () => {
        let result2 = []
        var SaveTagList = this.state.saveTagList.data
        
        for(let i=0; i<SaveTagList.json.length; i++){
            var data = SaveTagList.json[i]

            result2.push(
                <option id='saveTagGroup' class="hidden_type" >{data.savegroup}</option>
            )
        }
        return result2
    }

    categoryChange = (e) => {
        
        if (e.target.value == "by_tag") {
            $('#is_taggroup1').css("display","flex")
            $('#is_taggroup2').css("display","flex")
            $('#is_taggroup3').css("display","block")
            axios.post('/api/saveTag?type=list', {
                userNickname : this.state.usernickname
            })
            .then( response => {
                try {
                    this.setState({ saveTagList: response });
                    this.setState({ append_SaveTagList: this.SaveTagListAppend() });
                    this.callPostListApi_Tag();
                } catch (error) {
                    alert('작업중 오류가 발생하였습니다. (Home1)');
                }
            })
            .catch( error => {alert('작업중 오류가 발생하였습니다. (Home23)'); return false;} );

        } else if (e.target.value == "by_user") {
            $('#is_taggroup1').css("display","none")
            $('#is_taggroup2').css("display","none")
            $('#is_taggroup3').css("display","none")

            axios.post('/api/saveConnection?type=list', {
                userNickname : this.state.usernickname
            })
            .then( response => {
                try {
                    console.log(response)
                    this.setState({ responsePost: response });
                    this.setState({ append_Post: this.PostAppend() });
                } catch (error) {
                    alert('작업중 오류가 발생하였습니다. (Home1d)');
                }
            })
            .catch( error => {alert('작업중 오류가 발생하였습니다. (Home24)'); return false;} );

        }

    }

    // 화면 첫 랜더링시 #4/5
    callPostListApi_Tag = async () => {
        console.log($("#is_taggroup2 option:selected").val())
        axios.post('/api/Post_Tag?type=list', {
            is_taggroup : $("#is_taggroup2 option:selected").val()
            // 위 jquery로 select태그의 value값 불러옴
        })
        .then( response => {
            try {
                console.log(response)
                this.setState({ responsePost: response });
                this.setState({ append_Post: this.PostAppend() });
            } catch (error) {
                alert('작업중 오류가 발생하였습니다. (Home15)');
            }
        })
        .catch( error => this.setState({ append_Post: this.testing2() }) );

    }

    testing2 = () => {
        let result2 = []

        result2.push(
            <div className='Posting_Card_Empty'>
                아직 작성된 포스트가 없습니다. 
            </div>
        )

        return result2
    }

    // 화면 첫 랜더링시 #5/5 끝
    PostAppend = () => {
        let result = []
        var Post = this.state.responsePost.data

            for(let i=0; i<Post.json.length; i++){
                var data = Post.json[i]

                result.push(

                <div className='Posting_Card_Wrap'>

                    <section className='Posting_Card_Header'>
                        <Link to={'/mypage/'+data.nickname}>
                            <div className='Posting_Card_Header2'>
                                <div className='Posting_Card_Header_profilePhoto'>
                                    <img width='30px' height='30px' src={data.profilephoto} />
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
                            <img src={data.image} />
                        </div>
                        <div className='Posting_Card_Image'>
                            {data.text}
                        </div>
                    </section>

                    <section className='Posting_Card_Downside'>
                        <ul className='Posting_Card_Downside2'>
                            <li><div className='Posting_Card_Downside2_like'><img src={like_full} width='12px' height='12px' /></div>{data.likes}</li>
                            <li>댓글</li>
                            <li># {data.tagname}</li>
                            <li>위치정보</li>
                        </ul>
                        
                    </section>

                </div>

            )}
        
        return result
    }

    separation = () => {
        if ($("#tag2 option:selected").val() == "by_tag") {
            this.callPostListApi_Tag();
        } else if ($("#tag2 option:selected").val() == "by_user") {
            this.callPostListApi_Connection();
        }
    }

    sweetalertDelete = (title, callbackFunc) => {
        Swal.fire({
            title: title,
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Deleted!',
                '삭제되었습니다.',
                'success'
              )
            }else{
                return false;
            }
            callbackFunc()
          })
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

    groupEditBtnClick = () => {
        $('#Home_TagGroupEditBox').toggle('active');
    }

    groupEditBtnClick2 = (e) => {
        $('#Home_TagGroupEditBox2'+e.target.value).toggle('active');
    }

    groupEditBtnClick3 = (e) => {
        $('#textarea6'+e.target.value).toggle('active');
        $('#Home_tagAddBtn1'+e.target.value).toggle('active');
        $('#Home_tagAddBtn2'+e.target.value).toggle('active');
        $('#Home_tagDeleteBtn'+e.target.value).toggle('active');
    }

    groupEditBtnClick4 = (e) => {
        $('#textarea6'+e.target.value).toggle('active');
        $('#Home_tagAddBtn1'+e.target.value).toggle('active');
        $('#Home_tagAddBtn2'+e.target.value).toggle('active');
        $('#Home_tagDeleteBtn'+e.target.value).toggle('active');
    }

    callTagGroupEdit = () => {

        let result1 = []

        for(let i=0; i<this.state.saveTagList.data.json.length; i++){
            let saveTagList = this.state.saveTagList.data.json[i].savegroup
            
            result1.push(
                <section id={'Home_TagGroupBoxWrap'+saveTagList}>
                    <div className='Home_TagGroupBox'>
                        <div id={'Home_TagNameInput'+saveTagList} className='Home_TagNameInput'>
                            <TextareaAutosize id={'Home_TagNameInputText'+saveTagList} className='Home_TagNameInput2' name="textArea" maxlength='10' placeholder={saveTagList} spellcheck="false"/>
                            <button className='Home_TagNameChangeOrNot' value={saveTagList} onClick={e => this.tagNameChangeSubmit(e)}>
                                변경
                            </button>
                            <button className='Home_TagNameChangeOrNot' value={saveTagList} onClick={e => this.tagNameChangeCancel(e)}>
                                취소
                            </button>
                        </div>
                                    
                        <button id={'Home_TagNameInput2'+saveTagList} className='Home_settingsBtn' value={saveTagList} onClick={e => this.groupEditBtnClick2(e)}>
                            {saveTagList}
                        </button>
                        <div id={'Home_TagGroupEditBox2'+saveTagList} className='Home_TagGroupFixAndDelete1'>
                                <button className='Home_TagGroupFix' value={saveTagList} onClick={ e => this.changeGroupName(e)}>그룹명변경</button>
                                <button value={saveTagList} className='Home_TagGroupDelete' onClick={ e => this.deleteTagGroup(e)}>그룹삭제</button>
                        </div> 
                    </div>
                    <div id={saveTagList} className='Home_Tags'></div>
                    <div id={'test'+saveTagList}></div>
                </section>
            )

        }
        return result1
    }

    callTagGroupElement = () => {

        for(let i=0; i<this.state.saveTagList.data.json.length; i++){
            let saveTagList = this.state.saveTagList.data.json[i].savegroup

            axios.post('/api/tagGroupElement?type=list', {
                tagGroupName : saveTagList,
                userNumber : this.state.usernickname
            })
            .then( response => {
                try {
                    this.tagGroupElementAppend(response);
                    
                    // 태그 리스트 끝에 태그 추가버튼.
                    var tagDeleteBtn3 = document.getElementById(saveTagList);
                            
                    var tagDeleteBtn4 = document.createElement('button');
                    tagDeleteBtn4.className = 'Home_tagDeleteBtn'
                    tagDeleteBtn4.textContent = '태그추가';
                    tagDeleteBtn4.type = 'button';
                    tagDeleteBtn4.id = 'Home_tagDeleteBtn'+saveTagList;
                    tagDeleteBtn4.value = saveTagList;
                    tagDeleteBtn4.onclick = (e) => this.groupEditBtnClick3(e);
                    
                    tagDeleteBtn3.append(tagDeleteBtn4);

                    // 태그 리스트 끝에 텍스트넣는란 추가.
                    var textarea1 = document.getElementById('test'+saveTagList);

                    var textarea2 = document.createElement('textarea');
                    textarea2.cols = '';
                    textarea2.rows = '1';
                    textarea2.maxlength = '13';
                    textarea2.id = 'textarea6'+saveTagList;
                    textarea2.placeholder = '태그를 작성해보세요';
                    textarea2.className = 'textarea6';
                    textarea2.spellcheck = 'false';

                    textarea1.append(textarea2);

                    //태그 리스트 끝에 등록버튼 추가.
                    var newTagAdd1 = document.getElementById('test'+saveTagList);
                            
                    var newTagAdd2 = document.createElement('button');
                    newTagAdd2.className = 'Home_tagAddBtn'
                    newTagAdd2.textContent = '등록';
                    newTagAdd2.type = 'button';
                    newTagAdd2.value = saveTagList;
                    newTagAdd2.id = 'Home_tagAddBtn1'+saveTagList;
                    newTagAdd2.onclick = (e) => this.addTag(e);
                    
                    newTagAdd1.append(newTagAdd2);
                    
                    //태그 리스트 끝에 취소버튼 추가.
                    var newTagAdd1 = document.getElementById('test'+saveTagList);
                            
                    var newTagAdd2 = document.createElement('button');
                    newTagAdd2.className = 'Home_tagAddBtn'
                    newTagAdd2.textContent = '취소';
                    newTagAdd2.type = 'button';
                    newTagAdd2.id = 'Home_tagAddBtn2'+saveTagList;
                    newTagAdd2.value = saveTagList;
                    newTagAdd2.onclick = (e) => this.groupEditBtnClick3(e);
                    
                    newTagAdd1.append(newTagAdd2);
                
                } catch (error) {
                    alert('작업중 오류가 발생하였습니다. (Home15)');
                }
            })
            .catch( error => console.log(error) );
        }
    }

    tagGroupElementAppend = (response) => {
        
        for(let i=0; i<response.data.json.length; i++){
            let saveTagGroup = response.data.json[i].savegroup
            let saveTagName = response.data.json[i].savetagname

            $('#'+saveTagGroup).append('<div id="'+saveTagGroup+saveTagName+'">'+saveTagName+'</div>')

            var tagDeleteBtn1 = document.getElementById(saveTagGroup+saveTagName);
                
            var tagDeleteBtn2 = document.createElement('button');
            tagDeleteBtn2.className = 'Home_tagDeleteBtn'
            tagDeleteBtn2.textContent = 'x';
            tagDeleteBtn2.type = 'button';
            tagDeleteBtn2.id = 'tagDeleteBtn';
            tagDeleteBtn2.value = saveTagGroup+'/'+saveTagName;
            tagDeleteBtn2.onclick = (e) => this.deleteTag(e);
            
            tagDeleteBtn1.append(tagDeleteBtn2);

        }

    }

    deleteTag = (e) => {
        console.log(e.target.value)
        
        var strArr = e.target.value.split('/')
        $('#'+strArr[0]+strArr[1]).remove()
        
        console.log(strArr[0])
        console.log(strArr[1])
        
        axios.post('/api/tagGroupElement?type=delete', {
            userNumber : this.state.usernickname,
            TagGroup : strArr[0],
            TagName : strArr[1]
        })
        .then( response => {
            try {
                console.log(response);
                

            } catch (error) {
                alert('작업중 오류가 발생하였습니다. (Home15)');
            }
        })
        .catch( error => console.log(error) );

    }

    deleteTagGroup = (e) => {

        $('#Home_TagGroupBoxWrap'+e.target.value).remove()

        axios.post('/api/tagGroupElement?type=delete2', {
            userNumber : this.state.usernickname,
            TagGroup : e.target.value
        })
        .then( response => {
            try {
                console.log(response);
            } catch (error) {
                alert('작업중 오류가 발생하였습니다. (Home15)');
            }
        })
        .catch( error => console.log(error) );

    }

    changeGroupName = (e) => {
        this.groupEditBtnClick2(e);
        $('#Home_TagNameInput'+e.target.value).toggle('active');
        $('#Home_TagNameInput2'+e.target.value).toggle('active');
    }

    tagNameChangeCancel = (e) => {
        $('#Home_TagNameInput'+e.target.value).toggle('active');
        $('#Home_TagNameInput2'+e.target.value).toggle('active');
    }

    tagNameChangeSubmit = (e) => {

        if ( $('#Home_TagNameInputText'+e.target.value).val() !== '' ) {

            axios.post('/api/tagGroupElement?type=update', {
                userNumber : this.state.usernickname,
                ExistingName : e.target.value,
                ChangeName : $('#Home_TagNameInputText'+e.target.value).val()
            })
            .then( response => {
                try {
                    console.log(response);
                    window.location.reload()
                } catch (error) {
                    alert('작업중 오류가 발생하였습니다. (Home15)');
                }
            })
            .catch( error => console.log(error) );

        } else {
            alert('변경할 그룹명을 입력해주세요.')
        }

    }

    addTag = (e) => {

        if ( $('#textarea6'+e.target.value).val() !== '' ) {

            axios.post('/api/tagGroupElement?type=insert', {
                userNumber : this.state.usernickname,
                groupName : e.target.value,
                newTagName : $('#textarea6'+e.target.value).val()
            })
            .then( response => {
                try {
                    console.log(response);
                    //이 함수 맞는지 잘 모르겠다.
                    window.location.reload();
                } catch (error) {
                    alert('작업중 오류가 발생하였습니다. (Home15)');
                }
            })
            .catch( error => console.log(error) );

        } else {
            alert('추가할 태그명을 입력해주세요.')
        }

    }

    newTagGroupCreate = () => {

        axios.post('/api/saveTag?type=list', {
            userNickname : this.state.usernickname
        })
        .then( response => {
            try {
                if ( response.data.json.length > 4) {
                    alert('태그 그룹은 5개 까지 생성 가능합니다.')
                } else {
                    
                    var tagArr1 = [];
                    for(let i=0; i<response.data.json.length; i++){
                        let saveTagGroup2 = response.data.json[i].savegroup
                        tagArr1.push(saveTagGroup2)
                    }
                    if ( tagArr1.indexOf('새그룹1') == -1 ) {
                        this.newTagGroupCreate2('새그룹1');
                    } else if ( tagArr1.indexOf('새그룹2') == -1 ) {
                        this.newTagGroupCreate2('새그룹2');
                    } else if ( tagArr1.indexOf('새그룹3') == -1 ) {
                        this.newTagGroupCreate2('새그룹3');
                    } else if ( tagArr1.indexOf('새그룹4') == -1 ) {
                        this.newTagGroupCreate2('새그룹4');
                    } else if ( tagArr1.indexOf('새그룹5') == -1 ) {
                        this.newTagGroupCreate2('새그룹5');
                    }

                }
            } catch (error) {
                alert('작업중 오류가 발생하였습니다. (Home11)');
            }
        })
        .catch( error => {alert('작업중 오류가 발생하였습니다. (Home22)');return false;} );

    }

    newTagGroupCreate2 = (groupName) => {

        axios.post('/api/tagGroupElement?type=insert2', {
            userNumber : this.state.usernickname,
            groupName : groupName,
            newTagName : 'qpwoeieru1j1b2u2busu2o2' //아무 수나 넣게.
        })
        .then( response => {
            try {
                console.log(response);
                window.location.reload();
            } catch (error) {
                alert('작업중 오류가 발생하였습니다. (Home15)');
            }
        })
        .catch( error => console.log(error) );

    }

    render () {
        return (
            <>
                <LeftSide/>

                <div className="Home_sub_wrap" >

                    <div className='Home_header'>
                        <div className='Home_leftBtn'>
                            <select className='Home_select1' onChange={this.categoryChange} id="tag2" name='by_tag1'>
                                <option value="by_tag">태그별</option>
                                <option value="by_user">사용자별</option>
                            </select>
                            <div id='is_taggroup1' className='Home_rightArrow'>
                                <img src={rightArrow1} width='9px' height='9px' />
                            </div>
                            <select className='Home_select2' onChange={this.separation} id="is_taggroup2" name='is_taggroup2'>
                                {this.state.append_SaveTagList}
                            </select>
                            <div id="is_taggroup3">
                                <button id='GroupEditButton' type='button' className='Home_GroupEditButton' onClick={this.groupEditBtnClick}>
                                    <img src={settings3} width='11px' height='11px' />
                                </button>
                                <div id='Home_TagGroupEditBox' className='Home_TagGroupEditBox'>
                                    <div className='Home_TagGroupEditBoxHeader'></div>
                                    {this.state.tagGroupBox}
                                    <button id='Home_newTagGroupCreate' type='button' className='Home_newTagGroupCreate' onClick={this.newTagGroupCreate}>새그룹추가</button>
                                </div>
                            </div>
                        </div>
                        <div className='Home_rightBtn'>
                            <select className='Home_select3' onChange={this.callPostListApi} name='sort'>
                                <option>인기순</option>
                                <option>최신순</option>
                                <option>위치순</option>
                            </select>
                        </div>
                    </div>

                    <article>
                        <div class="list_cont list_cont_admin">
                            {this.state.append_Post}
                        </div>
                    </article>

                </div>
                <RightSide/>

            </>
        );
    }
}

export default Home;