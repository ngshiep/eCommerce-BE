
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')

const app = express()

//init middle wares
// đầu ra ngắn gọn: status có màu/  thời gian phản hồi => chỉ dùng lúc dev
app.use(morgan('dev'))

// Đầu ra full thông tin: request's ip/ time/ phương thức/ status/ kiểu request. 
// app.use(morgan('combined'))

// cũng như combined nhưng k biết dùng gì để gửi request
// app.use(morgan('common'))

// ngắn hơn
// app.use(morgan('short'))

// ngắn nhất.
// app.use(morgan('tiny'))

app.use(helmet())
app.use(compression())

//init db
require('./dbs/init.mongodb')



// init routes
app.use('/', require('./routes'))


// handling errors


module.exports = app