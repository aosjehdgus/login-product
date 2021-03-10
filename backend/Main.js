const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router = require('./Router');


app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

// Database 생성하기
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '930121',
    database : 'myapp'

});

// Database 연결하기 이 상태에서 npm start 명령어를 통해서 정상적으로 연결되었는지 테스트 해본다.

db.connect(function(err){
    if(err){
        console.log('DB error');
        throw err;
        return false;
    }

}); 

// session store(저장소) 생성하기
// session store는 내부적으로 MySQL 연결 pool을 생성
// Database에 대한 연결을 처리하며 이것은 MySQL 저장소이다.
// express에서 사용하는 default 값보다 좋다 (메모리 측면)

const sessionStore = new MySQLStore({
    expiration : (1825 * 86400 * 1000),
    endConnectionOnClose : false
// endConnectionOnClose -> 저장소가 닫힐 때 DB 연결을 종료하려면 
}, db);

// sessionStore를 사용할 session 만들기

app.use(session({
    key: '23043sldkfsdlkfsdkf',
    secret : 'sdflsdkjfalflskdfl',
    store : sessionStore,
    resave : false,
    saveUninitialized: false,
    cookie :{
        maxAge : (1825 * 86400 * 1000),
        httpOnly : false
    }
}));

// 이 상태에서 npm start를 통해서 오류가 없는지 체크하기

// Router 생성하기

// app 권한과 db에 엑세스 할 수 있도록
new Router(app, db);

// class 기반 router를 사용함으로서 애플리케이션을 더 잘 확장할 수 있음
// frontend에서 해당 build를 사용할 수 있기 때문에 

app.get('/', function(req, res){

//여기가 홈페이지가 된다
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(3000);