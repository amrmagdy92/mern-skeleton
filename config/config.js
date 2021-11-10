const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.port || 3000,
    jwtSecret: process.env.JWT_SECRET || "SECRET_KEY",
    expire: process.env.JWT_EXPIRE || "24h",
    mongoUri: process.env.MONGODB_URI || `mongodb://${process.env.IP || 'localhost'}:${process.env.MONGO_PORT || '27017'}/${process.env.MERN_PROJECT || 'MERN'}`
}

export default config;