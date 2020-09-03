const jwt = require('jsonwebtoken');
const _ = require('lodash');

module.exports = async (req,res,next) => {
    const jwtKey = 'jwtKey';
    const authToken = req.cookies['x-cookie-auth'];
    
    if(authToken) {
        try {
            const decoded = jwt.verify(authToken,jwtKey);  
            req.user = _.pick(decoded,['_id','name','email']);   
            console.log('verified with cookie');
            
            next();
        }
        catch(ex){
            return res.status(400).send('Bad Request');
        }
    }
    next();
}