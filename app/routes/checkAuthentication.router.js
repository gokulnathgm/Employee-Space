const router = require('express').Router();

router.get('/', function(req, res) {
  console.log(req.session);
    if(req.session.user || req.session.admin) {
      res.json(req.session);
    }
    else {
      res.json({"status": "not authenticated"});
    }
});

module.exports = router;