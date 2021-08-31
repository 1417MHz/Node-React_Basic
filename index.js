const mongoUrl = require('./mongo') // MongoDB 연결을 위한 URL
const express = require('express') // 라이브러리 첨부
const app = express() // 라이브러리 객체 만들기
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require('./models/User')

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// application/json
app.use(bodyParser.json())

app.use(cookieParser())

const mongoose = require('mongoose')
console.log(mongoUrl);
mongoose.connect(mongoUrl(), {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! Nice to meet you.'))

// 회원가입
app.post('/register', (req, res) => {
    // 회원 가입시 필요한 정보들을 client에서 가져오면 그것들을 DB에 넣어준다.
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err }) // 에러가 발생할 경우
        return res.status(200).json({
            success: true 
        })
    })
})

// 로그인
app.post('/login', (req, res) => {
    // 1. 요청된 이메일이 DB에 있는지 확인한다
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "찾고자 하는 유저가 없습니다."
            })
        }
        // 2. 요청한 이메일이 DB에 있다면 비밀번호가 일치한지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) { return res.json({ loginSuccess: false, message: "비밀번호가 일치하지 않습니다." })}

            // 3. 비밀번호가 일치하다면 토큰 생성
            user.generateToken((err, user) => {
                if(err) { return res.status(400).send(err) }
                // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지, 등등등
                res.cookie("user_token", user.token) // 브라우저 쿠키에 저장
                .status(200)
                .json({ loginSuccess: true, userId: user._id })
            })
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
