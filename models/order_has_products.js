const db = require('../config/config');
const Order = require('./order');

const OrderHasProducts = {};



OrderHasProducts.create = (id_order, id_product, quantity, exit_at,result) => {

    const sql = `
    INSERT INTO
        order_has_products(
            id_order,
            id_product,
            quantity,
            exit_at,
            created_at,
            updated_at   
        )
    VALUES(?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            id_order,
            id_product,
            quantity,
            exit_at,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nueva order_has_products:', res.insertId);
                result(null, res.insertId);
            }
        }

    )
}

OrderHasProducts.getSalesFromProductAt = (exit_at, id_product, result) => {
    const sql = `
    SELECT COALESCE(SUM(quantity),0) as sales 
    FROM order_has_products where exit_at = ? &&
    id_product = ?
    `;

    db.query(
        sql,
        [
            exit_at,
            id_product
        ],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    )
}


OrderHasProducts.getAllSalesFrom = (date1, date2, result) => {
    const sql = `
    SELECT 
        P.name as product,
              P.price as price,
                SUM(OHP.quantity) as sales,
                SUM(OHP.quantity * P.price) as total
    FROM 
        orders AS O
    INNER JOIN
        order_has_products AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        products AS P
    ON
        P.id = OHP.id_product
    WHERE 
		OHP.created_at
        BETWEEN ? AND ?
    GROUP BY
        P.name
    `;
//2023-03-01 00:00:00
    db.query(
        sql,
        [
            date1,
            date2
        ],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    )
}




module.exports = OrderHasProducts;