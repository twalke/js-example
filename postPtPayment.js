$(document).ready(function() {})

const credentialsList = document.getElementById('credentials-list');
let updateInsClaimRequest = new XMLHttpRequest();
let userSettings = JSON.parse(sessionStorage.getItem('userSettings'));
let patientId = userSettings.curPa;
let patientData =JSON.parse(sessionStorage.getItem("patient_data"));
let patientBillData = JSON.parse(sessionStorage.getItem("patientBills"));
let postPtData = JSON.parse(sessionStorage.getItem('insuranceClaims'));
$(document).one('ready', function() {
  injectControlledSelectInput(insuranceClaims.writeOffDropDown, credentialsList);
});
let currentPatient = patientData[patientId];
let patientInsId = currentPatient.patientInsId;
let currentPostPtData = postPtData[patientInsId];
let currentPatientBillData = patientBillData[currentPatient.patientBillsId];
let x = 1;
let subdomainLength;
let slashCount = 0;
for (let c = 0; c < window.location.href.split('').length; c++){
    if (window.location.href.split('')[c] == '/'){
        slashCount++;
        if (slashCount == 3){
            subdomainLength = c;
            break;
        }
    }
}
const subdomain = window.location.href.substr(0, subdomainLength);

function createRow(rowId) {
	let claimData = JSON.parse(sessionStorage.getItem('insuranceClaims'));
	// let claims;
	let claimLedger;

	//let tempClaim = claimData[patientInsId].claims[tempClaim];
	// currentPostPtData.claims[claims].claimLedger[claimLedger].date
	// let tempClaim = document.getElementById("post-pt-row"+[x]).getAttribute("ledgerRowId"+[x]);
	let claimLedgerIndex = "00";
	// let rowId = sessionStorage.getItem("insuranceClaims");


	let mainDiv = document.createElement("div");
	mainDiv.setAttribute("id", "post-pt-row" +[x]);
	mainDiv.setAttribute("class", "flex-container-row");
	mainDiv.setAttribute("ledger-row-id", rowId);
	let claimIdDiv = document.createElement("div");
	claimIdDiv.setAttribute("id", "claimId" +[x]);
	claimIdDiv.setAttribute("class", "flex-container-column");
	claimIdDiv.setAttribute("style", "background-color: lightgrey; border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 60px;min-height: 15px;font-size: 12px;");
	let dateOfServiceDiv = document.createElement("div");
	dateOfServiceDiv.setAttribute("id", "dateOfService" +[x]);
	dateOfServiceDiv.setAttribute("class", "flex-container-column");
	dateOfServiceDiv.setAttribute("style", "background-color: lightgrey; border-right: 1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 74px;min-height: 15px;font-size: 12px;");
	let billedDiv = document.createElement("div");
	billedDiv.setAttribute("id", "billed" +[x]);
	billedDiv.setAttribute("class", "flex-container-column");
	billedDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 60px;min-height: 15px;font-size: 12px;");
	billedDiv.setAttribute("contentEditable", "true");
	let allowedDiv = document.createElement("div");
	allowedDiv.setAttribute("id", "allowed" + [x]);
	allowedDiv.setAttribute("class", "flex-container-column");
	allowedDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 60px;min-height: 15px;font-size: 12px;");
	allowedDiv.setAttribute("contentEditable", "true");
	let deductDiv = document.createElement("div");
	deductDiv.setAttribute("id", "deduct" +[x]);
	deductDiv.setAttribute("class", "flex-container-column");
	deductDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 60px;min-height: 15px;font-size: 12px;");
	deductDiv.setAttribute("contentEditable", "true");
	let coInsDiv = document.createElement("div");
	coInsDiv.setAttribute("id", "coIns" +[x]);
	coInsDiv.setAttribute("class", "flex-container-column");
	coInsDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 60px;min-height: 15px;font-size: 12px;");
	coInsDiv.setAttribute("contentEditable", "true");
	let coPayDiv = document.createElement("div");
	coPayDiv.setAttribute("id", "coPay" +[x]);
	coPayDiv.setAttribute("class", "flex-container-column");
	coPayDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 60px;min-height: 15px;font-size: 12px;");
	coPayDiv.setAttribute("contentEditable", "true");
	let paidDiv = document.createElement("div");
	paidDiv.setAttribute("id", "paid" +[x]);
	paidDiv.setAttribute("class", "flex-container-column");
	paidDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 60px;min-height: 15px;font-size: 12px;");
	paidDiv.setAttribute("contentEditable", "true");
	let adjustDiv = document.createElement("div");
	adjustDiv.setAttribute("id", "adjust" +[x]);
	adjustDiv.setAttribute("class", "flex-container-column");
	adjustDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 60px;min-height: 15px;font-size: 12px;");
	adjustDiv.setAttribute("contentEditable", "true");
	let withheldDiv = document.createElement("div");
	withheldDiv.setAttribute("id", "withheld" +[x]);
	withheldDiv.setAttribute("class", "flex-container-column");
	withheldDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 60px;min-height: 15px;font-size: 12px;");
	withheldDiv.setAttribute("contentEditable", "true");
	let patBalanceDiv = document.createElement("div");
	patBalanceDiv.setAttribute("id", "patBalance" +[x]);
	patBalanceDiv.setAttribute("class", "flex-container-column");
	patBalanceDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 60px;min-height: 15px;font-size: 12px;");
	patBalanceDiv.setAttribute("contentEditable", "true");
	let appliedDiv = document.createElement("div");
	appliedDiv.setAttribute("id", "applied" +[x]);
	appliedDiv.setAttribute("class", "flex-container-column");
	appliedDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 60px;min-height: 15px;font-size: 12px;");
	appliedDiv.setAttribute("contentEditable", "true");

	mainDiv.appendChild(dateOfServiceDiv);
	mainDiv.appendChild(claimIdDiv);
	mainDiv.appendChild(billedDiv);
	mainDiv.appendChild(allowedDiv);
	mainDiv.appendChild(deductDiv);
	mainDiv.appendChild(coInsDiv);
	mainDiv.appendChild(coPayDiv);
	mainDiv.appendChild(paidDiv);
	mainDiv.appendChild(adjustDiv);
	mainDiv.appendChild(withheldDiv);
	mainDiv.appendChild(patBalanceDiv);
	mainDiv.appendChild(appliedDiv);
	$("#post-pt-table").append(mainDiv);
}

