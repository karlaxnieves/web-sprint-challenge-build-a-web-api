const Projects = require('../projects/projects-model')

function returnsProjects (req, res, next) {
 res.status(404).json({
     message: 'no projects found'
 })
}

async function checkProjectsId (req, res, next) {
    try {
        const projects = await Projects.get(req.params.id)
        if(!projects) {
            res.status(404).json({
                message: 'no such project'
            })
        } else {
            req.projects = projects
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'problem finding projects'
        })
    }
}

function validateProjects(req, res, next) {
    const {name, description} = req.body 
    if (!name || !description) {
        res.status(400).json({
            message: 'missing required fields'
        })
    } else {
        next()
    }
}



module.exports = {
    returnsProjects,
    checkProjectsId,
    validateProjects
}
