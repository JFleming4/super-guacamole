var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const state = {
	PhoneState: "Idle",
	AgentState: "NotReady",
	Number: "+14699123081"
}
app.get('/', function (req, res)
{
	res.send(JSON.stringify({ Hello: 'World' }));
});

app.get('/get-state', function (req, res)
{
	res.send(state);
});

app.post('/set-state', function (req, res)
{
	const _phoneState = req.body.PhoneState;
	const _agentState = req.body.AgentState;
	const _number = req.body.Number;

	if (_phoneState === "Call" || _phoneState === "Hold" || _phoneState === "Idle")
	{
		state.PhoneState = _phoneState;
	}

	if (IsValidAgentState(_agentState))
	{
		state.AgentState = _agentState;
	}

	if (_number.length === 11)
	{
		state.Number = _number;
	}

	res.send(state);
});

app.listen(port, function ()
{
	console.log(`Example app listening on port !`);
});

const IsValidAgentState = function (agentState)
{
	return agentState === "Ready"
		|| agentState === "NotReady"
		|| agentState === "AfterCallWork"
		|| agentState === "DoNotDisturb"
		|| agentState === "LogOff";
}
