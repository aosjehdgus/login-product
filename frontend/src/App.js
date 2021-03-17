import React from 'react';
import { observer } from 'mobx-react';
import UserStore from './stores/UserStore';
import LoginForm from './LoginForm';
import SubmitButton from './SubmitButton';
import './App.css';

class App extends React.Component {

// API 호출하기
// application/json : JSON과 이에 대한 콘텐츠 유형만 허용
// let result : res의 값을 json으로 받는다.
// UserStore.loading = false; 더 이상 로드할 필요가 없다.
// UserStore.isLoggedIn = true; login인 된 상태이기 때문에
// UserStore.username = result.username;  

  async componentDidMount(){
    try{
        let res = await fetch('/isLoggedIn',{

          method : 'post',
          headers:{         
            'Accept'       : 'application/json',
            'Content-Type' : 'application/json'
          } 
        });

        let result = await res.json();

        if (result && result.success){

          UserStore.loading = false;
          UserStore.isLoggedIn = true;
          UserStore.username = result.username;  

        }
        else{
          UserStore.loading = false;
          UserStore.isLoggedIn = false;

        }
    }

    catch(e){

      UserStore.loading = false;
      UserStore.isLoggedIn = false;

    }

  }

//   
  async doLogout(){

    try{

      let res = await fetch('/logout',{

        method : 'post',
        headers:{
// JSON과 이에 대한 콘텐츠 유형만 허용
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'

        }
      });

      let result = await res.json();

      if (result && result.success){
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }
    }

    catch(e){

      console.log(e)

    }

  }

  render(){

    if (UserStore.loading){
      return(

        <div className="app">
           <div className='container'>
              로딩 중입니다. 잠시만 기다려주세요.

           </div>
        </div>


      );

    }
    
    else{

        if (UserStore.isLoggedIn){

          return(

            <div className="app">
               <div className='container'>
                  Welcome {UserStore.username}
                  <SubmitButton 
                  
                    text = {'로그아웃'}
                    disabled = {false}
                    onClick = { () => this.doLogout()}
                  
                  />               
 
               </div>
            </div>
    
    
          );

        }

        return (
          <div className="app">
              <div className='container'>

                  
                  <LoginForm />
               </div>
          </div>
        );

    
    }
  }
}
export default observer(App);
