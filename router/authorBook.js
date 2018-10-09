const express = require('express')
const router = express.Router()

const queries = require('../db/queries')

router.post('/', (req, res) => {
    queries.addNewAuthor('author_book', req.body).then(result => res.json({ result }))
})
  
router.get('/', (req, res) => {
    queries.getJoins('author_book')
        .then(data => {
            res.json({
                data: data
            })
        })
})

router.delete('/:book/:auth', (req, res) => {
    queries.deleteJoin('author_book', req.params.book, req.params.auth)
        .then(del => {
            res.json({ deleted: del[0]})
        })
})

module.exports = router