var sworm =require("sworm");



function DatabaseModel(){
    this.initDB = function(){
        return sworm.db({
            driver : "mysql",
            config : {
                host : "localhost",
                user : "arief",
                password : "arief",
                database : "sworm_db4"
            }
        });
    }

    this.studentModel = function(){
        return this.initDB().model({table : "student"});
    }
    this.homeworkModel = function(){
        return this.initDB().model({table : "homework"});
    }
    this.studentHomeworkModel = function () {
        return this.initDB().model({table : "student_homework", id:["student_id","homework_id"]});
    }

}

module.exports = new DatabaseModel();