const Router = require('express').Router;

module.exports = (server) => {
    let router = new Router();

    router.post('/',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureRights('projects.create'),
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureFields('name'),
        server.actions.todos.create
    );

    router.get('/',
      server.actions.projects.list
    );

    router.get('/:id',
      server.middlewares.ensureAuthenticated,
      server.actions.projects.show
    );

    router.put('/',
      server.middlewares.ensureAuthenticated,
      server.middlewares.bodyParser.json(),
      server.actions.todos.update);

    router.delete('/:id',
      server.middlewares.ensureAuthenticated,
      server.actions.todos.remove
    );

    

    return router;
};
