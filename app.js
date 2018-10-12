const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const author = require('./router/author')
const book = require('./router/book')
const authorBook = require('./router/authorBook')
const path = require('path')
const fs = require('fs')
const port = process.env.PORT || 5000
const listener = () => console.log(`Listening on port ${port}`)


const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(cors())

app.use('/author', author)
app.use('/book', book)
app.use('/authorbook', authorBook)


app.get('/*', function (req, res) {
  if (fs.existsSync(path.join(__dirname, 'build/index.html'))) {
    res.sendFile(path.join(__dirname, 'build/index.html'), function (err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  } else {res.send('Build Not Found')}
})

app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : {}
  })
})

app.listen(port, listener)

module.exports = app