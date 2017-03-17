module.exports = (server) => {
    const Project = server.models.Project;
    const User = server.models.User;

    return {
        create,
        list,
        show,
        update,
        remove
    }

    function create(req, res, next) => {
      let user = null;
      return User.findById(req.user.id)
          .then(server.utils.ensureOne)
          .catch(server.utils.reject(403, 'invalid.user'))
          .then(createProject)
          .then(setCreator)
          .then(persist)
          .then(res.commit)
          .catch(res.error);


        function createProject(data) {
            user = data;
            return new Project(req.body);
        }

        function setCreator(project) {
            project.owner = req.user.id;
            return project;
        }

        function persist(project) {
            return project.save()
                .then(returnProject);

            function returnProject() {
                return project;
            }
        }

    }

    function list(req, res, next) => {
      Project.find()
            .then(res.commit)
            .catch(res.error);
    }

    function show(req, res, next) => {

    }

    function update(req, res, next) => {

    }

    function remove(req, res, next) => {

    }

}
