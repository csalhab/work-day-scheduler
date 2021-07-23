//DEPENDENCIES ==============================================

//[CREATE] retrieve p tag id=#currentDay
var currentDayEl = $("#currentDay");

//[BUILD] call moment, format as example, store into variable now
//example: Thursday, July 22nd
var now = moment().format("dddd, MMMM Do");

//DATA ======================================================

//[PLACE] put the date as text onto the proper p tag
currentDayEl.text(now);

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
        //call storeEntry()
    });

}


//INITIALIZATION ============================================

