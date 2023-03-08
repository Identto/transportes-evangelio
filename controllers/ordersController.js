const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');
const User = require('../models/user');
const PushNotificationsController = require('../controllers/pushNotificationsController');

module.exports = {

    findByStatus(req, res) {
        const status = req.params.status;
        const date1 = req.params.date1;
        const date2 = req.params.date2;

        Order.findByStatus(status, date1, date2, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }

            for (const d of data) {
                //         d.address = JSON.parse(d.address);
                d.client = JSON.parse(d.client);
                d.driver = JSON.parse(d.driver);
                d.products = JSON.parse(d.products);
            }


            return res.status(201).json(data);
        });
    },

    findByDriverAndStatus(req, res) {
        const id_driver = req.params.id_driver;
        const status = req.params.status;
        const date1 = req.params.date1;
        const date2 = req.params.date2;


        Order.findByDriverAndStatus(id_driver,date1, date2, status, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }

            for (const d of data) {
                //    d.address = JSON.parse(d.address);
                d.client = JSON.parse(d.client);
                d.driver = JSON.parse(d.driver);
                d.products = JSON.parse(d.products);
            }


            return res.status(201).json(data);
        });
    },

    findByClientAndStatus(req, res) {
        const id_client = req.params.id_client;
        const status = req.params.status;
        const date1 = req.params.date1;
        const date2 = req.params.date2;

        Order.findByClientAndStatus(id_client, date1, date2, status, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }

            for (const d of data) {
                //       d.address = JSON.parse(d.address);
                d.client = JSON.parse(d.client);
                d.driver = JSON.parse(d.driver);
                d.products = JSON.parse(d.products);
            }


            return res.status(201).json(data);
        });
    },

    getTotalSalesFromProductAt(req, res) {
        const exit_at = req.params.exit_at;
        const id_product = req.params.id_product;

        OrderHasProducts.getSalesFromProductAt(exit_at, id_product, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }
            return res.status(201).json(data);
        });
    },

    getTotalSalesFromAt(req, res) {
        const date1 = req.params.date1;
        const date2 = req.params.date2;

        OrderHasProducts.getAllSalesFrom(date1, date2, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }
            return res.status(201).json(data);
        });
    },
    

    async create(req, res) {

        const order = req.body;

        Order.create(order, async (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de crear la orden',
                    error: err
                });
            }

            for (const product of order.products) {
                await OrderHasProducts.create(id, product.id, product.quantity, (err, id_data) => {
                    if (err) {
                        return res.status(501).json({
                            success: false,
                            message: 'Hubo un error con la creacion de los productos en la orden',
                            error: err
                        });
                    }
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se ha creado correctamente',
                data: `${id}` // EL ID DE LA NUEVA CATEGORIA
            });

        });

    },

    updateToDispatched(req, res) {
        const order = req.body;

        Order.updateToDispatched(order.id, order.id_driver, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar la orden',
                    error: err
                });
            }

            User.findById(order.id_driver, (err, user) => {

                if (user !== undefined && user !== null) {

                    console.log('NOTIFICATION TOKEN', user.notification_token);
                    PushNotificationsController.sendNotification(user.notification_token, {
                        title: 'PEDIDO ASIGNADO',
                        body: 'Te han asignado un pedido para entregar',
                        id_notification: '1'
                    });
                }

            });

            return res.status(201).json({
                success: true,
                message: 'La orden se ha actualizado correctamente',
                data: `${id_order}` // EL ID 
            });

        });
    },

    updateToOnTheWay(req, res) {
        const order = req.body;


        Order.updateToOnTheWay(order.id, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se ha actualizado correctamente',
                data: `${id_order}` // EL ID 
            });

        });
    },

    updateToDelivered(req, res) {
        const order = req.body;

        Order.updateToDelivered(order.id, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se ha actualizado correctamente',
                data: `${id_order}` // EL ID 
            });

        });
    },

    updateLatLng(req, res) {
        const order = req.body;

        Order.updateLatLng(order, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se ha actualizado correctamente',
                data: `${id_order}` // EL ID 
            });

        });
    }

}