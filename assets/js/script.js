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
console.log(hour);
//convert/format to standard time 
//var standardHour = moment(hour, "H").format("h");

var hourNoPeriod;

//DATA ======================================================

//[PLACE] put the date as text onto the proper p tag
currentDayEl.text(schedulerTopDate);


var hourBlocks = ["10am", "11am", "12pm", "1pm", "2pm", "3pm","4pm", "5pm"];

var divContainerEl = $("#container");

/*
var userEntry = {
    hour: hour.value,
    description: description.value.trim(),
    date: date.value
};
*/

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
    textAreaEl.attr("class", "description col col-lg-10");
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

function storeEntry() {
    //to be done
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
        console.log("save button " + event.target.id + " clicked");
        //console.log(event.currentTarget.parentNode.children[0].childNodes[0].textContent);
        var hourPeriodFromBtn = event.currentTarget.parentNode.children[0].childNodes[0].textContent;
        var hourPeriodFromBtnLength = event.currentTarget.parentNode.children[0].childNodes[0].textContent.length;
        console.log(hourPeriodFromBtn);
        //call storeEntry()

        //get just hour; leave off am/pm periods & cast to Number
        //hourNoPeriod = Number(event.target.text.substring(0, event.target.text.length - 2));
        hourNoPeriod = Number(hourPeriodFromBtn.substring(0, hourPeriodFromBtnLength - 2));
        console.log("hourNoPeriod: " + hourNoPeriod);
        //only need afternoon biz hours 1, 2, 3, 4, 5
        if (hourNoPeriod < 12 && hourNoPeriod !== 9 && hourNoPeriod !== 10 && hourNoPeriod !== 11) {
            //convert only afternoon biz hours to military time
            //will be used to compare with momentjs current hour
            hourNoPeriod = hourNoPeriod + 12;
        };
        console.log(hourNoPeriod);
        if (hour === hourNoPeriod) {
            console.log("present");
        };
        if (hour > hourNoPeriod) {
            console.log("past");
        } else {
            console.log("future");
        };

    });

}


//INITIALIZATION ============================================

