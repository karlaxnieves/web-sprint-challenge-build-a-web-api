const express = require('express')

const Actions = require('./actions-model')

const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get()
    .then(actions => {
        res.json(actions)
    })
    .catch(next)
})

module.exports = router;