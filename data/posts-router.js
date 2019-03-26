const express = require('express')

const router = express.Router()

const Posts = require('./db.js')

router.get('/', (req, res) => {
    Posts
    .find()
    .then(posts => {
        res.json(posts)
    })
    .catch(() => {
        res
        .status(500)
        .json({error: "The posts information could not be retrieved."})
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

router.post('/', (req, res) => {
    const post = req.body

    if(!post.title || !post.contents) {
        res
        .status(400)
        .json({errorMessage: "Please provide title and contents for the post."})
    } else {
        Posts
        .insert(post)
        .then(newPost => {
            res
            .status(201)
            .json(newPost)
        })
        .catch(() => {
            res
            .status(500)
            .json({error: "There was an error while saving the post to the database"})
        })
    }
})




module.exports = router;