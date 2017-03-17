const Router = require('express').Router;

module.exports = (server) => {
    let router = new Router();

    router.post('/',
        server.middlewares.ensureAuthenticated

    );

    router.get('/',
        server.middlewares.ensureAuthenticated
    );

    router.get('/:id',
        server.middlewares.ensureAuthenticated
    );

    router.put('/',
        server.middlewares.ensureAuthenticated
    );

    router.delete('/:id',
        server.middlewares.ensureAuthenticated
    );

    return router;
};