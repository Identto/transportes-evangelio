const db = require('../config/config');

const Category = {};

Category.getAll = (result) => {
    const sql = `
    SELECT
        CONVERT(id, char) AS id,
        name,
        description
    FROM
        categories
    ORDER BY
        name
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Categorias:', data);
                result(null, data);
            }
        }
    )
}

Category.create = (category, result) => {

    const sql = `
    INSERT INTO
        categories(
            name,
            description,
            created_at,
            updated_at   
        )
    VALUES(?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            category.name,
            category.description,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nueva categoria:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}

Category.delete = (category, result) => {

    const sql = `
    DELETE FROM
        categories
        WHERE id = ?
    `;

    db.query(
        sql, 
        [
            category.id,
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Categoria eliminada:', category.id);
                result(null, category.id);
            }
        }

    )

}

Category.update = (category, result) => {
    const sql = `
    UPDATE
    categories
    SET
        description = ?,
        name = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            category.description,
            category.name,
            new Date(),
            category.id,
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, category.id);
            }
        }
    )
}



module.exports = Category;