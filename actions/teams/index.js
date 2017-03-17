module.exports = (server) => {
    const User = server.models.User;
    const Team = server.models.Team;
    const Project = server.models.Project;

    return {
        create,
        list,
        show,
        update,
        remove,
        createMember,
        listMember,
        showMember,
        updateMember,
        removeMember
    }

    function create(req, res, next) {
        let team = null;

        return Project.findOne({_id: req.params.idProject,
                                owner: req.user.id
                      })
                      .then(server.utils.ensureOne)
                      .catch(server.utils.reject(403, 'access denied'))
                      .then(createTeam)
                      .then(addToUser)
                      .then(res.commit)
                      .catch(res.error);

        function createTeam(project) {
            return Team.findOne({project: project._id})
                       .then(server.utils.ensureEmpty)
                       .catch(server.utils.reject(403, 'team.already.exist'))
                       .then(persist);
            
            function persist() {
                team = new Team(req.body);
                team.project = project._id;
                team.creator = project.owner;
                return team.save();
            }
        }

        function addToUser(team) {
                return User.findById(team.creator)
                    .then(addTeam)
                    .then(returnTeam);

                function addTeam(user) {
                    user.teams.push(team._id);
                }

                function returnTeam() {
                    return team;
                };
        }
    }

    function list(req, res, next) {
        Team.find()
            .then(res.commit)
            .catch(res.error);
    }

    function show(req, res, next) {
        Team.findById(req.params.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'team.not.found'))
            .then(res.commit)
            .catch(res.error);
    }

    function update(req, res, next) {
        Team.findByIdAndUpdate(req.body.id, req.body)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'team.not.found'))
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }

    function remove(req, res, next) {
        Team.findByIdAndRemove(req.params.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'team.not.found'))
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }

    //=== Members ====

    function createMember(req, res, next) {
        return Team.findOne({_id: req.params.id,
                             creator: req.user.id
                      })
                      .then(server.utils.ensureOne)
                      .catch(server.utils.reject(403, 'u are not a creator'))
                      .then(addMember)
                      .then(addToUser)
                      .then(res.commit)
                      .catch(res.error);  

        function addMember(team) {
            return User.finById(req.params.UserId)
                       .then(addToTeam)
                       .catch(server.utils.reject(403, 'member.not.exist'));
                       .then(returnTeam)

            function addToTeam() {
                team.members.push(req.params.UserId);
            }

            function returnTeam() {
                return team;
            }
        }
    }

    function listMember(req, res, next) {
        Team.findById(req.params.id)
            .then(getMembers)
            .then(res.commit)
            .catch(res.error);

        function getMembers(data) {
            return data.members;
        }
    }

    function showMember(req, res, next) {
        Team.findById(req.params.id)
            .then(getMembersById)
            .then(res.commit)
            .catch(res.error);

        function getMembersById(data) {
            return data.members.findOneById(req.params.memberId);
        }
    }

    function updateMember(req, res, next) {

    }

    function removeMember(req, res, next) {

    }
}