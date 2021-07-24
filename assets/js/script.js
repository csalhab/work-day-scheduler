//DEPENDENCIES ==============================================

//[CREATE] retrieve p tag id=#currentDay
var currentDayEl = $("#currentDay");

//[BUILD] call moment:
var now = moment();

//format now as example, store into variable schedulerTopDate
//example: Thursday, July 22nd
var schedulerTopDate = now.format("dddd, MMMM Do");

//gets current hour from momentjs now variable
//returns in military 24 hr time
var hour = now.hour();
//console.log(hour);
//convert/format to standard time 
//var standardHour = moment(hour, "H").format("h");

var hourNoPeriod;

//DATA ======================================================

//[PLACE] put the date as text onto the proper p tag
currentDayEl.text(schedulerTopDate);


var hourBlocks = ["10am", "11am", "12pm", "1pm", "2pm", "3pm","4pm", "5pm"];

var divContainerEl = $("#container");

var nineAmTextAreaEl = $("#9am");


//FUNCTIONS =================================================

$.each(hourBlocks, function(i, hourBlock) {
    //Creates a new "<div>" with its children elements:
    //"<div>" "<textarea>" and <button>
    //for each hourBlock
    //Builds & Places them all too
    var divTimeblockEl = $("<div></div>");
    //divTimeblockEl.text(hourBlock);
    divTimeblockEl.attr("class", "time-block row");

    var divEl = $("<div></div>");
    divEl.text(hourBlock);
    divEl.attr("class", "hour col col-lg-1");
    divTimeblockEl.append(divEl);

    var textAreaEl = $("<textarea></textarea>");
    textAreaElClassBackgroundColor = checkPresentPastFuture(hourBlock);
    textAreaEl.attr("class", textAreaElClassBackgroundColor);
    textAreaEl.attr("id", hourBlock);
    divTimeblockEl.append(textAreaEl);

    var buttonEl = $("<button></button>");
    var idCounter = i + 2;
    buttonEl.text("save");
    buttonEl.attr({
        class: "saveBtn btn col col-lg-1",
        id: "saveBtn" + idCounter
    });
    divTimeblockEl.append(buttonEl);

    divContainerEl.append(divTimeblockEl);

 });

function checkPresentPastFuture(hB) {
    
    var present = "bg-danger description col col-lg-10";
    var past = "bg-secondary description col col-lg-10";
    var future = "bg-success description col col-lg-10";
    var tense;
    
    //get the length of hB value, need it to use for substring next
    var hourPeriodLength = hB.length;

    //get just hour; leave off am/pm periods & cast to Number
    hourNoPeriod = Number(hB.substring(0, hourPeriodLength - 2));

    //only need afternoon biz hours 1, 2, 3, 4, 5
    if (hourNoPeriod < 12 && hourNoPeriod !== 9 && hourNoPeriod !== 10 && hourNoPeriod !== 11) {
        //convert only afternoon biz hours to military time
        //will be used to compare with momentjs current hour which is military time already
        hourNoPeriod = hourNoPeriod + 12;
    };

    //determine if current/momentjs hour is present, past or future for 10am-5pm only
    //set the right bootstrap css class for background-color
    if (hour === hourNoPeriod) {
        //console.log("present");
        tense = present;
    };
    if (hour > hourNoPeriod) {
        //console.log("past");
        tense = past;
    } else if (hour < hourNoPeriod) {
        //console.log("future");
        tense = future;
    };

    //determine if current/momentjs hour is present, past or future for 9am block only
    //set the right bootstrap css class for background-color
    if (hour === 9) {
        //console.log("present");
        nineAmTextAreaEl.attr("class", present);
    };
    if (hour > 9) {
        //console.log("past");
        nineAmTextAreaEl.attr("class", past);
    } else if (hour < 9) {
        //console.log("future");
        nineAmTextAreaEl.attr("class", future);
    };

    return tense;
}


function storeEntry(event) {

    var associatedHour = event.currentTarget.parentNode.children[0].textContent;
    //textarea's user's entry
    var description = event.currentTarget.parentNode.children[1].value;

    //object for local storage
    var userEntry = {
        date: now,
        associatedHour: associatedHour,
        description: description.trim()
    };

    //stringify & set key in local storage for userEntry array
    localStorage.setItem("userEntry", JSON.stringify(userEntry));

}

function renderEntry() {
    var lastEntry = JSON.parse(localStorage.getItem("userEntry"));

    if (lastEntry !== null) {
        elementId = lastEntry.associatedHour;
        document.getElementById(elementId).value = lastEntry.description;
    }
}

function init() {
    renderEntry();
}


//USER INTERACTIONS =========================================
//gets and listens for all save buttons being clicked and 
//is able to identify each by their unique id
for (var i = 1; i < hourBlocks.length+2; i++) {
    var saveBtnClicked = "#saveBtn" + i;
    var saveBtnEl = "saveBtnEl" + i;
    var saveBtnEl = $(saveBtnClicked);

    saveBtnEl.on("click", function (event) {
        event.preventDefault();
        //console.log("save button " + event.target.id + " clicked");
        //console.log(event.currentTarget.parentNode.children[0].childNodes[0].textContent);

        storeEntry(event);
    });

}


//INITIALIZATION ============================================
init();
