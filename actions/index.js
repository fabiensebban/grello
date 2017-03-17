module.exports = (server) => {
    server.actions = {
        users: require('./users')(server),
        todos: require('./todos')(server),
        teams: require('./teams')(server),
        projects: require('./projects')(server),
        auth: require('./auth')(server)
    }
};