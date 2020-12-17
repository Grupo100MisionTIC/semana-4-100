const db = require('../models');
const bcrypt = require('bcryptjs');
const tokenServices = require('../services/token.js');

exports.login = async (req, res, next) => {
    try{
        const user = await db.Usuario.findOne({where: {email: req.body.email}});

        if(user)
        {
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if(passwordIsValid)
            {
                //Hace el llamado del método enconde que está en el archivo token.js
                const token = tokenServices.encode(user);
                res.status(200).send({
                    auth: true,
                    tokenReturn: token,
                    user: user
                });
            }
            else
            {
                res.status(401).send({ auth: false, tokenReturn: null, reason: "Invalid Password!"});
            }
        }
        else
        {
            res.status(404).send('User Not Found.');
        }

    } catch (error) {

        res.status(500).send({
            message: 'Error ->'
        })
        next(error);
    }
}

exports.list = async (req, res, next) => {

    try {

        const users = await db.Usuario.findAll({
            attributes: ["nombre", "email", "rol"]
        });

        if(users)
        {
            res.status(200).json(users);
        }
        else
        {
            res.status(404).send({
                message: 'No hay usuarios registrados'
            })
        }
        
    } catch (err) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(err);
    }
}

exports.register = async (req, res, next) => {

    try {

        let user = await db.Usuario.findOne({where: {email: req.body.email}});

        if(!user)
        {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user = await db.Usuario.create(req.body);
            res.status(200).json(user)
        }
        else
        {
            res.status(404).send({
                message: 'El usuario ya existe.'
            })
        }
        
    } catch (err) {

        res.status(500).send({
            message: 'Error ->'
        })
        next(err);
    }
}

exports.update = async (req, res, next) => {
    try {

        const usuario = await db.Usuario.findOne({where: {email: req.body.email}});

        if(Usuario)
        {
            const Usuario = await db.Usuario.update({password: req.body.password, rol: req.body.rol, nombre: req.body.nombre}, {
                where: {
                    email: req.body.email
                }
            });
            res.status(200).json(Usuario)
        }
        else
        {
            res.status(404).send({
                message: 'El usuario no existe.'
            })
        }
        
    } catch (err) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(err);
    }
}
