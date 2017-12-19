var path = require("path");
var express = require("express");
var databaseModel = require("./model/database-model");
var bodyParser = require("body-parser");


var student = databaseModel.studentModel();
var homework = databaseModel.homeworkModel();
var studentHomework = databaseModel.studentHomeworkModel();

var app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use("/js",express.static(path.join(__dirname,"app")));





app.get("/student-homework/remaining-assignment",function (req,res) {
    databaseModel
        .initDB()
        .query("select h.page , h.title  from homework h  left join student_homework sh " +
            " on h.page = sh.homework_id left join student s  " +
            " on s.id = sh.student_id  where s.id is null")
        .then(function (value) {
            res.json(value);
        })
        .catch(function (reason) {
            console.log(reason);
        });
});

app.get("/student-homework/left-join",function (req,res) {
    databaseModel
        .initDB()
        .query("select s.id , s.name , h.page , h.title from student s " +
            " left join student_homework sh " +
            " on s.id = sh.student_id " +
            " left join homework h " +
            " on h.page = sh.homework_id")
        .then(function (value) {
            res.json(value);
        })
        .catch(function (reason) {
            res.json(reason);
        });
});
app.get("/student-homework/inner-join",function (req,res) {
    databaseModel
        .initDB()
        .query("select s.id, s.name , h.page , h.title from student s " +
            " inner join student_homework sh " +
            " on s.id = sh.student_id " +
            " inner join homework h " +
            " on h.page = sh.homework_id ")
        .then(function (value) {
            res.json(value);
        })
        .catch(function (reason) {
            res.json(reason);
        });
});

app.post("/homework",function (req,res) {
    homework({
        page : req.body.page,
        title : req.body.title
    }).save()
        .then(function () {
            res.json({
                message : "query OK /homework",
                statusCode : 200
            });
        })
        .catch(function (reason) {
           res.json(reason);
        });
});

app.post("/student",function (req,res) {
    student({
        name : req.body.name
    }).save()
        .then(function () {
            res.json({
                message : "query OK /student",
                statusCode : 200
            });
        })
        .catch(function (reason) {
            res.json(reason);
        });
});

app.post("/student-homework",function (req,res) {
    studentHomework({
        student_id : req.body.student_id,
        homework_id : req.body.homework_id
    }).save()
        .then(function () {
            res.json({
                message : "Query OK",
                statusCode : 200
            })
        })
        .catch(function (reason) {
            res.json(reason);
        });
});



app.get("/list",function (req,res) {
   res.sendFile(path.join(__dirname+"/public_html","list.html"));
});
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname+"/public_html","index.html"));
});

app.listen(9600,function(){
    console.log("listening on port 9600");
});

