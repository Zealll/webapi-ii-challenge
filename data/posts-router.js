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

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Posts
    .findById(id)
    .then(individualPost => {
        if(!individualPost) {
            res
            .status(404)
            .json({message: `The post with the specified ID of ${id} does not exist.`})
        } else {
            res
            .json(individualPost)
        }
    })
    .catch(err => {
        res
        .status(500)
        .json({error: "The post information could not be retrieved."})
    })
})




module.exports = router;