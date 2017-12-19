function createTableHeader(tableModel , tableHeaders){
    var tr = document.createElement("tr");

    var tdsInnerHTML  = tableHeaders;

    for(var i =0; i<tdsInnerHTML.length; i++){
        var newTd = document.createElement("td");
        newTd.innerHTML = tdsInnerHTML[i];

        tr.append(newTd);
    }
    tableModel.append(tr);
}

function createTableContent(tableModel,data , tableHeaders ,isJoin){
    tableModel.innerHTML = null ;

    createTableHeader(tableModel,tableHeaders);

    data.forEach(function (value) {
        var tr = document.createElement("tr");

        var pageIfNull  = value.page;
        var titleIfNull = value.title;

        var tdHomeworkPage = document.createElement("td");


        var tdHomeworkTitle = document.createElement("td");


        if(isJoin){
            if(pageIfNull === null){
                pageIfNull = "This student doesn't have assignment yet";
            }

            if(titleIfNull === null){
                titleIfNull = "This student doesn't have assignment yet";
            }

            var tdStudentId = document.createElement("td");
            tdStudentId.innerHTML = value.id;

            var tdStudentName = document.createElement("td");
            tdStudentName.innerHTML = value.name;

            tdHomeworkPage.innerHTML = pageIfNull;
            tdHomeworkTitle.innerHTML = titleIfNull;

            var tds = [tdStudentId,tdStudentName,tdHomeworkPage,tdHomeworkTitle];

            for(var j = 0; j<tds.length; j++){
                tr.append(tds[j]);
            }
        }else{
            tdHomeworkPage.innerHTML = pageIfNull;
            tdHomeworkTitle.innerHTML = titleIfNull;

            var onlyTwoTds = [tdHomeworkPage,tdHomeworkTitle];
            for(var i = 0; i<onlyTwoTds.length; i++){
                tr.append(onlyTwoTds[i]);
            }
        }
        tableModel.append(tr);
    });
}

// function addDataToTable(data){
//     var tableModel = document.getElementById("table-model");
//     createTableHeader(tableModel);
// }



function loadLeftJoinData(callbackData){
    var xhrLeft = new XMLHttpRequest();
    xhrLeft.open("GET","http://localhost:9600/student-homework/left-join");
    xhrLeft.onreadystatechange  = function () {
        if(xhrLeft.readyState === 4 && xhrLeft.status === 200){
            callbackData(JSON.parse(xhrLeft.responseText));
        }
    }
    xhrLeft.send();
}

function loadRemainingAssignment(callbackData){
    var xhrRemaining = new XMLHttpRequest();
    xhrRemaining.open("GET","http://localhost:9600/student-homework/remaining-assignment");
    xhrRemaining.onreadystatechange = function () {
        if(xhrRemaining.readyState === 4 && xhrRemaining.status === 200){
            callbackData(JSON.parse(xhrRemaining.responseText));
        }
    }
    xhrRemaining.send();
}

function loadInnerJoinData(callbackData){
    var xhrInner= new XMLHttpRequest();
    xhrInner.open("GET","http://localhost:9600/student-homework/inner-join");

    xhrInner.onreadystatechange = function () {
        if(xhrInner.readyState === 4 && xhrInner.status === 200){
            callbackData(JSON.parse(xhrInner.responseText));
        }
    }

    xhrInner.send();
}




function saveStudentHomework() {

    var studentId = document.getElementById("sh_student").value;
    var homeworkId = document.getElementById("sh_homework").value;

    var xhrStudentHomework = new XMLHttpRequest();

    xhrStudentHomework.open("POST","http://localhost:9600/student-homework");
    xhrStudentHomework.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    xhrStudentHomework.onreadystatechange = function () {
        if(xhrStudentHomework.readyState === 4 && xhrStudentHomework.status === 200){
            console.log(xhrStudentHomework.responseText);
            initRemainingAssignments();
        }
    }

    xhrStudentHomework.send("student_id="+studentId+"&homework_id="+homeworkId);
}


// function initLeftJoinData(){
//     loadLeftJoinData(function(data){
//         createTableContent(document.getElementById("table-model"),data ,["Student ID","Student name","Homework page","Homework title"], true);
//     });
// }
// function initInnerJoinData(){
//     loadInnerJoinData(function (data) {
//         createTableContent(document.getElementById("table-model"),data , ["Student ID","Student name","Homework page","Homework title"] , true);
//     });
// }


function initRemainingAssignments(){
    loadRemainingAssignment(function(data){
       createTableContent(document.getElementById("remaining-assignment"),data,["Homework page","Homework title"] ,false);
    });
}

function listLeftJoinClick(){
    loadLeftJoinData(function(data){
        createTableContent(document.getElementById("table-model"),data ,["Student ID","Student name","Homework page","Homework title"], true);
    });
}
function listInnerJoinClick() {
    loadInnerJoinData(function (data) {
        createTableContent(document.getElementById("table-model"),data , ["Student ID","Student name","Homework page","Homework title"] , true);
    });
}

initRemainingAssignments();