function buildPostPtPaymentLedger() {
	document.getElementById("post-pt-table").innerHTML = "";
	for (let claims in currentPostPtData.claims) {
		for (let claimLedger in currentPostPtData.claims[claims].claimLedger) {
			createRow(claimLedger);
			x++;
		}
	}
	for (let patientBills in currentPatientBillData.patientBills) {
		for (let claimLedger in currentPatientBillData.patientBills[patientBills].billLedger) {
			createRow(claimLedger);
			x++;
		}
	}
}
function writePostPtPaymentLedger() {
	let y = 1;
	let dataTable = buildPostPtPaymentLedger();
	for (let claims in currentPostPtData.claims) {
		for (let claimLedger in currentPostPtData.claims[claims].claimLedger) {
			$('#dateOfService' + [y]).text(currentPostPtData.claims[claims].claimLedger[claimLedger].date)
			$('#claimId' + [y]).text(currentPostPtData.claims[claims].claimLedger[claimLedger].claimId)
			$('#billed' + [y]).text(currentPostPtData.claims[claims].claimLedger[claimLedger].billed)
			$('#allowed' + [y]).text(currentPostPtData.claims[claims].claimLedger[claimLedger].allowed)
			$('#deduct' + [y]).text(currentPostPtData.claims[claims].claimLedger[claimLedger].deduct)
			$('#coIns' + [y]).text(currentPostPtData.claims[claims].claimLedger[claimLedger].coIns)
			$('#coPay' + [y]).text(currentPostPtData.claims[claims].claimLedger[claimLedger].coPay)
			$('#paid' + [y]).text(currentPostPtData.claims[claims].claimLedger[claimLedger].paid)
			$('#adjust' + [y]).text(currentPostPtData.claims[claims].claimLedger[claimLedger].adjust)
			$('#withheld' + [y]).text(currentPostPtData.claims[claims].claimLedger[claimLedger].withheld)
			$('#patBalance' + [y]).text(currentPostPtData.claims[claims].claimLedger[claimLedger].patBalance)
			$('#applied' + [y]).text(currentPostPtData.claims[claims].claimLedger[claimLedger].applied)
			y++;
		}
	}
	for (let patientBills in currentPatientBillData.patientBills) {
		x = x-1;
		for(let billLedger in currentPatientBillData.patientBills[patientBills].billLedger) {
			$("#dateOfService" +[x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].date)
			$("#claimId" +[x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].billId)
			$('#billed' + [x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].billed)
			$('#allowed' + [x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].allowed)
			$('#deduct' + [x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].deduct)
			$('#coIns' + [x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].coIns)
			$('#coPay' + [x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].coPay)
			$('#paid' + [x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].paid)
			$("#adjust" +[x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].adjust)
			$("#withheld" +[x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].withheld)
			$("#patBalance" +[x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].patBalance)
			$('#applied' + [x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].applied)
			x++;
		}
	}
	sortTableByDate();
	balanceTotalBox();
	postedAmountTotal();
}
function sortTableByDate() {
	let y = 1;
	didSwap = false;
	let lTable, rows, rows2, switching, h, k, shouldSwitch;
	lTable = document.getElementById("post-pt-table");
	switching = true;
	while (switching) {
		rows = document.getElementById("post-pt-row" +[y]);
		rows2 = document.getElementById("post-pt-row" +[y+1]);
		if(rows2 == null) {
			y = 1;
			if (!didSwap) {
				break;
			}
			didSwap = false;
		}
		if (rows2 != null) {
			h = document.getElementById("dateOfService"+[y]).innerHTML;
			k = document.getElementById("dateOfService"+[y+1]).innerHTML;
		} else {
			h = 1;
			k = 2;
		}
		shouldSwitch = false;
		if (h > k) {
			shouldSwitch = true;
		}
		if (shouldSwitch) {
			rows.parentNode.insertBefore(rows2, rows);
			switching = true;
			document.getElementById("post-pt-row" +[y]).id = "post-pt-row" +[y+1];
			document.getElementById("post-pt-row" +[y+1]).id = "post-pt-row" +[y];
			document.getElementById("dateOfService" +[y]).id = "dateOfService" +[y+1];
			document.getElementById("dateOfService" +[y+1]).id = "dateOfService" +[y];
			didSwap = true;
		}
		if (rows2 != null) {
			y++;
		}
	}
}
function getPatientData(){
    return postPtData;
}

