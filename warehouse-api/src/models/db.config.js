module.exports = {
    HOST: "172.21.0.10",
    USER: "warehouse",
    PASSWORD: "warehouse",
    DB: "warehouse",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};