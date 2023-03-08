const Category = require('../models/category');

module.exports = {

    create(req, res) {

        const category = req.body;

        Category.create(category, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La categoria se creo correctamente',
                data: `${id}` // EL ID DE LA NUEVA CATEGORIA
            });

        });

    },

    getAll(req, res) {
        Category.getAll((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las categorias',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    delete(req, res) {

        const category = req.body;

        Category.delete(category, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el borrado de la categoria',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La categoria se elimino correctamente',
           //     data: `${id}` // EL ID DE LA NUEVA CATEGORIA
            });

        });
    },

    update(req, res) {

        const category = req.body;

        Category.update(category, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualizacion de la categoria',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La categoria se actualizo correctamente',
                data: `${id}` // EL ID DE LA NUEVA CATEGORIA
            });

        });

    },
}