module.exports = (server) => {
	const Token = server.models.Token;
	const User = server.models.User;

	// 1 Find token for the give identifier 
	// 2 Find the user associated to the token
	// 3 Let the request pass to the action if everything has been found 

	return (req, res, next) => {
		let authorization = req.headers['authorization'];

		if(!authorization){
			return res.status(401).send('unauthorized');
		}

		// 1
		Token.findById(authorization)
			 .then(ensureOne)
			 .then(findAssociatedUser)
			 .then(ensureOne)
			 .then(setUserId)
			 .then(next)
			 .catch();

		function findAssociatedUser () {
			return User.findById(token.userId)
		}

		function setUserId(user) {
			req.userId = user._id
		}

		function unauthorized 
		function ensureOne (token) {
			return (token) ? token : null
		}
}
}