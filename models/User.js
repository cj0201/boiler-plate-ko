const mongoose = require(mongoose); // 몽구스 가져옴

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
    pqssword:{
        type:String,
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
    token:{ // 유효성을 관리할수 있음
        type:String
        },
    tokenExp:{ // 토큰을 사용할수 있는 기한을 주는것
        type:Number
        },
})

const User = mongoose.model('User',userSchema) // 스키마를 감싸주는 모델

module.exports = {User} //이 모델을 다른 파일에서도 사용하고 싶을때