const express = require('express'); // 내가 설치한 express 모듈을 가져온다.
const app = express() // 새로운 express 앱을 만든다.
const port = 5000 // 포트

const config = require('./config/key');

const bodyParser = require('body-parser');
const {User} = require("./models/User"); //  User 가져옴

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))  // 바디 파서가 클라이언트에서 오는정보를 서버에서 분석해서 가져올수있게 하는것 

//application/josn
app.use(bodyParser.json()); // 애는 json타입을 분석해서 가져옴

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => { // 앱을 넣은 후에 루트디렉토리에 오면 헬로월드 실행?
  res.send('Hello World! 안녕하세요')
})


//register route
app.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    // user 정보들을 데이터베이스에 넣기위해 req.body로 작성하면됨
    // req.body 에는 정보들 있음 
    const userInfo = await user.save(); // 만약 저장을 할때  err가 있을때 클라이언트한테 json형식으로 알려줌
    res.status(200).json({ success: true, userInfo });  
  } catch (err) { // err 메세지 전달
    res.json({ success: false, err });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) //앱을 포트 5000번에서 실행
})



