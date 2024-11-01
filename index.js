const express = require('express') // 내가 설치한 express 모듈을 가져온다.
const app = express() // 새로운 express 앱을 만든다.
const port = 5000 // 포트

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jin:0000@jin.p3agn.mongodb.net/?retryWrites=true&w=majority&appName=jin',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => { // 앱을 넣은 후에 루트디렉토리에 오면 헬로월드 실행?
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) //앱을 포트 5000번에서 실행
})



