const db = require('../models');

exports.list = async (req, res, next) => {

    try {

        const categorias = await db.Categoria.findAll();

        if(categorias)
        {
            res.status(200).json(categorias);
        }
        else
        {
            res.status(404).send({
                message: 'No hay categorías existentes'
            })
        }        
        
    } catch (err) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(err);
    }
}

exports.add = async (req, res, next) => {

    try {

        let categoria = await db.Categoria.findOne({where: {nombre: req.body.nombre}});

        if(!categoria)
        {
            const categoria = await db.Categoria.create(req.body);
            res.status(200).json(categoria)
        }
        else
        {
            res.status(404).send({
                message: 'La categoría ya existe.'
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

        const categoria = await db.Categoria.findOne({where: {nombre: req.body.nombre}});

        if(categoria)
        {
            const categoria = await db.Categoria.update({nombre: req.body.nombre, descripcion: req.body.descripcion}, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json(categoria)
        }
        else
        {
            res.status(404).send({
                message: 'La categoría no existe.'
            })
        }
        
    } catch (err) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(err);
    }
}

exports.activate = async (req, res, next) => {
    try {

        const categoria = await db.Categoria.findOne({where: {nombre: req.body.nombre}});

        if(categoria)
        {
            const categoria = await db.Categoria.update({estado: 1}, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json(categoria)
        }
        else
        {
            res.status(404).send({
                message: 'La categoría no existe.'
            })
        }
        
    } catch (err) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(err);
    }
}

exports.deactivate = async (req, res, next) => {
    try {

        const categoria = await db.Categoria.findOne({where: {nombre: req.body.nombre}});

        if(categoria)
        {
            const categoria = await db.Categoria.update({estado: 0}, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json(categoria)
        }
        else
        {
            res.status(404).send({
                message: 'La categoría no existe.'
            })
        }
        
    } catch (err) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(err);
    }
}