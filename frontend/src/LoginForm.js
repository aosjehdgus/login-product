import React          from 'react';
import Head           from './Head';
import InputField     from './InputField';
import SubmitButton   from './SubmitButton';
import UserStore      from './stores/UserStore';


class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {

      head : {title : "dongle's page"},
      username : '',
      password : '',
      buttonDisabled : false
    }

  }

  setInputValue(property, val){
    val = val.trim(); // 공백이 필요하지 않기 때문에

  // 프론트 엔드의 유효성 검사의 한종류
    if (val.length > 12){
        return;
    }
    // 상태를 설정하게 되면 state가 property가 된다.
    this.setState({
      [property]: val

    })

  }

  // 메소드 재설정 양식
  // 사용자 이름, 암호를 재설정하고 비활성화된 버튼을 false로 재설정
  // 사용자가 잘못된 이름,비밀번호를 입력하면 양식이 재설정 된다.
  // 사용자가 알맞게 입력하면 새 api 호출을 생성한다.

  resetForm(){
    this.setState({
      
      username : '',
      password : '',
      buttonDisabled : false
    })

  }

  async doLogin() {

    if (!this.state.username){
      return;
    }

    if (!this.state.password){
      return;
    }

    this.setState({
      buttonDisabled: true
    })

    try{
      let res = await fetch('/login',{
        method : 'post',
        headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },

        body : JSON.stringify({
          username : this.state.username,
          password : this.state.password

        })

      });

      let result = await res.json();
      if (result && result.success){

        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
        
      }

      else if (result && result.success === false){
        this.resetForm();
        alert(result.msg);
      }

    }

    catch(e) {
      console.log(e);
      this.resetForm();

    }
  }

  render(){

    return (
      <div className="loginForm">
          <Head 
            title={this.state.head.title}
          
          />

       

          <InputField 

              label = '아이디'
              type = 'text'
              placeholder = '아이디'
              value = {this.state.username ? this.state.username : ''}
              onChange = { (val) => this.setInputValue('username', val) }
          />

          <InputField 

              label = '비밀번호'
              type = 'password'
              placeholder = '비밀번호'
              value = {this.state.password ? this.state.password : ''}
              onChange = { (val) => this.setInputValue('password', val) }
          />
          <SubmitButton 
              text = '회원 가입'
              disabled = {this.state.buttonDisabled}
              onClick = { () => this.doLogin() }
          
          />

          <SubmitButton 
              text = '로그인'
              disabled = {this.state.buttonDisabled}
              onClick = { () => this.doLogin() }
          
          />
      </div>
    );
  }
}
export default LoginForm;
