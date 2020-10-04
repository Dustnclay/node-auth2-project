module.exports = function (role) {
    return function (req,res,next) {
        if(req.decodedToken && req.decodedToken.rolename && req.decodedToken.rolename === role){
            next();
        }else {
            res.status(403).json({ message: 'not authorized for that request'})
        }
    }
}