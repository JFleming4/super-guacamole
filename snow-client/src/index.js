
const url = 'https://super-guacamole.herokuapp.com/';
function ctiPhone()
{
	let stateBtn = document.createElement('button');
	stateBtn.innerHTML = "Update State";

	let stateDiv = document.createElement('div');
	stateBtn.addEventListener('click', () => updateState());

	stateBtn.appendChild(stateDiv);
}

function updateState()
{
	const Http = new XMLHttpRequest();
	const getUrl = url + "get-state";
	Http.open("GET", url);
	Http.send()
	Http.onreadystatechange = () =>
	{
		console.log("RESPONSE");
		console.log(Http.response);
		console.log(Http.responseText);
	}
}

document.body.appendChild(ctiPhone());
