import { extendObservable } from 'mobx';

/* User Store */

class UserStore{

    constructor(){
/* store에 대한 속성 포함 */
        extendObservable(this, {
/* login 양식이 로드 되는지 여부 확인하기 위해 loading 추가 */
            loading : true,
/* boolean(논리) 연산자를 통해서 login 여부 확인 */
            isLoggedIn : false,
/* username의 초기 상태는 비어있는 문자열로 지정 */
            username : ''
            

        })
    }
}

export default new UserStore();

/* 위의 데이터들을 포함하는 new 인스턴스 사용 */

