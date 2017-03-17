module.exports = (server) => {
    const Todo = server.models.Todo;
    const User = server.models.User;
    const Project = server.models.Project;

    return {
        create,
        list,
        show,
        update,
        remove,
        assign: require('./assign')(server)
    };

    function create(req, res, next) {
        let user = null;
        /*
        # Une tache doit obligatoirement être associée à un projet.
        # Une tache ne peut être créée que par le créateur du projet ou un
          membre de l'équipe associée au projet.
        */

        /*
            findUser(req.user.id)
          .then(server.utils.ensureOne)
          .catch(server.utils.reject(403, 'invalid.user'))
        */
        
        return User.findById(req.user.id)
                    .then(server.utils.ensureOne)
                    .catch(res.status(404).send('user.not.found'))
                    .then(findAndVerifyProject)
                    .then(persist)
                    .then(res.commit)
                    .catch(res.error);

        function findAndVerifyProject() {

            Project.findById(req.body.projectId)
                    .then(server.utils.ensureOne)
                    .catch(res.status(403).send('user.is.not.project.owner'))
                    .then(isProjectOwner)
                    .catch(res.status(403).send('user.is.not.project.owner'));

            function isProjectOwner(project) {
              console.log(project.owner, req.user.id);
              return null;
              if (req.user.id == project.owner) {
                return project;
              }
                return Promise.reject(res.status(403).send('user.is.not.project.owner'));
            }
        }

        function createAndAssignTodo(project) {
            let todo = new Todo(req.body);
            todo.project = project.id;
            todo.creator = req.user.id;

            return todo;
        }

        function persist(todo) {
            return todo.save()
                .then(returnTodo);

            function returnTodo() {
                return todo;
            }
        }
    }

    function list(req, res, next) {
        setTimeout(() => {
            Todo.find()
                .then(setCache)
                .then(res.commit)
                .catch(res.error);
        }, 3000);

        function setCache(todos) {
            server.cache.set({
                group: 'todos',
                key: req.originalUrl,
                value: todos
            });
            return todos;
        }
    }

    function show(req, res, next) {
        Todo.findById(req.params.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'todo.not.found'))
            .then(res.commit)
            .catch(res.error);
    }

    function update(req, res, next) {
        Todo.findByIdAndUpdate(req.body.id, req.body)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'todo.not.found'))
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }

    function remove(req, res, next) {
        Todo.findByIdAndRemove(req.params.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'todo.not.found'))
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }
};
