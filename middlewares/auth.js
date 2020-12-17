//Middleware de autenticacion;
const tokenServices = require('../services/token');

module.exports = {
    verifyUsuario: async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenServices.decode(req.headers.token);
        if (response.rol == 'Administrador' || response.rol == 'Vendedor' || response.rol == 'Almacenero') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },

    verificarAdministrador: async(req, res, next) => {

        if(!req.headers.token)
        {
            return res.status(404).send({
                message: 'No hay token'
            });
        }
        else
        {
            const respuesta = await tokenServices.decode(req.headers.token);

            if(respuesta.rol === "Administrador")
            {
                next();
            }
            else
            {
                return res.status(403).send({
                    message: 'Usuario no autorizado'
                });
            }

        }

    },

    verificarVendedor: async(req, res, next) => {

        if(!req.headers.token)
        {
            return res.status(404).send({
                message: 'No hay token'
            });
        }
        else
        {
            try{
                const respuesta = await tokenServices.decode(req.headers.token);

                if(respuesta.rol === "Vendedor" || respuesta.rol === "Administrador")
                {
                    next();
                }
                else
                {
                    return res.status(403).send({
                        message: "Usuario no autorizado"
                    });
                }
            } catch (error){
                
            }

        }
        
    }

}