const mongoUrl = require('./mongo');
const express = require('express') // 라이브러리 첨부
const app = express() // 라이브러리 객체 만들기
const port = 5000

const mongoose = require('mongoose')
console.log(mongoUrl);
mongoose.connect(mongoUrl(), {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