let modal = document.getElementById("modal-level-1");

function closeOut() {
	window.parent.parent.dismissModal();
}
function currentBal() {
	let curBal = "$500.00";
	return curBal;
}
// function amountText() {
// 	let i = document.getElementById("amount-box").value;
// 	document.getElementById("amountButton").innerHTML = i;
// }
	// let i = document.getElementsByClassName("curBal");
	// i[0].innerHTML = currentBal();
	// i[1].innerHTML = amountText();
	// i[2].innerHTML = currentBal();
let ptBal = 0;
function balanceTotalBox() {
	for (let i = 1; i < x; i++) {
		let j = document.getElementById("patBalance" +[i]).innerHTML;
		if(j =="") {
			continue;
		}
		ptBal = ptBal + parseFloat(j);
	}
	document.getElementById("current-balance-cell").innerHTML = ptBal.toFixed(2);
	document.getElementById("amountButton").innerHTML = ptBal.toFixed(2);
	document.getElementById("patResponsibility").innerHTML = ptBal.toFixed(2);
}
function postedAmountTotal() {
	let tempPaid = 0;
	for (let i = 1; i < x; i++) {
		let j = document.getElementById("paid" +[i]).innerHTML;
		if(j =="") {
			continue;
		}
		tempPaid = tempPaid + parseFloat(j);
	}
	document.getElementById("postedAmount").innerHTML = tempPaid.toFixed(2);
}
function amountApplied() {
	let claimData = JSON.parse(sessionStorage.getItem('insuranceClaims'));
	let claimLedger;
	let patientBills;
	let claimLedgerIndex = "00";

	if(ptBal <= 0) {
		return;
	} else {
		for (let i = 1; i < x; i++) {
			let tempClaim = document.getElementById("claimId" +[i]).innerHTML;
			let j = document.getElementById("patBalance" +[i]).innerHTML;
			let h = document.getElementById("applied" +[i]).innerHTML;
			if(j == "" || j == 0.00) {
				continue;
			}
			else if(h >= j) {
				continue;
			} else if( h > 0 && h < j) {
				let m = 0;
				m = j - h;
				h = j;
				ptBal = ptBal - m;
			} else {
				if(ptBal >= j) {
					h = j;
				}
				else {
					h = ptBal;
				}
				ptBal = ptBal - h;
			}
			for (let k in claimData[patientInsId].claims[tempClaim].claimLedger) {
				claimLedger = k;
			}
			claimData[patientInsId].claims[tempClaim].claimLedger[claimLedgerIndex].applied = h;
			claimLedgerIndex = padId((parseInt(claimLedger, 16) + 1).toString(16), 2);
		}
	}

	sessionStorage.setItem('insuranceClaims', JSON.stringify(claimData));

	let updateInsClaimRequestUrl = `${subdomain}/api/v1/jambic/${patientInsId}.update-ic`;
	updateInsClaimRequest.open('PUT', updateInsClaimRequestUrl, true);
	updateInsClaimRequest.setRequestHeader("Content-type", "application/json");
	updateInsClaimRequest.addEventListener("readystatechange", handleUpdateClaimResponse, false);
	updateInsClaimRequest.send(JSON.stringify(claimData[patientInsId]));
}
function handleUpdateClaimResponse() {
	if (updateInsClaimRequest.readyState = 4) {
		//do something or whatever but maybe not
	}
}
function onSaveClick() {
	//look at innerHTML for each cell deduct through applied and save changes to localStorage and to server
	let claimData = JSON.parse(sessionStorage.getItem('insuranceClaims'));
	let claimLedger;
	let patientBills;
	let claimLedgerIndex = "00";

	for (let i = 1; i < x; i++) {
		let tempClaim = document.getElementById("claimId" +[i]).innerHTML;
		let tempDeduct = document.getElementById("deduct" +[i]).innerHTML;
		let tempCoIns = document.getElementById("coIns" +[i]).innerHTML;
		let tempCoPay = document.getElementById("coPay" +[i]).innerHTML;
		let tempPaid = document.getElementById("paid" +[i]).innerHTML;
		let tempAdjust = document.getElementById("adjust" +[i]).innerHTML;
		let tempWithheld = document.getElementById("withheld" +[i]).innerHTML;
		let tempPatBalance = document.getElementById("patBalance" +[i]).innerHTML;
		let tempApplied = document.getElementById("applied" +[i]).innerHTML;

		// for (let k in claimData[patientInsId].claims[tempClaim].claimLedger) {
		// 	claimLedger = k;
		// }
		//
		// claimLedgerIndex = padId((parseInt(claimLedger, 16) + 1).toString(16), 2);

		claimData[patientInsId].claims[tempClaim].claimLedger[claimLedgerIndex].deduct = tempDeduct;
		claimData[patientInsId].claims[tempClaim].claimLedger[claimLedgerIndex].coIns = tempCoIns;
		claimData[patientInsId].claims[tempClaim].claimLedger[claimLedgerIndex].coPay = tempCoPay;
		claimData[patientInsId].claims[tempClaim].claimLedger[claimLedgerIndex].paid = tempPaid;
		claimData[patientInsId].claims[tempClaim].claimLedger[claimLedgerIndex].adjust = tempAdjust;
		claimData[patientInsId].claims[tempClaim].claimLedger[claimLedgerIndex].witheld = tempWithheld;
		claimData[patientInsId].claims[tempClaim].claimLedger[claimLedgerIndex].patBalance = tempPatBalance;
		claimData[patientInsId].claims[tempClaim].claimLedger[claimLedgerIndex].applied = tempApplied;
	}

	sessionStorage.setItem('insuranceClaims', JSON.stringify(claimData));

	let updateInsClaimRequestUrl = `${subdomain}/api/v1/jambic/${patientInsId}.update-ic`;
	updateInsClaimRequest.open('PUT', updateInsClaimRequestUrl, true);
	updateInsClaimRequest.setRequestHeader("Content-type", "application/json");
	updateInsClaimRequest.addEventListener("readystatechange", handleUpdateClaimResponse, false);
	updateInsClaimRequest.send(JSON.stringify(claimData[patientInsId]));
}

