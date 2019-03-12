$(document).ready(function() {})
let userSettings = JSON.parse(sessionStorage.getItem('userSettings'));
let patientId = userSettings.curPa;
let patientData =JSON.parse(sessionStorage.getItem("patient_data"));
let patientInsData = JSON.parse(sessionStorage.getItem('insuranceClaims'));
let patientBillData = JSON.parse(sessionStorage.getItem("patientBills")); //
let currentPatient = patientData[patientId];
let currentPatientInsData = patientInsData[currentPatient.patientInsId];
let currentPatientBillData = patientBillData[currentPatient.patientBillsId]; //
let x = 1;

function createRow() {
	let mainDiv = document.createElement("div");
	mainDiv.setAttribute("id", "ledger-row" + [x]);
	mainDiv.setAttribute("class", "flex-container-row");
	let claimIdDiv = document.createElement("div");
	claimIdDiv.setAttribute("id", "claimId" +[x]);
	claimIdDiv.setAttribute("class", "flex-container-column");
	claimIdDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 75px;min-height: 15px;font-size: 12px;");
	let dateOfServiceDiv = document.createElement("div");
	dateOfServiceDiv.setAttribute("id", 'dateOfService'+[x]);
	dateOfServiceDiv.setAttribute("class", "flex-container-column");
	dateOfServiceDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 75px;min-height: 15px;font-size: 12px;");
	let itemDescDiv = document.createElement("div");
	itemDescDiv.setAttribute("id", "itemDesc"+ [x]);
	itemDescDiv.setAttribute("class", "flex-container-column");
	itemDescDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 75px;min-height: 15px;font-size: 12px;");
	let chargesDiv = document.createElement("div");
	chargesDiv.setAttribute("id", "charges"+ [x]);
	chargesDiv.setAttribute("class", "flex-container-column");
	chargesDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 75px;min-height: 15px;font-size: 12px;");
	let paymentsDiv = document.createElement("div");
	paymentsDiv.setAttribute("id", "payments"+ [x]);
	paymentsDiv.setAttribute("class", "flex-container-column");
	paymentsDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 75px;min-height: 15px;font-size: 12px;");
	let adjustDiv = document.createElement("div");
	adjustDiv.setAttribute("id", "adjust"+ [x]);
	adjustDiv.setAttribute("class", "flex-container-column");
	adjustDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 75px;min-height: 15px;font-size: 12px;");
	let withheldDiv = document.createElement("div");
	withheldDiv.setAttribute("id", "withheld"+ [x]);
	withheldDiv.setAttribute("class", "flex-container-column");
	withheldDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 75px;min-height: 15px;font-size: 12px;");
	let patBalanceDiv = document.createElement("div");
	patBalanceDiv.setAttribute("id", "patBalance"+[x] );
	patBalanceDiv.setAttribute("class", "flex-container-column");
	patBalanceDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 75px;min-height: 15px;font-size: 12px;");
	let insBalanceDiv = document.createElement("div");
	insBalanceDiv.setAttribute("id", "insBalance"+ [x]);
	insBalanceDiv.setAttribute("class", "flex-container-column");
	insBalanceDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 75px;min-height: 15px;font-size: 12px;");
	mainDiv.appendChild(claimIdDiv);
	mainDiv.appendChild(dateOfServiceDiv);
	mainDiv.appendChild(itemDescDiv);
	mainDiv.appendChild(chargesDiv);
	mainDiv.appendChild(paymentsDiv);
	mainDiv.appendChild(adjustDiv);
	mainDiv.appendChild(withheldDiv);
	mainDiv.appendChild(patBalanceDiv);
	mainDiv.appendChild(insBalanceDiv);
	$("#ledger-table").append(mainDiv);
}
function buildLedger() {
	for (let claims in currentPatientInsData.claims) {
		for (let claimLedger in currentPatientInsData.claims[claims].claimLedger) {
			createRow();
			x++;
		}
	}
	for (let patientBills in currentPatientBillData.patientBills) {
		for (let claimLedger in currentPatientBillData.patientBills[patientBills].billLedger) {
			createRow();
			x++;
		}
	}
}
function writeLedger() {
	let y = 1;
	let dataTable = buildLedger();
	for (let claims in currentPatientInsData.claims) {
		for(let claimLedger in currentPatientInsData.claims[claims].claimLedger) {
			$('#claimId'+ [y]).text(currentPatientInsData.claims[claims].claimLedger[claimLedger].claimId)
			$('#dateOfService'+ [y]).text(currentPatientInsData.claims[claims].claimLedger[claimLedger].date)
			$("#itemDesc"+ [y]).text(currentPatientInsData.claims[claims].claimLedger[claimLedger].description)
			$("#charges" + [y]).text(currentPatientInsData.claims[claims].claimLedger[claimLedger].charges)
			$("#payments" + [y]).text(currentPatientInsData.claims[claims].claimLedger[claimLedger].payments)
			$("#adjust" + [y]).text(currentPatientInsData.claims[claims].claimLedger[claimLedger].adjust)
			$("#withheld" + [y]).text(currentPatientInsData.claims[claims].claimLedger[claimLedger].withheld)
			$("#patBalance" + [y]).text(currentPatientInsData.claims[claims].claimLedger[claimLedger].patBalance)
			$("#insBalance" + [y]).text(currentPatientInsData.claims[claims].claimLedger[claimLedger].insBalance)
			y++;
		}
	}
	for (let patientBills in currentPatientBillData.patientBills) {
		x = x-1;
		for(let billLedger in currentPatientBillData.patientBills[patientBills].billLedger) {
			$("#claimId" +[x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].claimId)
			$("#dateOfService" +[x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].date)
			$("#itemDesc" +[x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].description)
			$("#charges" +[x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].charges)
			$("#payments" +[x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].payments)
			$("#adjust" +[x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].adjust)
			$("#withheld" +[x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].withheld)
			$("#patBalance" +[x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].patBalance)
			$("#insBalance" +[x]).text(currentPatientBillData.patientBills[patientBills].billLedger[billLedger].insBalance)
			x++;
		}
	}
	sortTableByDate();
	sortTableByClaimId();
}
function sortTableByDate() {
	let y = 1;
	didSwap = false;
	let lTable, rows, rows2, switching, h, k, shouldSwitch;
	lTable = document.getElementById("ledger-table");
	switching = true;
	while (switching) {
		rows = document.getElementById("ledger-row" +[y]);
		rows2 = document.getElementById("ledger-row" +[y+1]);
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
			document.getElementById("ledger-row" +[y]).id = "ledger-row" +[y+1];
			document.getElementById("ledger-row" +[y+1]).id = "ledger-row" +[y];
			document.getElementById("claimId" +[y]).id = "claimId" +[y+1];
			document.getElementById("claimId" +[y+1]).id = "claimId" +[y];
			document.getElementById("dateOfService" +[y]).id = "dateOfService" +[y+1];
			document.getElementById("dateOfService" +[y+1]).id = "dateOfService" +[y];
			didSwap = true;
		}
		if (rows2 != null) {
			y++;
		}
	}
}
function sortTableByClaimId() {
	let y = 1;
	didSwap = false;
	let lTable, rows, rows2, h, k, switching, shouldSwitch;
	lTable = document.getElementById("ledger-table");
	switching = true;
	while (switching) {
		rows = document.getElementById("ledger-row" +[y]);
		rows2 = document.getElementById("ledger-row" +[y+1]);
		if(rows2 == null) {
			y = 1;
			if (!didSwap) {
				break;
			}
			didSwap = false;
			}
			if (rows2 != null) {
				h = document.getElementById("claimId"+[y]).innerHTML;
				k = document.getElementById("claimId"+[y+1]).innerHTML;
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
				document.getElementById("ledger-row" +[y]).id = "ledger-row" +[y+1];
				document.getElementById("ledger-row" +[y+1]).id = "ledger-row" +[y];
				document.getElementById("claimId" +[y]).id = "claimId" +[y+1];
				document.getElementById("claimId" +[y+1]).id = "claimId" +[y];
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
    return patientInsData;
}

function onPrintLedgerClick() {
  window.parent.parent.buildModal(1,'patient/account/print_ledger.html',"iframe");
}
function onPostPtPaymentClick() {
  window.parent.parent.buildModal(1,'patient/account/post_pt_payment.html',"iframe");
	window.parent.parent.resizeModal("modal-level-1-content", 930, 675);
}
function onPostInsPaymentClick() {
  window.parent.parent.buildModal(1,'patient/account/post_ins_payment.html',"iframe");
	window.parent.parent.resizeModal("modal-level-1-content", 1000, 555);
}
function onPrintPtStatementClick() {
  window.parent.parent.buildModal(1,'patient/account/print_pt_statement.html',"iframe");
	window.parent.parent.resizeModal("modal-level-1-content", 750, 500);
}
function onBillInsuranceClick() {
  window.parent.parent.buildModal(1,'',"iframe");
}
function onPayNowClick() {
  window.parent.parent.buildModal(1,'',"iframe");
}
function onBillPatientClick() {
  window.parent.parent.buildModal(1,'',"iframe");
}
