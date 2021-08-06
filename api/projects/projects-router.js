const express = require('express')
const {checkProjectsId, validateProjects} = require('./projects-middleware')
const Projects = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(next)
})

router.get('/:id', checkProjectsId, (req, res, next) => {
    res.json(req.projects)
    })
    
    router.post('/', (req, res, next) => {
    Projects.insert(req.body)
    .then(projects => {
        res.status(201).json(projects)
    })
    .catch(
        next()
    )
    })
    
    router.put('/:id', checkProjectsId, validateProjects, (req, res, next) => {
    Projects.update(req.params.id, {name: req.name})
    .then(() => {
        return Projects.getById(req.params.id)
    })
    .then(projects =>{
        res.json(projects)
    })
    .catch(err =>{
        next(err)
    })
    })
    
    router.delete('/:id', checkProjectsId, (req, res, next) => {
    Projects.remove(req.params.id)
    .then(() => {
        res.status(200).json({message: 'Project doe snot exist'})
    })
    .catch(next)
    })
    
    router.get('/:id/actions', async (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err =>{
        next(err)
    })
    })
    
    router.use((err, req, res, next) => { //eslint-disable-line
        res.status(err.status || 500).json({
          customMessage: 'something tragic inside posts router happened',
          message: err.message,
          stack: err.stack,
        })
      })

module.exports = router;
