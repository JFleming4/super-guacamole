import * as _ from 'lodash';
import './style.css';
import { printButton } from './print'
import * as workspace from 'genesys-workspace-client-js';
import * as ProvisioningApi from 'genesys-provisioning-client-js';
import * as authentication from 'genesys-authentication-client-js';

const storage = {
	// This is the environment url
	apiUrl: "https://gapi-use1.genesyscloud.com",
	// This is the environment client id
	clientId: "b219ac0408a14a33ac4333382fc776c3",
	// This is the environment client secret
	clientSecret: "es33SiFOzMaaZ6KQ57jQ7L167owt2KOeaJq0BXEEdtlcY6V5",
	// This is your service port
	port: 3002,
	// This is needed as a header to authorize requests
	apiKey: "iB4b9IG8536FQCKiPlyXL9wJYfKbALKT4GZW9VGu"
};
const authClient = new authentication.ApiClient();
authClient.basePath = `${storage.apiUrl}/auth/v3`;
authClient.defaultHeaders = {
	'x-api-key': storage.apiKey
};
const provisioningApi = new ProvisioningApi.ProvisioningApi(storage.apiKey, storage.apiUrl, false);
const workspaceApi = new workspace(storage.apiKey, storage.apiUrl);
function component()
{
	let element = document.createElement('div');

	element.innerHTML = _.join(['Hello', 'webpack', 'rules'], ' ');
	element.classList.add('hello');

	const btn = new printButton("Click Me", element);

	return element;
}
document.body.appendChild(component());
