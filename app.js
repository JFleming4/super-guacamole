var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
const state = {
	PhoneState: "Idle",
	AgentState: "NotReady",
}
app.get('/', function (req, res)
{
	res.send(JSON.stringify({ Hello: 'World' }));
});

app.get('/getState', function (req, res)
{
	res.send(state);
});

app.listen(port, function ()
{
	console.log(`Example app listening on port !`);
});
