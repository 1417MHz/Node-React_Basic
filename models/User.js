const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // trim = 띄어쓰기를 없애줌
        unique: 1 // 중복 불가
    },
    password: {
        type: String,
        minlength: 4
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema) // (모델의 이름, 스키마)

module.exports = {User} // 이 모델을 다른 파일에서도 사용하기 위해 export
