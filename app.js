const express = require("express");
const mysql = require('./dbconnect.js')

const app = express()
const port = 3000
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/view/index.html")
})

app.get("/register",(req,res)=>{
    res.sendFile(__dirname+"/view/register.html")
})
//회원가입
app.post("/reg", async (req,res)=>{ 
    var name = req.body.user_name;
    var id = req.body.user_id;
    var pwd = req.body.user_password;
    var idoverlap = await mysql.queryreturn(`select * from user where id = "${id}" and password = "${pwd}";`)
    if(idoverlap == 0){
        var regquery = await mysql.queryreturn(`insert into user(name,id,password) values("${name}","${id}","${pwd}")`)
        if(regquery == 0){
            res.send('<script>alert("다시시도해주세요");location.replace("/register") </script>')
        }
        else{
            res.send('<script>alert("회원가입 성공!");location.replace("/register") </script>')
        }
    }
    else{
        res.send('<script>alert("이미등록된아이디가 존재합니다");location.replace("/register") </script>')
    }
})
//로그인 처리
app.post('/login', async function(req, res){
        var id = req.body.user_id;
        var pwd = req.body.user_pwd;
        var result = await mysql.queryreturn(`select * from user where id = "${id}" and password = "${pwd}";`)
        if(result == 0){
            res.send('<script>alert("아이디 또는 비밀번호가 틀렷습니다 ");location.replace("/") </script>')
        }
        else{
            var username = result[0].name;
            res.send(`<script>alert("성공! ${username}님 안녕하세요");location.replace("/") </script>`)
        }
  });
  
app.listen(port,() =>{
    console.log(`localhost:${port}`)
})