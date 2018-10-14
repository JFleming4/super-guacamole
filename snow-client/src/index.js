import * as axios from 'axios';
import Icon from './super-taco.png';
import './style.css'
import jQuery from 'jquery';

let AgentState = document.createElement('div');
let PhoneState = document.createElement('div');
let NumberState = document.createElement('div');

let SetAgentReady = document.createElement('div');
let SetAgentNotReady = document.createElement('div');
let SetAgentAfterCallWork = document.createElement('div');
let SetAgentDND = document.createElement('div');
let SetAgentLogOut = document.createElement('div');

let DialContainer = document.createElement('div');
let DialBtn = document.createElement('button');
let DialBox = document.createElement('input');
let AnswerBtn = document.createElement('button');
let HoldBtn = document.createElement('button');
let EndCall = document.createElement('button');
let RetrieveCall = document.createElement('button');

let hero = document.createElement('div');

window.addEventListener("message", handleClickToDial, false);
window.onclick = function (event)
{
	if (!event.target.matches('.dropbtn'))
	{

		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++)
		{
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show'))
			{
				openDropdown.classList.remove('show');
			}
		}
	}
}

let state = {};
const url = 'https://super-guacamole.herokuapp.com/';
function handleClickToDial(event)
{
	try
	{
		var data = JSON.parse(event.data);
		if (data.number)
		{
			SetCTDState(data.number)
		}
	} catch (error)
	{
		console.log("failed click to dial");
	}
}

async function SetCTDState(number)
{
	const result = await axios({
		method: "POST",
		url: url + "set-state",
		data: {
			PhoneState: "Dialing",
			Number: number
		}
	});
	document.getElementById('dialbox').value = "";
	state = result.data;
	UpdateUi();
}

function ctiPhone()
{
	let container = document.createElement('div');
	let stateBtn = document.createElement('button');
	let agentStateContainer = document.createElement('div');
	let phoneStateContainer = document.createElement('div');
	stateBtn.innerHTML = "Update State";

	let stateDiv = document.createElement('div');
	stateBtn.addEventListener('click', () => updateState());

	//container.appendChild(stateBtn);
	container.appendChild(stateDiv);
	container.appendChild(agentStateContainer);
	container.appendChild(phoneStateContainer);

	stateDiv.appendChild(AgentState);
	stateDiv.appendChild(PhoneState);
	stateDiv.appendChild(NumberState);

	buildAgentButtons(agentStateContainer);
	buildPhoneButtons(phoneStateContainer);

	hero.setAttribute('id', 'hero');
	hero.classList.add('hidden');
	hero.classList.add('hero');
	var mascot = new Image();
	mascot.src = Icon;
	hero.appendChild(mascot);

	container.appendChild(hero);

	setInterval(() => updateState(), 100);

	return container;
}

function buildAgentButtons(agentStateContainer)
{
	agentStateContainer.classList.add("dropdown");
	let button = document.createElement('button');
	let agentStateDropdown = document.createElement('div');

	button.addEventListener('click', () => handleAgentDropdownClick());
	button.classList.add("dropbtn");
	button.innerHTML = "Change Agent State";

	agentStateDropdown.classList.add("dropdown-content");
	agentStateDropdown.setAttribute("id", "agent-dropdown");

	agentStateContainer.appendChild(button);
	agentStateContainer.appendChild(agentStateDropdown);

	SetAgentReady.innerHTML = "Ready";
	SetAgentNotReady.innerHTML = "Not Ready";
	SetAgentAfterCallWork.innerHTML = "After Call Work";
	SetAgentDND.innerHTML = "Do Not Disturb";
	SetAgentLogOut.innerHTML = "Log Out";

	SetAgentReady.addEventListener('click', () => SetAgentState("Ready"))
	SetAgentNotReady.addEventListener('click', () => SetAgentState("NotReady"))
	SetAgentAfterCallWork.addEventListener('click', () => SetAgentState("AfterCallWork"))
	SetAgentDND.addEventListener('click', () => SetAgentState("DoNotDisturbOn"))
	SetAgentLogOut.addEventListener('click', () => SetAgentState("Offline"))

	agentStateDropdown.appendChild(SetAgentReady);
	agentStateDropdown.appendChild(SetAgentNotReady);
	agentStateDropdown.appendChild(SetAgentAfterCallWork);
	agentStateDropdown.appendChild(SetAgentDND);
	agentStateDropdown.appendChild(SetAgentLogOut);

	HideAgentButtons();
}

