const db = require('../config/config');

const Order = {};

Order.findByStatus = (status,date1,date2, result) => {

    const sql = `
    SELECT
        CONVERT(O.id, char) AS id,
        CONVERT(O.id_client, char) AS id_client,
        CONVERT(O.id_driver, char) AS id_driver,
        O.status,
        O.timestamp,
        O.lat,
        O.lng,
        O.exit_at,
        JSON_OBJECT(
            'id', CONVERT(U.id, char),
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image,
            'phone', U.phone
        ) AS client,
        JSON_OBJECT(
            'id', CONVERT(U2.id, char),
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image,
            'phone', U2.phone
        ) AS driver,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(P.id, char),
                'name', P.name,
                'description', P.description,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'price', P.price,
                'quantity', OHP.quantity,
                'exitDate', OHP.exit_at
            )
        ) AS products
    FROM 
        orders AS O
    INNER JOIN
        users AS U
    ON
        U.id = O.id_client
	LEFT JOIN
		users AS U2
	ON
		U2.id = O.id_driver
    INNER JOIN
        order_has_products AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        products AS P
    ON
        P.id = OHP.id_product
    WHERE 
        status = ?
        ` + (date1!='NODATA' && date2 != 'NODATA'? `AND  OHP.created_at
        BETWEEN ? AND ?
        ` : '') + `
    GROUP BY
        O.id
	ORDER BY
		O.timestamp DESC;
    `;

    db.query(
        sql,
        [
            status,
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

Order.findByDriverAndStatus = (id_driver,date1, date2, status, result) => {

    const sql = `
    SELECT
        CONVERT(O.id, char) AS id,
        CONVERT(O.id_client, char) AS id_client,
        CONVERT(O.id_driver, char) AS id_driver,
        O.status,
        O.timestamp,
        O.lat,
        O.lng,
        O.exit_at,
        JSON_OBJECT(
            'id', CONVERT(U.id, char),
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image,
            'phone', U.phone
        ) AS client,
        JSON_OBJECT(
            'id', CONVERT(U2.id, char),
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image,
            'phone', U2.phone
        ) AS driver,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(P.id, char),
                'name', P.name,
                'description', P.description,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'price', P.price,
                'quantity', OHP.quantity,
                'exitDate', OHP.exit_at
            )
        ) AS products
    FROM 
        orders AS O
    INNER JOIN
        users AS U
    ON
        U.id = O.id_client
	LEFT JOIN
		users AS U2
	ON
		U2.id = O.id_driver
    INNER JOIN
        order_has_products AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        products AS P
    ON
        P.id = OHP.id_product
    WHERE 
        O.id_driver = ? AND O.status = ?
        ` + (date1!='NODATA' && date2 != 'NODATA'? `AND  OHP.created_at
        BETWEEN ? AND ?
        ` : '') + `
    GROUP BY
        O.id
	ORDER BY
		O.timestamp DESC;
    `;

    db.query(
        sql,
        [
            id_driver,
            status,
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

Order.findByClientAndStatus = (id_client, date1, date2, status, result) => {
    
    if(status == "HISTORIAL"){
        const sql = `
        SELECT
        CONVERT(O.id, char) AS id,
        CONVERT(O.id_client, char) AS id_client,
        CONVERT(O.id_driver, char) AS id_driver,
        O.status,
        O.timestamp,
        O.lat,
        O.lng,
        O.exit_at,
        JSON_OBJECT(
        'id', CONVERT(U.id, char),
        'name', U.name,
        'lastname', U.lastname,
        'image', U.image,
        'phone', U.phone
        ) AS client,
        JSON_OBJECT(
        'id', CONVERT(U2.id, char),
        'name', U2.name,
        'lastname', U2.lastname,
        'image', U2.image,
        'phone', U2.phone
        ) AS driver,
        JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', CONVERT(P.id, char),
            'name', P.name,
            'description', P.description,
            'image1', P.image1,
            'image2', P.image2,
            'image3', P.image3,
            'price', P.price,
            'quantity', OHP.quantity,
            'exitDate', OHP.exit_at
        )
        ) AS products
        FROM 
        orders AS O
        INNER JOIN
        users AS U
        ON
        U.id = O.id_client
        LEFT JOIN
        users AS U2
        ON
        U2.id = O.id_driver
        INNER JOIN
        order_has_products AS OHP
        ON
        OHP.id_order = O.id
        INNER JOIN
        products AS P
        ON
        P.id = OHP.id_product
        WHERE 
        O.id_client = ? ` + (date1!='NODATA' && date2 != 'NODATA'? `AND  OHP.created_at
        BETWEEN ? AND ?
        ` : '') + `
        GROUP BY
        O.id
        ORDER BY
        O.timestamp DESC;
        `;

        db.query(
            sql,
            [
                id_client,
                date1,
                date2,
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
    } else{
        const sql = `
        SELECT
        CONVERT(O.id, char) AS id,
        CONVERT(O.id_client, char) AS id_client,
        CONVERT(O.id_driver, char) AS id_driver,
        O.status,
        O.timestamp,
        O.lat,
        O.lng,
        O.exit_at,
        JSON_OBJECT(
        'id', CONVERT(U.id, char),
        'name', U.name,
        'lastname', U.lastname,
        'image', U.image,
        'phone', U.phone
        ) AS client,
        JSON_OBJECT(
        'id', CONVERT(U2.id, char),
        'name', U2.name,
        'lastname', U2.lastname,
        'image', U2.image,
        'phone', U2.phone
        ) AS driver,
        JSON_ARRAYAGG(
        JSON_OBJECT(
        'id', CONVERT(P.id, char),
        'name', P.name,
        'description', P.description,
        'image1', P.image1,
        'image2', P.image2,
        'image3', P.image3,
        'price', P.price,
        'quantity', OHP.quantity,
        'exitDate', OHP.exit_at
        )
        ) AS products
        FROM 
        orders AS O
        INNER JOIN
        users AS U
        ON
        U.id = O.id_client
        LEFT JOIN
        users AS U2
        ON
        U2.id = O.id_driver
        INNER JOIN
        order_has_products AS OHP
        ON
        OHP.id_order = O.id
        INNER JOIN
        products AS P
        ON
        P.id = OHP.id_product
        WHERE 
        O.id_client = ? AND O.status = ? `
        + (date1!='.' && date2 != '.'? `AND  OHP.created_at
        BETWEEN ? AND ?
        ` : '') + `
        GROUP BY
        O.id
        ORDER BY
        O.timestamp DESC;
        `;

        db.query(
            sql,
            [
                id_client,
                status,
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

}

Order.create = (order, result) => {

    const sql = `
    INSERT INTO
        orders(
            id_client,
            status,
            timestamp,
            exit_at,
            created_at,
            updated_at   
        )
    VALUES(?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            order.id_client,
            'PAGADO', // 1. PAGADO 2. DESPACHADO 3. EN CAMINO 4. ENTREGADO
            Date.now(),
            order.exit_at,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nueva orden:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}

Order.updateToDispatched = (id_order, id_driver, result) => {
    const sql = `
    UPDATE
        orders
    SET
        id_driver = ?,
        status = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            id_driver,
            'DESPACHADO',
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, id_order);
            }
        }
    )
}

Order.updateToOnTheWay = (id_order, result) => {
    const sql = `
    UPDATE
        orders
    SET
        status = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            'EN CAMINO',
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, id_order);
            }
        }
    )
}

Order.updateToDelivered = (id_order, result) => {
    const sql = `
    UPDATE
        orders
    SET
        status = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            'ENTREGADO',
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, id_order);
            }
        }
    )
}

Order.updateLatLng = (order, result) => {
    const sql = `
    UPDATE
        orders
    SET
        lat = ?,
        lng = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            order.lat,
            order.lng,
            new Date(),
            order.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, order.id);
            }
        }
    )
}

module.exports = Order;