function calculateAge(birth_year, birth_month, birth_day){
  let today_date = new Date();
  let today_year = today_date.getFullYear();
  let today_month = today_date.getMonth();
  let today_day = today_date.getDate();
  let age = today_year - birth_year;

  if ( today_month < (birth_month - 1))
  {
    age--;
  }
  if (((birth_month - 1) == today_month) && (today_day < birth_day))
  {
    age--;
  }
  return age;
}

//patientName
let patientName = document.getElementById('name-var');
patientName.innerHTML = currentPatient.patientLastName.charAt(0).toUpperCase() + currentPatient.patientLastName.slice(1) + ', ' + currentPatient.patientFirstName.charAt(0).toUpperCase() + currentPatient.patientFirstName.slice(1);
//patientDOB
let dateOfBirth = document.getElementById('dob-var');
dateOfBirth.innerHTML = currentPatient.patientDOB.substr(4,2) + '/' + currentPatient.patientDOB.substr(6,2) + '/' + currentPatient.patientDOB.substr(0,4);
//patientAge
let age = document.getElementById('age-var');
age.innerHTML = calculateAge(currentPatient.patientDOB.substr(0,4), currentPatient.patientDOB.substr(4,2), currentPatient.patientDOB.substr(6,2));
//"patientHomePhone":"5555554321",
let homePhone = document.getElementById('home-var');
if (!isNaN(currentPatient.patientHomePhone[0])){
		homePhone.innerHTML = '(' + currentPatient.patientHomePhone.substr(0,3) + ') ' + currentPatient.patientHomePhone.substr(3,3) + '-' + currentPatient.patientHomePhone.substr(6,4);
}else {
		homePhone.innerHTML = currentPatient.patientHomePhone;
}
//"patientMobilePhone":"5555551234",
let mobilePhone = document.getElementById('mobile-var');
if (!isNaN(currentPatient.patientMobilePhone[0])){
		mobilePhone.innerHTML = '(' + currentPatient.patientMobilePhone.substr(0,3) + ') ' + currentPatient.patientMobilePhone.substr(3,3) + '-' + currentPatient.patientMobilePhone.substr(6,4);
}else {
		mobilePhone.innerHTML = currentPatient.patientMobilePhone;
}
//patientAccountNo
let patientAccNo = document.getElementById("account-var");
patientAccNo.innerHTML = currentPatient.patientAccountNo;
//default today's date in input
let today = new Date().toISOString().substr(0, 10);
document.querySelector("#paymentDate").value = today;

