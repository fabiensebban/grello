module.exports = (server) => {
    const Team = server.models.Task;

    return {
        create,
        list,
        show,
        update,
        remove
    }

    function create(req, res, next) {

    }

    function list(req, res, next) {
        Team.finds()
            .then(res.commit)
            .catch(res.error);
    }

    function show(req, res, next) {

    }

    function update(req, res, next) {

    }


    function remove(req, res, next) {

    }
}