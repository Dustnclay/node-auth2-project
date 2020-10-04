const jwt = require('jsonwebtoken')
const secret ='IJIwjjijd3887&^@&';

module.exports = (req,res,next) => {
        console.log('token',req.headers.authorization)
        // console.log('req.headers', req.headers)
           try {
 const token =  req.headers.authorization?
        req.headers.authorization.split(' ')[1]:
        '';

        if(token) {
            console.log('toke,secret', token,secret)
            jwt.verify(token, secret, (err,decodedToken) =>{
                if(err) {
                    next({ apiCode: 401, apiMessage:'invalid or missing creds'})
                }else {
                    req.decodedToken = decodedToken;
                    next()
                }
            })
        }else{
            next({ apiCode: 401, apiMessage: 'token not valid'})
        }
    }catch(err) {
        next({ apiCode:500, apiMessage:'error validating creds',...err})
    }
}