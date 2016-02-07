var express = require('express');
var router = express.Router();

var Slack = require('node-slack');
const hookUrl = process.env.hookUrl || "";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Forever An English',
    responded: false
  });
});

router.post('/submit', function(req, res, next) {
  if(hookUrl) {
    var slack = new Slack(hookUrl);
    slack.send({
      "text": "ForeverAnEnglish.Com: " + JSON.stringify(req.body),
      channel: "#service",
      username: "HyphyBot"
    });
  } else {
    console.log("No slack url... " + JSON.stringify(req.body));
  }
  res.render('index', {
    title: 'Forever An English',
    responded: true
  });
});

module.exports = router;
