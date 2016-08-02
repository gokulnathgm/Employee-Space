const router = require('express').Router();

router.post('/', function(req, res) {
	console.log('Creating admin session...');
	console.log(req.body);
	req.session.admin = req.body;
	res.json(req.session);
});

module.exports = router;