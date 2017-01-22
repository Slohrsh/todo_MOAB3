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

var validateSessionKey = function(sessionKey){
    var id = 0;
    var query =
        "SELECT user_id as ID " +
        "FROM session_keys " +
        "WHERE session_key = '"+sessionKey+"'";

    connection.query(query, function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            var id = 0;
            if(rows.affectedRows == 0){
                id = 0;
            }else {
                id = rows[0].ID;
            }
        }
    });
};

router.get('/', function(req, res, next) {
    res.render('API_documentation');
});

router.post('/createUser', function(req, res, next){
    var user = req.body.user;
    var password = req.body.password;

    var query =
        "INSERT INTO user (username, password) VALUES ('"+user+"', '"+password+"')";

    connection.query(query, function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            res.send("1");
        }
    });

    var createSessionKey = function(userID){
        var sessionKey = Math.floor((Math.random() * 10000000) + 1);
        var query =
            "INSERT INTO session_keys " +
            "(user_id, session_key) " +
            "VALUES ('"+userID+"', '"+sessionKey+"')";
        connection.query(query, function (err, rows) {
            if (err) {
                res.send("-1");
            } else {
                res.send("" + sessionKey);
            }
        });
    }
});

router.post('/userAuthentification', function(req, res, next){
    var user = req.body.user;
    var password = req.body.password;

    var query =
        "SELECT Count(*) AS Result, iduser " +
        "FROM user " +
        "WHERE username = '" + user + "' " +
        "AND password = '" + password + "'";

    connection.query(query, function (err, rows) {
        if (err) {
            res.send("-1");
        } else {
            var result = rows[0].Result;
            if(result == 1){
                var userID = rows[0].iduser;
                createSessionKey(userID);
            }else{
                res.send("0");
            }
        }
    });

    var createSessionKey = function(userID){
        var sessionKey = Math.floor((Math.random() * 10000000) + 1);
        var query =
            "INSERT INTO session_keys " +
            "(user_id, session_key) " +
            "VALUES ('"+userID+"', '"+sessionKey+"')";
        connection.query(query, function (err, rows) {
            if (err) {
                res.send("-1");
            } else {
                res.send("" + sessionKey);
            }
        });
    }
});

router.get('/allTodosFromUser/:sessionkey', function (req, res, next) {
    var userID = validateSessionKey(req.params.sessionkey);

    var query =
        "SELECT user_id as ID " +
        "FROM session_keys " +
        "WHERE session_key = '"+req.params.sessionkey+"'";

    connection.query(query, function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            var id = 0;
            if(rows.affectedRows == 0){
                id = 0;
            }else{
                id = rows[0].ID;
                connection.query("SELECT idtodos, topic, description, isDone " +
                    "FROM todos " +
                    "WHERE user="+id, function (err, rows) {
                    if (err) {
                        console.log(err.message);
                        res.send( { error: err.message  });
                    }
                    res.send(rows);
                });
            }
        }
    });
});

router.post('/newSpecificTodo', function (req, res, next) {
    var sessionKey = req.body.sessionKey;
    var description = req.body.description;
    var topic = req.body.topic;
    var isDone = req.body.isdone;

    var query =
        "SELECT user_id as ID " +
        "FROM session_keys " +
        "WHERE session_key = '"+sessionKey+"'";

    connection.query(query, function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            var id = 0;
            if(rows.affectedRows == 0){
                res.send("Invalid SessionKey!")
            }else{
                id = rows[0].ID;
                var insertQuery = "INSERT INTO todos (user, description, topic, isDone) VALUES " +
                    "("+ id + ", '" + description + "', '" + topic + "', " + isDone + ")";
                connection.query(insertQuery, function (err, rows) {
                    if (err) {
                        res.send(err.message);
                    } else {
                        res.send("Successfully created Todo");
                    }
                });
            }
        }
    });

});

router.post('/getSpecificTodo', function (req, res, next) {
    var idtodo = req.body.idtodo;
    var sessionKey = req.body.sessionkey;

    var query =
        "SELECT user_id as ID " +
        "FROM session_keys " +
        "WHERE session_key = '"+sessionKey+"'";

    connection.query(query, function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            var id = 0;
            if(rows.affectedRows == 0){
                id = 0;
            }else {
                id = rows[0].ID;
                connection.query("SELECT todos.topic, todos.description, todo_tasks.task, todo_tasks.isDone, todo_tasks.idtodo_tasks " +
                    "FROM todos , todo_tasks " +
                    "WHERE todos.idtodos=todo_tasks.todo " +
                    "AND todos.user = "+id+ " " +
                    "AND todos.idtodos = " + idtodo, function (err, rows) {
                    if (err) {
                        console.log(err.message);
                        res.send( { error: err.message  });
                    }
                    res.send(rows);
                });
            }
        }
    });
});

