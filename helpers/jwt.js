const jwt = require('jsonwebtoken')

//Generar un token y configurarle para que sirva unicamente 2 horas
const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '2h',
            },
        (err, token) =>{
            err ? (console.log(err),reject('Error intentelo de nuevo')) : resolve(token)
        }   
        )
    })
}
module.exports ={
    generarJWT,
}