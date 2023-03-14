const env = {
    //production: false,
    id_developer: 0,

    PORT: process.env.PORT || 3000,

    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '3306',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_NAME: process.env.DB_NAME || 'transportes_evangelio',
};

module.exports = env;