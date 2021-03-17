import { extendObservable } from 'mobx';

class UserStore{

    constructor(){
        extendObservable(this, {

            loading : true,
            isLoggedIn : false,
            username : ''          

        })
    }
}

export default new UserStore();


// User Store 

// extendObservable은 store에 대한 속성을 포함한다. 
// login 양식이 로드 되는지 여부 확인하기 위해 loading 추가한다.
// isLoggedIn에서 논리 연산자를 통해 login 여부를 체크한다.
// username의 초기 상태는 비어있는 문자열로 지정한다.

// 위의 데이터들을 포함하는 new 인스턴스 사용 

    