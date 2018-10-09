const express = require('express')
const router = express.Router()

const queries = require('../db/queries') 

router.get('/', (req, res) => {
    queries.getAllAuthors('author')
        .then(data => {
            res.json({
                data: data
            })
        })
})

router.get('/justauthors', (req, res) => {
    queries.getJustAuthors('author')
        .then(data => {
            res.json({
                data: data
            })
        })
})

router.get('/:id', (req, res) => {
    queries.getOne('author', req.params.id)
        .then(one => {
            res.json({
                getOne: one[0]
            })
        })
})

router.post('/', (req, res) => {
    const body = req.body

    queries.postOne('author', body)
        .then(post => {
            res.json({
                posted: post[0]
            })
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body

    queries.updateOne('author', id, body)
        .then(update => {
            res.json({
                updated: update[0]
            })
        })
})

router.delete('/:id', (req, res) => {
    queries.deleteOne('author', req.params.id)
        .then(del => {
            res.json({ deleted: del[0]})
        })
})

module.exports = router