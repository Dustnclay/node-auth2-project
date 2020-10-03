const router = require('express').Router()

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware')
const checkRole = require('../auth/check-role-middleware');

router.get('/', restricted, async (req,res,next) => {
    try{
        const users = await Users.find();
        res.status(200).json(users);
    }catch(err) {
        next({ apiCode:500, apiMessage: ' db error getting users', ...err})
    }
})

router.delete('/:id', restricted, checkRole('admin'), (req,res) => {
    try {
        res.status(501).json({ message:'not implemented'})
    }catch(err) {
        next({ apiCode:500, apiMessage:'error deleting user', ...err})
    }
}
)

router.post('/', restricted, checkRole('admin'), (req,res) => {
    try {
        res.status(501).json({ message:'not implemented'})
    }catch(err) {
        next({ apiCode:500, apiMessage:'error adding user', ...err})
    }
}
)

router.put('/:id', restricted, checkRole('admin'), (req,res) => {
    try {
        res.status(501).json({ message:'not implemented'})
    }catch(err) {
        next({ apiCode:500, apiMessage:'error editing user', ...err})
    }
}
)

module.exports = router