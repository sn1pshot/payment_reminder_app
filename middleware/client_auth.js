require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.verifyClientToken = (req,res,next) => {
  const token = req.cookies.access_token;
  console.log(req.cookies);
    if (token==null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
        if(err){
            console.log(err);
            return res.sendStatus(403);
        }

        req.client_id=decoded.client_id;
        req.client_email=decoded.client_email;

        next();
    })
}
