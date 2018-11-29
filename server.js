const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

require('./server/setUpMongoose');
require('./server/messageSchema');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'TO REACT' });
});
app.post('/save_message', (req, res) => {
	const Message = require('mongoose').model('Message');
	console.log('got req.body: %s',JSON.stringify(req.body));
	msg = new Message({msg: req.body.message});
	msg.save(function (err) {
     if (err) return handleError(err);
   });
	console.log('msg: %s',JSON.stringify(msg));
	res.send(JSON.stringify({
		msg:'success',
	}))
});
