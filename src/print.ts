
export class printButton
{
	protected _btn: HTMLButtonElement
	constructor(label: string, container: HTMLElement)
	{
		this._btn = document.createElement('button');
		this._btn.innerHTML = label;
		this._btn.addEventListener('click', () => this.printMe())
		this._btn.classList.add("click");
		container.appendChild(this._btn);
	}
	protected printMe()
	{
		console.log("Long Live The Empire");
	}
}
