var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const state = {
	PhoneState: "Idle",
	AgentState: "NOT_READY",
	Number: "+14699123081"
}
app.get('/', function (req, res) {
	res.send(JSON.stringify({ Hello: 'World' }));
});

app.get('/get-state', function (req, res) {
	res.send(state);
});

app.post('/set-state', function (req, res) {
	console.log("Query: ", req.query);
	console.log("body", req.body);
	const _phoneState = req.body.PhoneState;
	const _agentState = req.body.AgentState;
	const _number = req.body.Number;

	if (_number === "Easter Egg") {
		res.send(state);
		return;
	}

	if (["Call", "Hold", "Idle", "Ringing", "Dialing"].includes(_phoneState)) {
		state.PhoneState = _phoneState;
	}

	if (_agentState) {
		state.AgentState = _agentState;
	}

	if (_number && _number.length === 11) {
		state.Number = _number;
	}

	console.log("State: ", state);
	res.send(state);
});

app.listen(port, function () {
	console.log(`Example app listening on port !`);
});


const IsValidAgentState = function (agentState) {
	return agentState === "Ready"
		|| agentState === "NotReady"
		|| agentState === "AfterCallWork"
		|| agentState === "DoNotDisturbOn"
		|| agentState === "LogoutDoNotDisturbOn"
		|| agentState === "Offline";
}
