module.exports = (server) => {
    const Project = server.models.Project;
    const User = server.models.User;
    const Team = server.models.Team;


    return {
        create,
        list,
        show,
        update,
        remove
    }

    function create(req, res, next) {
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

    function list(req, res, next) {
      Project.find()
            .then(res.commit)
            .catch(res.error);
    }

    // Permet d'afficher la liste des todos
    function show(req, res, next) {
      return Project.findById(req.params.id)
              .then(server.utils.ensureOne)
              .catch(res.status(500).send("error : project not found"))
              .then(isMember)
              .then(res.commit)
              .catch(res.error);


              function isMember(){
                //On a le projects
                  Team.findById(req.params.id)
                    .then(server.utils.ensureOne)
                    .catch(res.status(500).send("error : project not found"))
                    .then(findMember)
                    .catch(res.status(500).send("error : user is not member in this project"));

              }

              function findMember(team){
                let members = team.members;
                members.forEach((member) => {
                  if(member.user==req.user.id){
                    return member;
                  }
                });
                return;
              }
    }

    function update(req, res, next) {
      Project.findByIdAndUpdate(req.body.id, req.body)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'project.not.found'))
            .then(server.utils.empty)
            .then(res.commit)
            .then(res.error)
    }

    function remove(req, res, next) {
      Project.findByIdAndRemove(req.params.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'project.not.found'))
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }

}
