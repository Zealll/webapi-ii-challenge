const express = require('express')

const router = express.Router()

const Posts = require('./db.js')

router.get('/', (req, res) => {
    Posts
    .find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        res
        .status(500)
        .json({error: `The posts information could not be retrieved. ${err}`})
    })
})




module.exports = router;