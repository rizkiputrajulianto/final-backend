const jwt = require("jsonwebtoken");

const createJWT = (user) => {
    delete user.dataValues.password;
    const token = jwt.sign({user: user.dataValues}, "private-key-user", {expiresIn: "24h"});
    return token;
};

const checkJwt = (req, res, next) => {
    const token = req.get("Authorization");
    if(!token) return res.status(401).json({msg:"Unauthorize"})
    else {
        jwt.verify(token, "private-key-classroom", (err, decode) => {
            if(err) return res.status(401).json({msg: error.toString})
            else{
                req.auth = decode.user;
                next();
            }
        })
    }
}
module.exports = {createJWT, checkJwt}

//belom kelar, butuh nonton record pas review dlu baru dikelarin