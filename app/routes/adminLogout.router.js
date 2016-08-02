const router = require('express').Router();

router.post('/', function(req, res) {
	console.log('Destroying admin session...');
	if(req.session.admin) {
		req.session.destroy(function(err) {
			if (err) {
				throw err;
			}
			console.log(req.session);
			res.json({"status": "admin logged out"});
		});
	}
});

module.exports = router;