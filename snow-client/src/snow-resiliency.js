function startClickToDial()
{
	console.log("super-guac");
	var $ = jQuery;
	setInterval(function ()
	{
		$(document.getElementById("page_timing_div")).attr("style", "display:none;");
		$(document.getElementById("test")).attr("style", "border:0px;height:250px;width:250px;");
		addClickToDial($("iframe#gsft_main", window.parent.document)[0]);
	}, 1000);
	setInterval(queryContactRequest, 1000);
}

function queryContactRequest()
{
	var table = new GlideRecord("u_contactrequest");
	table.query();
	while (table.next())
	{
		var phoneNumber = table.u_phone_number;
		if (phoneNumber)
		{
			phoneNumber = phoneNumber.replace(/\D/g, '');
			if (phoneNumber)
			{
				phoneNumber = "+" + phoneNumber;
				handleClickToDial({ "number": phoneNumber });
				screenpop(phoneNumber);
			}
			table.deleteRecord();
		}
	}
}

function screenpop(phoneNumber)
{
	var contact = new GlideRecord("customer_contact");
	// 							contact.addQuery("phone", "=", "phoneNumber");
	contact.query();
	while (contact.next())
	{
		if (contact.phone === phoneNumber)
		{
			var id = contact.sys_id;
			var url = "https://dev66225.service-now.com/nav_to.do?uri=customer_contact.do?sys_id=" + id;
			var $ = jQuery;
			openFrameAPI.openServiceNowForm({ entity: 'customer_contact', query: "sys_id=" + id });
		}
	}
}

function addClickToDial(currentFrame)
{
	var tableSelector = "table[glide_table='customer_contact']";
	var tableDiv = currentFrame.contentDocument.getElementById("customer_contact_expanded");
	if (!tableDiv) { return; }
	var table = tableDiv.getElementsBySelector("#customer_contact_table");
	if (table)
	{
		addClickToDialToTablePhoneFields($(table));
	}
}
function getSysId(form)
{
	var $ = jQuery;
	var formId = $("#sys_uniqueValue", form).val(); //all other forms
	if (!formId)
	{	//preview forms
		if (form && form.parentElement && form.parentElement.id)
		{	// before kingston
			formId = form.parentElement.id;
		}
		else
		{	// for kingston
			var elementSelector = $("span[id*='attachmentNumber']", form.parentElement)[0];
			formId = elementSelector ? elementSelector.id : ""; // if the selector doesn't get a match
		}
	}
	var entityGuid = formId.match(/[0-9a-f]{32}/i); // get the entity guid from the form id.
	return (entityGuid && entityGuid.length > 0) ? entityGuid[0] : null;
}

var iceInGeniusPhoneTableRegex = "th[glide_type=ph_number]:not([glide_field*='fax']),th[glide_type=phone_number_e164]:not([glide_field*='fax'])";


function addClickToDialToTablePhoneFields(table)
{
	var $ = jQuery;
	var entityName = $(table).attr("glide_table");
	var tablePhoneFields = $(iceInGeniusPhoneTableRegex, table);
	tablePhoneFields.closest("table").each(function (i, table)
	{
		var phNumberTh = $(table).find(iceInGeniusPhoneTableRegex); // collection, 0 or more
		// Only select rows that are in the body to avoid accidentally
		// adding a telephony button to search cells in the header.
		$(table).find("tbody tr").each(function (j, tr)
		{
			var currentTr = tr;
			var $currentTr = $(currentTr);
			$(phNumberTh).each(function (k, thEl)
			{
				var phNumberTd = $currentTr.find("td").eq(thEl.cellIndex)[0];
				if (phNumberTd)
				{
					if (phNumberTd.querySelector("#clickToDialElement")) { return; }

					if (phNumberTd.textContent)
					{
						var a = createAElement({
							value: phNumberTd.textContent,
							element: phNumberTd,
							sysId: currentTr.getAttribute("sys_id"),
							recordType: entityName
						}, false);

						//Grab the first text node from the td's children and put my element before that node
						//in cases where td looks like <td>613-5449875</td> or <td><div></div>613-5648798<td>
						//This is not applicable for phone log table where td looks like <td><span>613-5453214</span></td>
						//so I just push my element as the first child in td
						var cont = $(phNumberTd).contents().filter(function (i, ele)
						{
							return ele.nodeType == 3 && ele.textContent !== "";
						});

						if (cont.length > 0)
						{
							cont.first().before(a);
						}
						else
						{
							$(phNumberTd).prepend(a);
						}
					}
				}
			});
		});
	});
}

function createAElement(el, isBtn)
{
	var aElement = document.createElement("a");
	aElement.id = "clickToDialElement";
	aElement.title = "Click to dial";
	if (isBtn)
	{
		aElement.className = "btn-ref btn btn-default icon ref-button icon-phone";
	}
	else
	{
		// Wrap element in a span for styling
		var span = document.createElement("span");
		span.className = "btn-ref btn icon ref-button icon-phone";
		aElement.appendChild(span);
	}
	aElement.href = "javascript:void(0)";
	aElement.onclick = function ()
	{
		dialNumber(el);
	};

	return aElement;
}

function dialNumber(el)
{
	var phoneNumber = (el.element).value || el.value;
	if (!phoneNumber)
	{
		return;
	}

	handleClickToDial({ "number": phoneNumber, "id": el.sysId, "type": el.recordType });
	screenpop(phoneNumber);
}
function handleClickToDial(object)
{
	// 	var openFrame = document.getElementById("gsft_openframe");
	// 	var targetIframe = openFrame.contentDocument.getElementById("test");
	var targetIframe = document.getElementById("test");
	targetIframe.contentWindow.postMessage(JSON.stringify(object), "https:localhost:8080");
}
startClickToDial();