function padId(value, digits) {
  var id = value + '';
  var padding = '';
  for(var i = 0; i < digits - id.length; i++){
      padding += 0;
  }
  return padding += id;
}

function viewOptionsDropdown(selectInput) {
  let listContainer = selectInput.parentElement.lastElementChild;

  if (selectInput.classList.contains('editable-select')) listContainer.lastElementChild.innerHTML = 'add new';
  listContainer.style.display = listContainer.style.display === 'none' ? 'block' : 'none';
  for (const option of listContainer.children) {
    const optonText = option.textContent.replace(/\s/g, '');
    const selectInputText = selectInput.textContent.replace(/\s/g, '');

    if (optonText === selectInputText) option.style = 'background-color: #66c3e5; color: #fff;';
  }
}

function injectControlledSelectInput(data, list) {
  const selectInput = list.previousElementSibling;
  const editableOption = document.createElement('div');
  const blankOption = document.createElement('div');
  const dataKeys = Object.keys(data);

  editableOption.style = 'color: grey; cursor: pointer;';
  editableOption.classList.add('option', 'editable-option');
  editableOption.textContent = 'add new';
  blankOption.className = 'option';

  for (const key in data) {
    const newOption = document.createElement('div');
    const val = data[key];

    switch (selectInput.children.length) {
      case 0:
        newOption.textContent = val;
        if (dataKeys[dataKeys.length - 1] === key) {
          selectInput.textContent = data[dataKeys[0]];
          selectInput.previousElementSibling.value = data[dataKeys[0]];
        }
        break;
      case 2:
        const firstChild = document.createElement('div');
        const secondChild = document.createElement('div');
        const keys = Object.keys(val);

        firstChild.textContent = val[keys[0]];
        secondChild.textContent = val[keys[1]];
        firstChild.style = selectInput.children[0].getAttribute('style');
        secondChild.style = selectInput.children[1].getAttribute('style');
        newOption.append(firstChild, secondChild);
        if (dataKeys[dataKeys.length - 1] === key) {
          selectInput.children[0].textContent = data[dataKeys[0]][keys[0]];
          selectInput.children[1].textContent = data[dataKeys[0]][keys[1]];
          list.parentElement.children[0].value = data[dataKeys[0]][keys[0]];
          list.parentElement.children[1].value = data[dataKeys[0]][keys[1]];
        }
        break;
    }
    newOption.className = 'option';
    list.appendChild(newOption);
  }
  if (selectInput.classList.contains('editable-select')) list.appendChild(editableOption);
  if (selectInput.classList.contains('blank-select')) {
    list.prepend(blankOption);
    selectInput.textContent = '';
    selectInput.previousElementSibling.value = '';
  }
}
