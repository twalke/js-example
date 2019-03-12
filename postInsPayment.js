$(document).ready(function() {})

let previousParameter;
let updateInsClaimRequest = new XMLHttpRequest();
let userSettings = JSON.parse(sessionStorage.getItem('userSettings'));
let patientId = userSettings.curPa;
let patientData =JSON.parse(sessionStorage.getItem("patient_data"));
let patientBillData = JSON.parse(sessionStorage.getItem("patientBills"));
let postInsData = JSON.parse(sessionStorage.getItem('insuranceClaims'));
let currentPatient = patientData[patientId];
let currentPatientBillData = patientBillData[currentPatient.patientBillsId];
let patientInsId = currentPatient.patientInsId;
let currentPostInsData = postInsData[patientInsId];
let insuranceData = JSON.parse(sessionStorage.getItem("insuranceData"));
//let currentInsuranceData = insuranceData[]

let x = 1;
let z = 0;

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

function buildPostInsPaymentLedger() {
  x = 1;
  document.getElementById("ins-post-table").innerHTML = "";
  currentPostInsData = JSON.parse(sessionStorage.getItem("insuranceClaims"));
  currentPostInsData = currentPostInsData[patientInsId];
	for (let claims in currentPostInsData.claims) {
		for (let claimLedger in currentPostInsData.claims[claims].claimLedger) {
			createRow();
			x++;
		}
	}
}
function createRow() {
	let mainDiv = document.createElement("div");
	mainDiv.setAttribute("id", "post-ins-row" +[x]);
	mainDiv.setAttribute("class", "flex-container-row");
	let checkboxDiv = document.createElement("input");
	checkboxDiv.setAttribute("type", "checkbox");
	checkboxDiv.setAttribute("id", "checkbox" +[x]);
	let claimIdDiv = document.createElement("div");
	claimIdDiv.setAttribute("id", "claimId" +[x]);
	claimIdDiv.setAttribute("class", "flex-container-column");
	claimIdDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 62px;min-height: 15px;font-size: 12px;");
  // if(x==1) {claimIdDiv.setAttribute("style", "border-top: 1px solid black;")};
  let dateOfServiceDiv = document.createElement("div");
	dateOfServiceDiv.setAttribute("id", "date" +[x]);
	dateOfServiceDiv.setAttribute("class", "flex-container-column");
	dateOfServiceDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 74px;min-height: 15px;font-size: 12px;");
	// let patientLastNameDiv = document.createElement("div");
	// patientLastNameDiv.setAttribute("id", "patientLastName" +[x]);
	// patientLastNameDiv.setAttribute("class", "flex-container-column");
	// patientLastNameDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 62px;min-height: 15px;font-size: 12px;");
	let billedDiv = document.createElement("div");
	billedDiv.setAttribute("id", "billed" +[x]);
	billedDiv.setAttribute("class", "flex-container-column");
	billedDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 62px;min-height: 15px;font-size: 12px;");
	let allowedDiv = document.createElement("div");
	allowedDiv.setAttribute("id", "allowed" + [x]);
	allowedDiv.setAttribute("class", "flex-container-column");
	allowedDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 62px;min-height: 15px;font-size: 12px;");
	let deductDiv = document.createElement("div");
	deductDiv.setAttribute("id", "deduct" +[x]);
	deductDiv.setAttribute("class", "flex-container-column");
	deductDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 62px;min-height: 15px;font-size: 12px;");
	let coInsDiv = document.createElement("div");
	coInsDiv.setAttribute("id", "coIns" +[x]);
	coInsDiv.setAttribute("class", "flex-container-column");
	coInsDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 62px;min-height: 15px;font-size: 12px;");
	let coPayDiv = document.createElement("div");
	coPayDiv.setAttribute("id", "coPay" +[x]);
	coPayDiv.setAttribute("class", "flex-container-column");
	coPayDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 62px;min-height: 15px;font-size: 12px;");
	let paidDiv = document.createElement("div");
	paidDiv.setAttribute("id", "paid" +[x]);
	paidDiv.setAttribute("class", "flex-container-column");
	paidDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 62px;min-height: 15px;font-size: 12px;");
	let adjustDiv = document.createElement("div");
	adjustDiv.setAttribute("id", "adjust" +[x]);
	adjustDiv.setAttribute("class", "flex-container-column");
	adjustDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 62px;min-height: 15px;font-size: 12px;");
	let withheldDiv = document.createElement("div");
	withheldDiv.setAttribute("id", "withheld" +[x]);
	withheldDiv.setAttribute("class", "flex-container-column");
	withheldDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 62px;min-height: 15px;font-size: 12px;");
	let codeDiv = document.createElement("div");
	codeDiv.setAttribute("id", "claimType" +[x]);
	codeDiv.setAttribute("class", "flex-container-column");
	codeDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 62px;min-height: 15px;font-size: 12px;");
	let claimBalanceDiv = document.createElement("div");
	claimBalanceDiv.setAttribute("id", "claimBalance" +[x]);
	claimBalanceDiv.setAttribute("class", "flex-container-column");
	claimBalanceDiv.setAttribute("style", "border-right: 1px solid black;border-bottom: 1px solid black;padding-top:5px;padding-left: 10px;min-width: 62px;min-height: 15px;font-size: 12px;");

	mainDiv.appendChild(checkboxDiv);
	mainDiv.appendChild(claimIdDiv);
	mainDiv.appendChild(dateOfServiceDiv);
	//mainDiv.appendChild(patientLastNameDiv);
	mainDiv.appendChild(billedDiv);
	mainDiv.appendChild(allowedDiv);
	mainDiv.appendChild(deductDiv);
	mainDiv.appendChild(coInsDiv);
	mainDiv.appendChild(coPayDiv);
	mainDiv.appendChild(paidDiv);
	mainDiv.appendChild(adjustDiv);
	mainDiv.appendChild(withheldDiv);
	mainDiv.appendChild(codeDiv);
	mainDiv.appendChild(claimBalanceDiv);
	$("#ins-post-table").append(mainDiv);
}
function writePostInsPaymentLedger() {
	let y = 1;
	let dataTable = buildPostInsPaymentLedger();
  currentPostInsData = JSON.parse(sessionStorage.getItem("insuranceClaims"));
  currentPostInsData = currentPostInsData[patientInsId];
	for (let claims in currentPostInsData.claims) {
		for (let claimLedger in currentPostInsData.claims[claims].claimLedger) {
	    $('#claimId' + [y]).text(currentPostInsData.claims[claims].claimLedger[claimLedger].claimId)
			$('#date' + [y]).text(currentPostInsData.claims[claims].claimLedger[claimLedger].date)
	    //$('#patientLastName' + [y]).text(currentPostInsData.claims[claims].claimLedger[claimLedger].patientLastName)
			$('#billed' + [y]).text(currentPostInsData.claims[claims].claimLedger[claimLedger].billed)
			$('#allowed' + [y]).text(currentPostInsData.claims[claims].claimLedger[claimLedger].allowed)
			$('#deduct' + [y]).text(currentPostInsData.claims[claims].claimLedger[claimLedger].deduct)
			$('#coIns' + [y]).text(currentPostInsData.claims[claims].claimLedger[claimLedger].coIns)
			$('#coPay' + [y]).text(currentPostInsData.claims[claims].claimLedger[claimLedger].coPay)
			$('#paid' + [y]).text(currentPostInsData.claims[claims].claimLedger[claimLedger].paid)
			$('#adjust' + [y]).text(currentPostInsData.claims[claims].claimLedger[claimLedger].adjust)
			$('#withheld' + [y]).text(currentPostInsData.claims[claims].claimLedger[claimLedger].withheld)
			$('#claimType' + [y]).text(currentPostInsData.claims[claims].claimLedger[claimLedger].cptCode)
			$('#claimBalance' + [y]).text(currentPostInsData.claims[claims].claimLedger[claimLedger].claimBalance)
			y++;
		}
	}
	sortTableByDate();
	sortTableByClaimId();
  postedAmountTotal();
}
function sortTableByDate() {
	let y = 1;
	didSwap = false;
	let lTable, rows, rows2, switching, h, k, shouldSwitch;
	lTable = document.getElementById("ins-post-table");
	switching = true;
	while (switching) {
		rows = document.getElementById("post-ins-row" +[y]);
		rows2 = document.getElementById("post-ins-row" +[y+1]);
		if(rows2 == null) {
			y = 1;
			if (!didSwap) {
				break;
			}
			didSwap = false;
		}
		if (rows2 != null) {
			h = document.getElementById("date"+[y]).innerHTML;
			k = document.getElementById("date"+[y+1]).innerHTML;
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
			document.getElementById("post-ins-row" +[y]).id = "post-ins-row" +[y+1];
			document.getElementById("post-ins-row" +[y+1]).id = "post-ins-row" +[y];
			document.getElementById("claimId" +[y]).id = "claimId" +[y+1];
			document.getElementById("claimId" +[y+1]).id = "claimId" +[y];
			document.getElementById("date" +[y]).id = "date" +[y+1];
			document.getElementById("date" +[y+1]).id = "date" +[y];
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
	lTable = document.getElementById("ins-post-table");
	switching = true;
	while (switching) {
		rows = document.getElementById("post-ins-row" +[y]);
		rows2 = document.getElementById("post-ins-row" +[y+1]);
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
				document.getElementById("post-ins-row" +[y]).id = "post-ins-row" +[y+1];
				document.getElementById("post-ins-row" +[y+1]).id = "post-ins-row" +[y];
				document.getElementById("claimId" +[y]).id = "claimId" +[y+1];
				document.getElementById("claimId" +[y+1]).id = "claimId" +[y];
				document.getElementById("date" +[y]).id = "date" +[y+1];
				document.getElementById("date" +[y+1]).id = "date" +[y];
				didSwap = true;
			}
		if (rows2 != null) {
			y++;
		}
	}
}
function onDeleteClick(id) {
	// let val = currentPostInsData.claims[claims];
	//click ckeckbox
	//hit Delete
	// look at the number in id
	// set data in row to null
	// remove row
	let y = 1;
	let table = document.getElementById("ins-post-table");
	let row = document.getElementById("post-ins-row" +[y]);
	table.deleteRow(id);
}
// function claimName() {
// 	if (z == 0) {
// 		let i = "Add Claim";
// 		return i;
// 	} else if (z == 1) {
// 		let i = "Save Claim";
// 		return i;
// 	}
// }
//document.getElementById("add-claim-button").innerHTML = claimName();
// function onSaveClick() {
// 	let insuranceClaims = JSON.parse(sessionStorage.getItem('insuranceClaims'));
// 	let newId;
// 	let newClaim = JSON.parse(JSON.stringify(insuranceClaims['00000000'].claims["00000000"]));
// 	let currentPostInsData = insuranceClaims[patientInsId];
// 	for (let i in insuranceClaims[patientInsId].claims) {
// 		newId = i;
// 	}
// 	newId = padId((parseInt(newId, 16)+1).toString(16),8);
// 	insuranceClaims[patientInsId].claims[newId] = newClaim;
// 	if (!isNaN(document.getElementById("date" +[x-1]).value.charAt(0))){
// 		newClaim['date']=document.getElementById("date" +[x-1]).value;
// 	}
// 	if (!isNaN(document.getElementById("billed" +[x-1]).value)) {
// 		newClaim['billed']=document.getElementById("billed" +[x-1]).value;
// 	}
// 	if (!isNaN(document.getElementById("allowed" +[x-1]).value)) {
// 		newClaim['allowed']=document.getElementById("allowed" +[x-1]).value;
// 	}
// 	if (!isNaN(document.getElementById("deduct" +[x-1]).value)) {
// 		newClaim['deduct']=document.getElementById("deduct" +[x-1]).value;
// 	}
// 	if (!isNaN(document.getElementById("coIns" +[x-1]).value)) {
// 		newClaim['coIns']=document.getElementById("coIns" +[x-1]).value;
// 	}
// 	if (!isNaN(document.getElementById("coPay" +[x-1]).value)) {
// 		newClaim['coPay']=document.getElementById("coPay" +[x-1]).value;
// 	}
// 	if (!isNaN(document.getElementById("paid" +[x-1]).value)) {
// 		newClaim['paid']=document.getElementById("paid" +[x-1]).value;
// 	}
// 	if (!isNaN(document.getElementById("adjust" +[x-1]).value)) {
// 		newClaim['adjust']=document.getElementById("adjust" +[x-1]).value;
// 	}
// 	if (!isNaN(document.getElementById("witheld" +[x-1]).value)) {
// 		newClaim['witheld']=document.getElementById("witheld" +[x-1]).value;
// 	}
// 	if (isNaN(document.getElementById("claimType" +[x-1]).value)) {
// 		newClaim['claimType']=document.getElementById("claimType" +[x-1]).value;
// 	}
// 	if (!isNaN(document.getElementById("claimBalance" +[x-1]).value)) {
// 		newClaim['claimBalance']=document.getElementById("claimBalance" +[x-1]).value;
// 	}
//
//
// 	sessionStorage.setItem('insuranceClaims', JSON.stringify(insuranceClaims));
// }
function idText() {
	let i = document.getElementById("claim-id-input").value;
	document.getElementById("claimId"+ [x]).innerHTML = i;
}
function onAddClick() {
	let mainDiv = document.createElement("div");
	mainDiv.setAttribute("id", "post-ins-row" +[x]);
	mainDiv.setAttribute("class", "flex-container-row");
	let checkboxDiv = document.createElement("input");
	checkboxDiv.setAttribute("type", "checkbox");
	checkboxDiv.setAttribute("id", "checkbox" +[x]);
	let claimIdDiv = document.createElement("div");
	claimIdDiv.setAttribute("id", "claimId" +[x]);
	claimIdDiv.setAttribute("class", "flex-container-column");
	claimIdDiv.setAttribute("style", "padding-top:5px;padding-left: 10px;min-width: 64px;min-height: 15px;font-size: 12px;");
	let dateOfServiceDiv = document.createElement("input");
	dateOfServiceDiv.setAttribute("id", "date" +[x]);
	dateOfServiceDiv.setAttribute("type", "text");
	dateOfServiceDiv.setAttribute("size", "12");
	dateOfServiceDiv.setAttribute("class", "flex-container-column");
	// let patientLastNameDiv = document.createElement("input");
	// patientLastNameDiv.setAttribute("id", "patientLastName" +[x]);
	// patientLastNameDiv.setAttribute("type", "text");
	// patientLastNameDiv.setAttribute("size", "10");
	// patientLastNameDiv.setAttribute("class", "flex-container-column");
	let billedDiv = document.createElement("input");
	billedDiv.setAttribute("id", "billed" +[x]);
	billedDiv.setAttribute("type", "text");
	billedDiv.setAttribute("size", "10");
	billedDiv.setAttribute("class", "flex-container-column");
	let allowedDiv = document.createElement("input");
	allowedDiv.setAttribute("id", "allowed" + [x]);
	allowedDiv.setAttribute("type", "text");
	allowedDiv.setAttribute("size", "10");
	allowedDiv.setAttribute("class", "flex-container-column");
	let deductDiv = document.createElement("input");
	deductDiv.setAttribute("id", "deduct" +[x]);
	deductDiv.setAttribute("type", "text");
	deductDiv.setAttribute("size", "10");
	deductDiv.setAttribute("class", "flex-container-column");
	let coInsDiv = document.createElement("input");
	coInsDiv.setAttribute("id", "coIns" +[x]);
	coInsDiv.setAttribute("type", "text");
	coInsDiv.setAttribute("size", "10");
	coInsDiv.setAttribute("class", "flex-container-column");
	let coPayDiv = document.createElement("input");
	coPayDiv.setAttribute("id", "coPay" +[x]);
	coPayDiv.setAttribute("type", "text");
	coPayDiv.setAttribute("size", "10");
	coPayDiv.setAttribute("class", "flex-container-column");
	let paidDiv = document.createElement("input");
	paidDiv.setAttribute("id", "paid" +[x]);
	paidDiv.setAttribute("type", "text");
	paidDiv.setAttribute("size", "10");
	paidDiv.setAttribute("class", "flex-container-column");
	let adjustDiv = document.createElement("input");
	adjustDiv.setAttribute("id", "adjust" +[x]);
	adjustDiv.setAttribute("type", "text");
	adjustDiv.setAttribute("size", "10");
	adjustDiv.setAttribute("class", "flex-container-column");
	let withheldDiv = document.createElement("input");
	withheldDiv.setAttribute("id", "withheld" +[x]);
	withheldDiv.setAttribute("type", "text");
	withheldDiv.setAttribute("size", "10");
	withheldDiv.setAttribute("class", "flex-container-column");
	let codeDiv = document.createElement("input");
	codeDiv.setAttribute("id", "claimType" +[x]);
	codeDiv.setAttribute("type", "text");
	codeDiv.setAttribute("size", "10");
	codeDiv.setAttribute("class", "flex-container-column");
	let claimBalanceDiv = document.createElement("input");
	claimBalanceDiv.setAttribute("id", "claimBalance" +[x]);
	claimBalanceDiv.setAttribute("type", "text");
	claimBalanceDiv.setAttribute("size", "10");
	claimBalanceDiv.setAttribute("class", "flex-container-column");

	mainDiv.appendChild(checkboxDiv);
	mainDiv.appendChild(claimIdDiv);
	mainDiv.appendChild(dateOfServiceDiv);
	//mainDiv.appendChild(patientLastNameDiv);
	mainDiv.appendChild(billedDiv);
	mainDiv.appendChild(allowedDiv);
	mainDiv.appendChild(deductDiv);
	mainDiv.appendChild(coInsDiv);
	mainDiv.appendChild(coPayDiv);
	mainDiv.appendChild(paidDiv);
	mainDiv.appendChild(adjustDiv);
	mainDiv.appendChild(withheldDiv);
	mainDiv.appendChild(codeDiv);
	mainDiv.appendChild(claimBalanceDiv);
	$("#ins-post-table").append(mainDiv);
	idText();
	x++;
}
function getPatientData(){
    return postInsData;
}

function closeOut() {
	window.parent.parent.dismissModal();
}
function searchClaimIdList(source) {
  let searchResults = {};
  let index= 0;
  previousParameter = source.value;
  let searchParameter = source.value;
  let claimIds ={"12345678":"0000001", "22345679":"0000002", "32345677":"0000003"};

  for (let c in claimIds){
      if (c.includes(searchParameter)){
          let tempId = claimIds[c];
          // add to result list
          searchResults[index++] = c;
      }
  }
  source.value = searchResults[0];
}
function resetClaimSearch(source) {
  if(previosParameter!=undefined){
    source.value = previousParameter;
  }
}
function onSaveNewClaim() {
  claimData = JSON.parse(sessionStorage.getItem('insuranceClaims'));
  let claimLedger;

	let i = document.getElementById("claimId"+[x-1]).innerHTML;

	if (i != "") {
		let tempClaim = document.getElementById("claimId" +[x-1]).innerHTML;
    let tempDate = document.getElementById("date" +[x-1]).value;
    let tempBilled = document.getElementById("billed" +[x-1]).value;
    let tempAllowed = document.getElementById("allowed" +[x-1]).value;
    let tempDeduct = document.getElementById("deduct" +[x-1]).value;
    let tempCoIns = document.getElementById("coIns" +[x-1]).value;
    let tempCoPay = document.getElementById("coPay" +[x-1]).value;
    let tempPaid = document.getElementById("paid" +[x-1]).value;
    let tempAdjust = document.getElementById("adjust" +[x-1]).value;
    let tempWithheld = document.getElementById("withheld" +[x-1]).value;
    let tempClaimType = document.getElementById("claimType" +[x-1]).value;
    let tempClaimBalance = document.getElementById("claimBalance" +[x-1]).value;

    for (let j in claimData[patientInsId].claims[tempClaim].claimLedger) {
      claimLedger = j;
    }
    claimLedger = padId((parseInt(claimLedger, 16) + 1).toString(16), 2);

    claimData[patientInsId].claims[tempClaim].claimLedger[claimLedger] = {};

    claimData[patientInsId].claims[tempClaim].claimLedger[claimLedger].claimId = tempClaim;
    claimData[patientInsId].claims[tempClaim].claimLedger[claimLedger].date = tempDate;
    claimData[patientInsId].claims[tempClaim].claimLedger[claimLedger].billed = tempBilled;
    claimData[patientInsId].claims[tempClaim].claimLedger[claimLedger].allowed = tempAllowed;
    claimData[patientInsId].claims[tempClaim].claimLedger[claimLedger].deduct = tempDeduct;
    claimData[patientInsId].claims[tempClaim].claimLedger[claimLedger].coIns = tempCoIns;
    claimData[patientInsId].claims[tempClaim].claimLedger[claimLedger].coPay = tempCoPay;
    claimData[patientInsId].claims[tempClaim].claimLedger[claimLedger].paid = tempPaid;
    claimData[patientInsId].claims[tempClaim].claimLedger[claimLedger].adjust = tempAdjust;
    claimData[patientInsId].claims[tempClaim].claimLedger[claimLedger].withheld = tempWithheld;
    claimData[patientInsId].claims[tempClaim].claimLedger[claimLedger].claimType = tempClaimType;
    claimData[patientInsId].claims[tempClaim].claimLedger[claimLedger].claimBalance = tempClaimBalance;

    sessionStorage.setItem('insuranceClaims', JSON.stringify(claimData));

		let updateInsClaimRequestUrl = `${subdomain}/api/v1/jambic/${patientInsId}.update-ic`;
		updateInsClaimRequest.open('PUT', updateInsClaimRequestUrl, true);
		updateInsClaimRequest.setRequestHeader("Content-type", "application/json");
		updateInsClaimRequest.addEventListener("readystatechange", handleUpdateClaimResponse, false);
		updateInsClaimRequest.send(JSON.stringify(claimData[patientInsId]));


		buildPostInsPaymentLedger();
    writePostInsPaymentLedger();
	}
}
function handleUpdateClaimResponse() {
	if (updateInsClaimRequest.readyState = 4) {
		//do something or whatever but maybe not
	}
}
function padId(value, digits) {
  var id = value + '';
  var padding = '';
  for(var i = 0; i < digits - id.length; i++){
      padding += 0;
  }
  return padding += id;
}
function selectInsCompany(source) {
  let selectValue = source.value;
}
$(document).ready(function(){
  $.getJSON("jambic-web-app/testing/jambic_testing/jambic/server/JSON/insurance_companies.json",function(obj) {
    for (let companies in insuranceData) {
      if(insuranceData[companies].insCompanyId == '00000000') {
        continue;
      }
      let option = insuranceData[companies].insName;
      let insCompanyId = insuranceData[companies].insCompanyId;
      let optionEl = document.createElement("option");
      optionEl.innerHTML = option;
      optionEl.value = insCompanyId;
      $("#dropDownDest").append(optionEl);
    }
  });
});
function onNewClick() {
  window.parent.parent.buildModal(2,'settings/insurances/new_insurance_form.html',"iframe");
	window.parent.parent.resizeModal("modal-level-2-content", 830, 475);
}

let today = new Date().toISOString().substr(0, 10);
document.querySelector("#paymentDate").value = today;
document.querySelector("#checkDate").value = today;

function postedAmountTotal() {
	tempPtBal = 0;
	for (let i = 1; i < x; i++) {
		let j = document.getElementById("paid" +[i]).innerHTML;
		if(j =="") {
			continue;
		}
		tempPtBal = tempPtBal + parseFloat(j);
	}
	document.getElementById("postedAmount").innerHTML = tempPtBal.toFixed(2);
}
