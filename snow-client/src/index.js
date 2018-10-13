import * as axios from 'axios';
import './style.css'

let AgentState = document.createElement('div');
let PhoneState = document.createElement('div');
let NumberState = document.createElement('div');

let SetAgentReady = document.createElement('button');
let SetAgentNotReady = document.createElement('button');
let SetAgentAfterCallWork = document.createElement('button');
let SetAgentDND = document.createElement('button');
let SetAgentLogOut = document.createElement('button');

let DialBtn = document.createElement('button');
let HoldBtn = document.createElement('button');
let EndCall = document.createElement('button');
let RetrieveCall = document.createElement('button');


let state = {};
const url = 'https://super-guacamole.herokuapp.com/';
function ctiPhone()
{
	let container = document.createElement('div');
	let stateBtn = document.createElement('button');
	let agentStateContainer = document.createElement('div');
	let phoneStateContainer = document.createElement('div');
	stateBtn.innerHTML = "Update State";

	let stateDiv = document.createElement('div');
	stateBtn.addEventListener('click', () => updateState());

	container.appendChild(stateBtn);
	container.appendChild(stateDiv);
	container.appendChild(agentStateContainer);
	container.appendChild(phoneStateContainer);

	stateDiv.appendChild(AgentState);
	stateDiv.appendChild(PhoneState);
	stateDiv.appendChild(NumberState);

	buildAgentButtons(agentStateContainer);
	buildPhoneButtons(phoneStateContainer);

	return container;
}

function buildAgentButtons(agentStateContainer)
{
	SetAgentReady.innerHTML = "Ready";
	SetAgentNotReady.innerHTML = "Not Ready";
	SetAgentAfterCallWork.innerHTML = "After Call Work";
	SetAgentDND.innerHTML = "Do Not Disturb";
	SetAgentLogOut.innerHTML = "Log Out";

	SetAgentReady.addEventListener('click', () => SetAgentState("READY"))
	SetAgentNotReady.addEventListener('click', () => SetAgentState("NOT_READY"))
	SetAgentAfterCallWork.addEventListener('click', () => SetAgentState("NOT_READY_AFTER_CALLWORK"))
	SetAgentDND.addEventListener('click', () => SetAgentState("DND_ON"))
	SetAgentLogOut.addEventListener('click', () => SetAgentState("LOGOUT"))

	agentStateContainer.appendChild(SetAgentReady);
	agentStateContainer.appendChild(SetAgentNotReady);
	agentStateContainer.appendChild(SetAgentAfterCallWork);
	agentStateContainer.appendChild(SetAgentDND);
	agentStateContainer.appendChild(SetAgentLogOut);

	HideAgentButtons();
}

function buildPhoneButtons(phoneContainer)
{
	DialBtn.innerHTML = "Dial";
	HoldBtn.innerHTML = "Hold";
	EndCall.innerHTML = "End";
	RetrieveCall.innerHTML = "Retrieve";

	phoneContainer.appendChild(DialBtn);
	phoneContainer.appendChild(HoldBtn);
	phoneContainer.appendChild(EndCall);
	phoneContainer.appendChild(RetrieveCall);
}

function updateState()
{
	axios({
		method: "GET",
		url: url + "get-state"
	}).then(res =>
	{
		state = res.data;
		UpdateUi();
	});
}

function UnhideAgentButtons()
{
	SetAgentReady.classList.remove("hidden");
	SetAgentNotReady.classList.remove("hidden");
	SetAgentAfterCallWork.classList.remove("hidden");
	SetAgentDND.classList.remove("hidden");
	SetAgentLogOut.classList.remove("hidden");
}

function HideAgentButtons()
{
	SetAgentReady.classList.add("hidden");
	SetAgentNotReady.classList.add("hidden");
	SetAgentAfterCallWork.classList.add("hidden");
	SetAgentDND.classList.add("hidden");
	SetAgentLogOut.classList.add("hidden");
}

function UpdateUi()
{
	AgentState.innerHTML = state["AgentState"];
	PhoneState.innerHTML = state["PhoneState"];
	NumberState.innerHTML = state["Number"];
	SetPhoneButtons(state.PhoneState);
	SetAgentButtons(state.AgentState);
}

function SetPhoneButtons(phoneState)
{
	switch (phoneState)
	{
		case "Idle":
			break;
		case "Ringing":
			break;
		case "Call":
			break;
		case "Hold":
			break;
	}
}

function SetAgentButtons(agentState)
{
	UnhideAgentButtons();
	switch (agentState)
	{
		case "READY":
			SetAgentReady.classList.add("hidden");
			break;
		case "NOT_READY":
			SetAgentNotReady.classList.add("hidden");
			break;
		case "NOT_READY_AFTER_CALLWORK":
			SetAgentAfterCallWork.classList.add("hidden");
			break;
		case "DND_ON":
			SetAgentDND.classList.add("hidden");
			break;
		case "LOGOUT":
			SetAgentLogOut.classList.add("hidden");
			break;
	}
}

async function SetAgentState(agentState)
{
	const result = await axios({
		method: "POST",
		url: url + "set-state",
		data: { AgentState: agentState }
	});
	state = result.data;
	UpdateUi();
}

document.body.appendChild(ctiPhone());
