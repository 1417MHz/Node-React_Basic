const mongoose = require('mongoose')
const bcrypt = require('bcrypt') // bcrypt = 비밀번호와 같은 숫자들을 해쉬처리하기 위한 라이브러리
const saltRounds = 10 
const jwt = require('jsonwebtoken')

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

userSchema.pre('save', function(next) { // pre = User 모델에 정보를 저장하기 전에 할 동작
    var user = this; // userSchema를 가리킴
    if (user.isModified('password')) { // '비밀번호'가 수정된 경우에만 재 암호화
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) { return next(err) }
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) { return next(err) }
                user.password = hash // 암호화된 비밀번호로 교체
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plainPassword와 DB 속 암호화된 비밀번호가 같은지 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) {return cb(err)}
        cb(null, isMatch)
    })
}
userSchema.methods.generateToken = function(cb) {
    var user = this
    // jsonwebtoken을 이용해서 토큰을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken') // user._id + 'secretToken" = Token
    user.token = token
    user.save(function(err, user) {
        if(err) { return cb(err) } // 에러가 발생할 경우
        cb(null, user) // 에러가 발생하지 않을 경우 user정보를 전달
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this
    // 토큰을 decode
    jwt.verify(token, 'secretToken', function(err, decoded) { // decoded = user._id
        // 유저 아이디를 이용해서 유저를 찾은 다음 
        // 클라이언트에서 가져온 토큰과 DB에서 보관된 토큰이 일치한지 확인
        user.findOne({"_id": decoded, "token": token}, function(err, user) {
            if(err) { return cb(err) }
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema) // (모델의 이름, 스키마)

module.exports = {User} // 이 모델을 다른 파일에서도 사용하기 위해 export
