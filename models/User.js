const mongoose = require('mongoose'); // 따옴표 누락 수정

const bcrypt = require('bcrypt');
const saltRounds = 10



const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength: 50
    },
    email:{
        type: String,
        trim:true, // trim은 스페이스바를 한거를 없애주는 역할 ex) dlckd wls1232@naver.com 이런경우
        unique: 1 // 유니크 똑같은 이메일 금지
    },
    password:{
        type: String,
        maxlength: 50
    },
    lastname:{
        type:String,
        maxlength: 50
    },
    role:{ // role을 주는이유? 어떤유저가 관리자가 될수도 있고. 이런경우
        type:Number,
        default: 0 // 임의로 role을 주지않으면 0을 주겠다. 일반유저
    },
    image:String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//user 모델에 user정보를 저장하기 전에 뭔가를 해준다?
userSchema.pre('save',function(next) { // next 파라미터는 다음으로 넘기게 하는거
    var user =this; // 이거는 userSchema를 가르키는것 
    if(user.isModified('password')) {
    //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash) { // hash는 암호화된 비밀번호
            if(err) return next(err)
            user.password = hash  // hash는 암호화된 비밀번호로 바꿔준다. 
            next()
        })
       
    })

    }else {
        next()
    }


}) // 이게 끝나면 register route 로 넘어간다.

const User = mongoose.model('User',userSchema) // 스키마를 감싸주는 모델

module.exports = {User} //이 모델을 다른 파일에서도 사용하고 싶을때