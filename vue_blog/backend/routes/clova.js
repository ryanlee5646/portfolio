var express = require('express');
var curl = require('curl');
var crypto = require('crypto');
var router = express.Router();


/* GET users listing. */
router.get('/', (req, res) => {
  res.send('clova chatbot api :: using post method');
});

router.post('/', (req, res) => {
  const userId = req.body.userid;
  const message = req.body.message; //
  const action = req.body.action; // open, send...
  const params = {
    version: 'v2',
    userId: userId,
    timestamp: Date.now(),
    bubbles: [
      {
        type: 'text',
        data: {
          description: message,
        },
      },
    ],
    event: action,
  };

  let hmac = crypto.createHmac('sha256', 'cUJFVllPTWhvZFFLYXpYalVMdExSS01wcUxvSGpUemU=');
  hmac.update(JSON.stringify(params));
  let result = hmac.digest('base64');

  const config = {
    headers: {
      'X-NCP-CHATBOT_SIGNATURE': result,
    },
  };
  curl.postJSON('https://muqjbqxwjk.apigw.ntruss.com/chatbot/beta/message',
    params, config, (err, response, data) => {
      if (err)res.send(err);
      res.send(data);
    });
});

module.exports = router;