function handleAgentDropdownClick()
{
	document.getElementById("agent-dropdown").classList.toggle("show");
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

function SetAgentButtons(agentState)
{
	UnhideAgentButtons();
	switch (agentState)
	{
		case "Ready":
			SetAgentReady.classList.add("hidden");
			break;
		case "NotReady":
			SetAgentNotReady.classList.add("hidden");
			break;
		case "AfterCallWork":
			SetAgentAfterCallWork.classList.add("hidden");
			break;
		case "DoNotDisturbOn":
			SetAgentDND.classList.add("hidden");
			break;
		case "Offline":
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

function buildPhoneButtons(phoneContainer)
{
	DialBtn.innerHTML = "Dial";
	AnswerBtn.innerHTML = "Answer";
	HoldBtn.innerHTML = "Hold";
	EndCall.innerHTML = "End";
	RetrieveCall.innerHTML = "Retrieve";

	DialBtn.addEventListener('click', () => SetDialState("Dialing"))
	AnswerBtn.addEventListener('click', () => SetPhoneState("Call"))
	HoldBtn.addEventListener('click', () => SetPhoneState("Hold"))
	EndCall.addEventListener('click', () => SetPhoneState("Idle"))
	RetrieveCall.addEventListener('click', () => SetPhoneState("Call"))

	DialBox.classList.add("dialbox");
	DialBox.setAttribute("id", "dialbox");

	DialContainer.appendChild(DialBox);
	DialContainer.appendChild(DialBtn);

	phoneContainer.appendChild(DialContainer);
	phoneContainer.appendChild(AnswerBtn);
	phoneContainer.appendChild(HoldBtn);
	phoneContainer.appendChild(EndCall);
	phoneContainer.appendChild(RetrieveCall);

	HidePhoneButtons();
}

function HidePhoneButtons()
{
	DialContainer.classList.add("hidden");
	AnswerBtn.classList.add("hidden");
	HoldBtn.classList.add("hidden");
	EndCall.classList.add("hidden");
	RetrieveCall.classList.add("hidden");
}

function SetPhoneButtons(phoneState)
{
	HidePhoneButtons();
	switch (phoneState)
	{
		case "Idle":
			DialContainer.classList.remove("hidden");
			break;
		case "Ringing":
			AnswerBtn.classList.remove("hidden");
			EndCall.classList.remove("hidden");
			break;
		case "Call":
			HoldBtn.classList.remove("hidden");
			EndCall.classList.remove("hidden");
			break;
		case "Hold":
			RetrieveCall.classList.remove("hidden");
			EndCall.classList.remove("hidden");
			break;
		case "Dialing":
			EndCall.classList.remove("hidden");
			break;
	}
}

async function SetPhoneState(phoneState)
{
	const result = await axios({
		method: "POST",
		url: url + "set-state",
		data: { PhoneState: phoneState }
	});
	state = result.data;
	UpdateUi();
}

function SetDialState()
{
	console.log("DIALING STATE super-guac");
	let number = document.getElementById("dialbox").value;
	if (number === "Easter Egg")
	{
		superTaco();
		return;
	}
	if (!number) { return; }
	if (number.length === 12)
	{
		SetCTDState(number);
	}
	else if (number.length === 11)
	{
		SetCTDState("+" + number);
	}
	else if (number.length === 10)
	{
		SetCTDState("+1" + number);
	}
}

function updateState()
{
	axios({
		method: "GET",
		url: url + "get-state"
	}).then(res =>
	{
		const newState = res.data
		if (newState.AgentState !== state.AgentState
			|| newState.PhoneState !== state.PhoneState
			|| newState.Number !== state.Number)
		{
			state = res.data;
			UpdateUi();
		}
	});
}

function UpdateUi()
{
	AgentState.innerHTML = "Agent State: " + state["AgentState"];
	PhoneState.innerHTML = "Telephony State: " + state["PhoneState"];
	// NumberState.innerHTML = state["Number"];
	SetPhoneButtons(state.PhoneState);
	SetAgentButtons(state.AgentState);
}

function superTaco()
{
	var $ = jQuery;
	var height = "+=" + $(document).height();
	$("#hero").toggle("hidden").animate({
		bottom: height
	}, 5000, () =>
		{
			$("#hero").toggle("hidden");
		});
}

document.body.appendChild(ctiPhone());
