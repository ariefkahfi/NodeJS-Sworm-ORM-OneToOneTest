function saveHomework(){
    var homeworkPage = document.getElementById("homework_page").value;
    var homeworkTitle = document.getElementById("homework_title").value;


    var xhrHomework = new XMLHttpRequest();
    xhrHomework.open("POST","http://localhost:9600/homework");
    xhrHomework.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    xhrHomework.onreadystatechange = function () {
        if(xhrHomework.readyState ===4  && xhrHomework.status === 200){
            console.log(xhrHomework.responseText);
        }
    }

    xhrHomework.send("page="+homeworkPage+"&title="+homeworkTitle);
}
function saveStudent(){
    var studentName = document.getElementById("student_name").value;

    var xhrStudent = new XMLHttpRequest();
    xhrStudent.open("POST","http://localhost:9600/student");
    xhrStudent.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    xhrStudent.onreadystatechange = function () {
        if(xhrStudent.readyState === 4 && xhrStudent.status === 200){
            console.log(xhrStudent.responseText);
        }
    }

    xhrStudent.send("name="+studentName);
}
