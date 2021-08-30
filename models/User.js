const bcrypt = require('bcrypt')
const saltRounds = 10

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

userSchema.pre('save', function(next) {
    // var user = this; // userSchema를 가리킴
    // if (user.isModified('password')) { // '비밀번호'가 수정된 경우에만 재 암호화
    //     // 비밀번호 암호화
    //     bcrypt.genSalt(saltRounds, (err, salt) => {
    //         if (err) return next(err)
    //         bcrypt.hash(user.password, salt, (err, hash) => {
    //             if (err) return next(err)
    //             user.password = hash // 암호화된 비밀번호로 교체
    //             next()
    //         })
    //     })
    // } else {
    //     next()
    // }
    var user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) { return next(err) }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) { return next(err) }
                user.password = hash
                next()
            })
        })
    }
    
})

const User = mongoose.model('User', userSchema) // (모델의 이름, 스키마)

module.exports = {User} // 이 모델을 다른 파일에서도 사용하기 위해 export
