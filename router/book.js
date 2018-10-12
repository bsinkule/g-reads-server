const express = require('express')
const router = express.Router()

const queries = require('../db/queries') 

router.get('/', (req, res) => {
    queries.getAllBooks('book')
        .then(data => {
            res.json({
                data: data
            })
        })
})

router.get('/search/:title', (req, res) => {
    queries.findBook(req.params.title)
        .then(match => {
            res.json({
                matches: match
            })
        })
})

router.get('/justbooks', (req, res) => {
    queries.getJustBooks('book')
        .then(data => {
            res.json({
                data: data
            })
        })
})

router.get('/:id', (req, res) => {
    queries.getOne('book', req.params.id)
        .then(one => {
            res.json({
                getOne: one[0]
            })
        })
})

router.post('/', (req, res) => {
    const body = req.body

    queries.postOne('book', body)
        .then(post => {
            res.json({
                posted: post[0]
            })
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body

    queries.updateOne('book', id, body)
        .then(update => {
            res.json({
                updated: update[0]
            })
        })
})

router.delete('/:id', (req, res) => {
    queries.deleteOne('book', req.params.id)
        .then(del => {
            res.json({ deleted: del[0]})
        })
})

module.exports = router