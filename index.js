const mongoUrl = require('./mongo') // MongoDB 연결을 위한 URL
const express = require('express') // 라이브러리 첨부
const app = express() // 라이브러리 객체 만들기
const port = 5000
const bodyParser = require('body-parser')
const { User } = require('./models/User')

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// application/json
app.use(bodyParser.json())

const mongoose = require('mongoose')
console.log(mongoUrl);
mongoose.connect(mongoUrl(), {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! Nice to meet you.'))

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


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
