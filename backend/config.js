module.exports = {
    port: process.env.POST || 3001,
    db: process.env.MONGODB || 'mongodb://localhost:27017/almundo'
}