router.put('/updateSpecificTodo', function (req, res, next) {
    var sessionKey = req.body.sessionkey;
    var description = req.body.description;
    var topic = req.body.topic;
    var isDone = req.body.isdone;
    var idtodos = req.body.idtodos;

    var query =
        "SELECT user_id as ID " +
        "FROM session_keys " +
        "WHERE session_key = '"+sessionKey+"'";

    connection.query(query, function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            var userID = 0;
            if(rows.affectedRows == 0){
                userID = 0;
            }else {
                userID = rows[0].ID;
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

                updateQuery +=   "Where user = "+ userID+ " " +
                    "AND idtodos ="+idtodos;

                connection.query(updateQuery , function (err, rows) {
                    if (err) {
                        res.send(err.message);
                    } else {
                        res.send("Successfully updated Todo");
                    }
                });
            }
        }
    });
});

router.put('/deleteSpecificTodo', function (req, res, next) {
    var sessionKey = req.body.sessionkey;
    var idtodos = req.body.idtodos;

    var query =
        "SELECT user_id as ID " +
        "FROM session_keys " +
        "WHERE session_key = '"+sessionKey+"'";

    connection.query(query, function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            var userID = 0;
            if(rows.affectedRows == 0){
                userID = 0;
            }else {
                userID = rows[0].ID;
                connection.query("DELETE FROM todos  " +
                    "WHERE user = "+userID+" " +
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
            }
        }
    });
});

router.post('/newTask', function (req, res, next) {
    var sessionKey = req.body.sessionkey;
    var idtodo = req.body.idtodo;
    var task = req.body.task;
    var isDone = req.body.isdone;

    var query =
        "SELECT user_id as ID " +
        "FROM session_keys " +
        "WHERE session_key = '"+sessionKey+"'";

    connection.query(query, function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            var id = 0;
            if(rows.affectedRows == 0){
                id = 0;
            }else {
                id = rows[0].ID;
                connection.query("INSERT INTO todo_tasks (todo, task, isDone) VALUES"+
                    "("+ idtodo + ", '" + task + "', " + isDone + ")", function (err, rows) {
                    if (err) {
                        res.send(err.message);
                    } else {
                        res.send("Successfully created Task");
                    }
                });
            }
        }
    });
});

router.put('/updateTask', function (req, res, next) {
    var sessionKey = req.body.sessionkey;
    var idtodos = req.body.idtodos;
    var idtodo_tasks = req.body.idtodo_tasks;
    var task = req.body.task;
    var isDone = req.body.isdone;

    var query =
        "SELECT user_id as ID " +
        "FROM session_keys " +
        "WHERE session_key = '"+sessionKey+"'";

    connection.query(query, function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            var userID = 0;
            if(rows.affectedRows == 0){
                userID = 0;
            }else {
                userID = rows[0].ID;
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
            }
        }
    });
});

router.put('/deleteSpecificTask', function (req, res, next) {
    var sessionKey = req.body.sessionkey;
    var idtodo_tasks = req.body.idtodo_tasks;
    var idtodos = req.body.idtodos;

    var query =
        "SELECT user_id as ID " +
        "FROM session_keys " +
        "WHERE session_key = '"+sessionKey+"'";

    connection.query(query, function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            var userID = 0;
            if(rows.affectedRows == 0){
                userID = 0;
            }else {
                userID = rows[0].ID;
                connection.query("DELETE FROM todo_tasks " +
                    "WHERE idtodo_tasks = " + idtodo_tasks + " " +
                    "AND (SELECT COUNT(idtodos) " +
                    "FROM todos " +
                    "WHERE idtodos = " + idtodos + " " +
                    "AND user = "+userID+")>0", function (err, rows) {
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
            }
        }
    });
});

router.put('/deleteAllTasksRelatedToTodo', function (req, res, next) {
    var sessionKey = req.body.sessionkey;
    var idtodos = req.body.idtodos;

    var query =
        "SELECT user_id as ID " +
        "FROM session_keys " +
        "WHERE session_key = '"+sessionKey+"'";

    connection.query(query, function (err, rows) {
        if (err) {
            res.send(err.message);
        } else {
            var id = 0;
            if(rows.affectedRows == 0){
                id = 0;
            }else {
                id = rows[0].ID;
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
            }
        }
    });
});

module.exports = router;