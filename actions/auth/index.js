const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

module.exports = (server) => {
    const Token = server.models.Token;
    const User = server.models.User;

    return {
        login
    };

    function login(req, res, next) {
        User.findOne({
            email: req.body.email,
            password: sha1(req.body.password)
        })
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(401, 'invalid.credentials'))
            .then(sign)
            .then(res.commit)
            .catch(res.error);

        function sign(user) {
            return new Promise((resolve, reject) => {
                jwt.sign({
                    data: {userId: user._id}
                }, server.settings.security.salt, {
                    expiresIn: '1h'
                }, (err, encryptedToken) => {
                    if (err)
                        return reject(err);

                    return resolve(encryptedToken);
                });
            });
        }
    }
};