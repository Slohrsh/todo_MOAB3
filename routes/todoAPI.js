var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'user_db',
    password: ',,user332',
    database: 'todo'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

router.get('/', function(req, res, next) {
    res.render('API_documentation');
});

router.post('/userAuthentification', function(req, res, next){
    var user = req.body.user;
    var idtodos = req.body.password;

    var query =
        "SELECT Count(*) AS Result" +
        "FROM todo.user " +
        "WHERE username = 'Slohrsh' " +
        "AND password = 'passwordt'";

    connection.query(query, function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            isCorrect = rows.Result;
            if(isCorrect == 1){
                res.send("Correct Credentials");
            }else{
                res.send("Incorrect Credentials");
            }
        }
    });
});

router.get('/allTodosFromUser', function (req, res, next) {
    //ToDo userID vom login holen
    connection.query("SELECT idtodos, topic, description, isDone " +
        "FROM todos " +
        "WHERE user=1", function (err, rows) {
        if (err) {
            console.log(err.message);
            res.send( { error: err.message  });
        }
        res.send(rows);
    });
});

router.post('/newSpecificTodo', function (req, res, next) {
    var userID = req.headers.userid; // Todo irgendwie nach authentifizierung gönnen
    var description = req.headers.description;
    var topic = req.headers.topic;
    var isDone = req.headers.isdone;
    //Todo was gegen SQL-Injection machen!!!
    connection.query("INSERT INTO todos (user, description, topic, isDone) VALUES " +
        "("+ userID + ", '" + description + "', '" + topic + "', " + isDone + ")", function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            res.send("Successfully created Todo");
        }
    });
});

router.get('/getSpecificTodo/:idtodo', function (req, res, next) {
    //ToDo userID vom login holen
    var idtodo = req.params.idtodo;
    connection.query("SELECT todos.topic, todos.description, todo_tasks.task, todo_tasks.isDone, todo_tasks.idtodo_tasks " +
        "FROM todos , todo_tasks " +
        "WHERE todos.idtodos=todo_tasks.todo " +
        "AND todos.user = 1 " +
        "AND todos.idtodos = " + idtodo, function (err, rows) {
        if (err) {
            console.log(err.message);
            res.send( { error: err.message  });
        }
        res.send(rows);
    });
});

router.put('/updateSpecificTodo', function (req, res, next) {
    var user = req.headers.user; // Todo irgendwie nach authentifizierung gönnen
    var description = req.headers.description;
    var topic = req.headers.topic;
    var isDone = req.headers.isdone;
    var idtodos = req.headers.idtodos;//Todo Aus Kontext beschaffen

    var updateQuery = "UPDATE todos SET ";

    if(topic != undefined){
        updateQuery += "topic = '" + topic + "' ";
    }
    if(description != undefined){
        updateQuery += ",description = '" + description + "' ";
    }
    if(isDone != undefined){
        updateQuery += ",isDone = " + isDone + " ";
    }

    updateQuery +=   "Where user = 1 " +
        "AND idtodos ="+idtodos;

    connection.query(updateQuery , function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            res.send("Successfully updated Todo");
        }
    });
});

router.delete('/deleteSpecificTodo', function (req, res, next) {
    var user = req.headers.user; //ToDo userID vom login holen
    var idtodos = req.headers.idtodos;//Todo Aus Kontext beschaffen
    connection.query("DELETE FROM todos  " +
        "WHERE user = 1 " +
        "AND idtodos = "+ idtodos + " " +
        "AND (SELECT COUNT(todo) " +
        "FROM todo_tasks " +
        "WHERE todo = " + idtodos + ")<=0", function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            if (rows.affectedRows == 0) {
                res.send("Error deleting specific todo");
            } else {
                res.send("Successfully deleted todo");
            }
        }
    });
});

router.post('/newTask', function (req, res, next) {
    var idtodo = req.headers.idtodo;
    var task = req.headers.task;
    var isDone = req.headers.isdone;
    //Todo was gegen SQL-Injection machen!!!
    connection.query("INSERT INTO todo_tasks (todo, task, isDone) VALUES"+
        "("+ idtodo + ", '" + task + "', " + isDone + ")", function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            res.send("Successfully created Task");
        }
    });
});

router.put('/updateTask', function (req, res, next) {
    var user = req.body.user; // Todo irgendwie nach authentifizierung gönnen
    var idtodos = req.body.idtodos;
    var idtodo_tasks = req.body.idtodo_tasks;
    var task = req.body.task;
    var isDone = req.body.isdone;


    var updateQuery = "UPDATE todo_tasks SET ";

    if(task != undefined){
        updateQuery += "task = '" + task + "' ";
    }
    if(isDone != undefined){
        updateQuery += ",isDone = " + isDone + " ";
    }

    updateQuery += "WHERE idtodo_tasks =" + idtodo_tasks;

    connection.query(updateQuery , function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            if (rows.affectedRows == 0) {
                res.send("Error updating specific Task");
            }
            else{
                res.send("Successfully updated Task");
            }
        }
    });
});

router.delete('/deleteSpecificTask', function (req, res, next) {
    var user = req.headers.user; //ToDo userID vom login holen
    var idtodo_tasks = req.headers.idtodo_tasks;//Todo Aus Kontext beschaffen
    var idtodos = req.headers.idtodos;
    connection.query("DELETE FROM todo_tasks " +
        "WHERE idtodo_tasks = " + idtodo_tasks + " " +
        "AND (SELECT COUNT(idtodos) " +
        "FROM todos " +
        "WHERE idtodos = " + idtodos + " " +
        "AND user = 1)>0", function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            if (rows.affectedRows == 0) {
                res.send("Error deleting specific todo");
            } else {
                res.send("Successfully deleted specific Task");
            }
        }
    });
});

router.delete('/deleteAllTasksRelatedToTodo', function (req, res, next) {
    var user = req.headers.user; //ToDo userID vom login holen
    var idtodos = req.headers.idtodos;
    connection.query("DELETE FROM todo_tasks " +
        "WHERE todo = " + idtodos + " " +
        "AND (SELECT COUNT(idtodos) " +
        "FROM todos " +
        "WHERE idtodos = " + idtodos + " " +
        "AND user = 1)>0", function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            if (rows.affectedRows == 0) {
                res.send("Error deleting specific todo");
            } else {
                res.send("Successfully deleted all Task referenced to Todo");
            }
        }
    });
});

module.exports = router;