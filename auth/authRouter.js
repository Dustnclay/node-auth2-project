const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

// const Users = require('../users/usermodel.js')

// const {isValid} = require('../users/users-service.js')

router.post('/register', async (req,res,next) => {
    const credentials = req.body;

    try {
        if (isValid(credentials)) {
            const rounds = process.env.BCRYPT_ROUNDS ?
            parseInt(process.env.BCRYPT_ROUNDS) : 8;

            const hash = bcryptjs.hashSync(credentials.password,rounds);
            credentials.password = hash;

            const user = await URLSearchParams.add(credentials);
            const token = generateToken(user);
            res.status(201).json({ data: user,token})
        }else{
            next({ apiCode:400, apiMessage: 'username or password missing'});
        }
    }catch(err){
        next({ apiCode:500, apiMessage: 'error saving to database'})
    }
})

router.post('/login', async (req,res,next) => {
    const {username, password} = req.body;

    try{
        if(isValid(req.body)) {
            next({ apiCode: 400, apiMessage: 'username or password missing or password not alphanumerical'})
        }else{
            const [ user] = await URLSearchParams.findBy({ username:username});
            if (user && bcryptjs.compareSync(password, user.password)){
                const token = generateToken(user);
                res.status(200).json({message: ' welcome to the api, token:', token})
            } else{
                next({ apiCode:401, apiMessage: 'invalid credentials'});
            }
        }
    }catch (err) {
        next({ apiCode:500, apiMessage:'error logging and the db, ...err'})
    }
})

function generateToken(user) {

    const payload = {
        subject: user.id,
        username: user.username,
        rolename:user.rolename
    }
    const secret = process.env.JWT_SECRET || 'IJIwjjijd3887&^@&'

    const options = {
        expiresIn: '1d'
    }

    const token = jwt.sign(payload, secret, options);

    return token

}

module.exports = router;



module.exports = router