const db = require('../models');

exports.list = async (req, res, next) => {

    try{

        const articulos = await db.Articulo.findAll({
            attributes: ["codigo", "nombre", "descripcion"],
            include: [
                {
                    model: db.Categoria,
                    as: 'categoria',
                    attributes: ["nombre", "descripcion"]
                },
            ]
        });

        if(articulos)
        {
            res.status(200).json(articulos);
        }
        else
        {
            res.status(404).send({
                message: 'No hay artículos existentes'
            });
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

        let articulo = await db.Articulo.findOne({where: {codigo: req.body.codigo}});

        if(!articulo)
        {
            const articulo = await db.Articulo.create(req.body);
            res.status(200).json(articulo)
        }
        else
        {
            res.status(404).send({
                message: 'El artículo ya existe.'
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

        /*const articulo = await db.Articulo.findOne({where: {codigo: req.body.codigo}});

        if(articulo)
        {*/
            const articulo = await db.Articulo.update({codigo: req.body.codigo, nombre: req.body.nombre, descripcion: req.body.descripcion, categoriaId:req.body.categoriaId}, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json(articulo)
        /*}
        else
        {
            res.status(404).send({
                message: 'El artículo no existe.'
            })
        }*/
        
    } catch (err) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(err);
    }
}

exports.activate = async (req, res, next) => {
    try {

        /*const articulo = await db.Articulo.findOne({where: {codigo: req.body.codigo}});

        if(articulo)
        {*/
            const articulo = await db.Articulo.update({estado: 1}, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json(articulo)
        /*}
        else
        {
            res.status(404).send({
                message: 'El artículo no existe.'
            })
        }*/
        
    } catch (err) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(err);
    }
}

exports.deactivate = async (req, res, next) => {
    try {

        /*const articulo = await db.Articulo.findOne({where: {codigo: req.body.codigo}});

        if(articulo)
        {*/
            const articulo = await db.Articulo.update({estado: 0}, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json(articulo)
        /*}
        else
        {
            res.status(404).send({
                message: 'El artículo no existe.'
            })
        }*/
        
    } catch (err) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(err);
    }
}