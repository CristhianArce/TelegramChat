const config = {
    'dbUrl': process.env.DB_URL || "mongodb://localhost:27017/telegrom-improve",
    'port': process.env.PORT || "3000",
};

module.exports = config;