const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const Users = require('../users/users-model')

const {isValid} = require('../users/users-service.js')

router.post('/register', async (req,res,next) => {
    const credentials = req.body;
    // console.log('authRouther register1:',credentials)
    try {
        if (isValid(credentials)) {
            const rounds = 8;
            // console.log('rounds',rounds)
            const hash = bcryptjs.hashSync(credentials.password,rounds);
            credentials.password = hash;
            // console.log('authRouter2:',credentials)

            const user = await Users.add(credentials);
            console.log('user:', user)
            const token = generateToken(user);
            res.status(201).json({ data: user,token})
        }else{
            next({ apiCode:400, apiMessage: 'username or password missing'});
        }
    }catch(err){
        next({ apiCode:500, apiMessage: 'error with authrouter saving to database'})
    }
})

router.post('/login', async (req,res,next) => {
    const {username, password} = req.body;
    console.log('user', req.body)

    try{
        if(!isValid(req.body)) {
            next({ apiCode: 400, apiMessage: 'username or password missing or password not alphanumerical'})
        }else{
            const [user] = await Users.findBy({ username:username});
            if (user && bcryptjs.compareSync(password, user.password)){
                const token = generateToken(user);
                res.status(200).json({message: ' welcome to the api, token:', token})
            } else{
                next({ apiCode:401, apiMessage: 'invalid credentials'});
            }
        }
    }catch (err) {
        next({ apiCode:500, apiMessage:'error logging and the db', ...err})
    }
})

function generateToken(user) {

    const payload = {
        subject:user.id,
        username:user.username,
        rolename:user.rolename
    }
    const secret ='IJIwjjijd3887&^@&'

    const options = {
        expiresIn: '1d'
    }

    const token = jwt.sign(payload, secret, options);

    return token
}

module.exports = router;
