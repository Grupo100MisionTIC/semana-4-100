const jwt = require('jsonwebtoken');
const models = require('../models');

const checkToken = (token) => {
    let localID = null;
}

module.exports = {
    //Recibe un usuario
    encode: (user) => {
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol,
            status: user.estado
        }, 'config.secret', {
            expiresIn: 86400,
        });

        return token;
        
    },
    //Recibe el token
    decode: async (token) => {

        try {
            //Campos únicos del usuario, el id o el email. Se hace la decodificación
            //config.secret es la frase secreta
            //Verifica si el token tiene el campo id y devuelve el id
            const {id} = await jwt.verify(token, 'config.secret' );

                //Aquí consulta a la base de datos si el usuario existe
                const user = await models.Usuario.findOne({where: {
                    id: id,
                    estado: 1
                }});
               
                //Si el usuario existe retorna el user
                if(user)
                {
                    return user;
                }
                else
                {
                    return false;
                }

        } catch (error) {
/*             const newToken = await checkToken(token);
            return newToken;  */

            return error;
        }

    }
}