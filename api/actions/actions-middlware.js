const Actions = require('./actions-model')

function returnsActions (req, res, next) {
    res.status(404).json({
        message: 'no actions found'
    })
   }

   async function checkActionsId (req, res, next) {
    try {
        const actions = await Actions.get(req.params.id)
        if(!actions) {
            res.status(404).json({
                message: 'no such action'
            })
        } else {
            req.actions = actions
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'problem finding actions'
        })
    }
}   


function validateActions(req, res, next) {
const {text} =req.body
if (!text || !text.trim()) {
    res.status(400).json({
        message: "missing required field"
    })
} else {
    req.text = text.trim()
    next()
    }
}

module.exports = {
    returnsActions,
    checkActionsId,
    validateActions
}   
