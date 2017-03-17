const Router = require('express').Router;

module.exports = (server) => {
    let router = new Router();

    router.post('/:idProject',
        server.middlewares.ensureAuthenticated,
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureFields(['name']),
        server.actions.teams.create

    );

    router.get('/',
        server.middlewares.ensureAuthenticated,
        server.actions.teams.list
    );

    router.get('/:id',
        server.middlewares.ensureAuthenticated,
        server.actions.teams.show
    );

    router.put('/',
        server.middlewares.ensureAuthenticated,
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureFields(['id', 'name']),
        server.actions.teams.update
    );

    router.delete('/:id',
        server.middlewares.ensureAuthenticated,
        server.actions.teams.remove
    );

    router.get('/:id/members/',
        server.middlewares.ensureAuthenticated,
        server.actions.teams.listMember
    );

    router.get('/:id/members/:memberId',
        server.middlewares.ensureAuthenticated,
        server.actions.teams.showMember
    );

    router.post('/:id/members/:idUser',
        server.middlewares.ensureAuthenticated,
        server.actions.teams.createMember
    );

    return router;
};