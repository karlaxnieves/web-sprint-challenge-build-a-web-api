const express = require('express')

const Actions = require('./actions-model')
const {checkActionsId, validateActions} = require('../actions/actions-middlware')
const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get()
    .then(actions => {
        res.json(actions)
    })
    .catch(next)
})

router.get('/:id', checkActionsId, (req, res, next) => {
    res.json(req.actions)
    })

router.post('/:id', checkActionsId, validateActions, (req, res, next) => {
    Actions.insert({project_id: req.project_id})
    .then(project => {
        res.status(201).json(project)
    })
    .catch(next)
})    

router.delete('/:id', checkActionsId, (req, res, next) => {
    Actions.remove(req.params.id)
    .then(() => {
        res.status(200).json({message: 'Actions does not exist'})
    })
    .catch(next)
    })
    
    router.use((err, req, res, next) => { //eslint-disable-line
        res.status(err.status || 500).json({
          customMessage: 'something tragic inside posts router happened',
          message: err.message,
          stack: err.stack,
        })
      })


module.exports = router;