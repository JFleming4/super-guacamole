import * as _ from 'lodash';
import './style.css';
import { printButton } from './print'

function component()
{
	let element = document.createElement('div');

	element.innerHTML = _.join(['Hello', 'webpack', 'rules'], ' ');
	element.classList.add('hello');

	const btn = new printButton("Click Me", element);

	return element;
}
document.body.appendChild(component());
