# todo_MOAB3
NOTE: This App won't work if you don't have the DB in background
You must adapt this in routes/todoAPI.js
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'user_db',
    password: ',,user332',
    database: 'todo'
});

DB Schema
|user
|- iduser INT(11) Primary Key, Not Null, Unique, AutoIncrement
|- username VARCHAR(45) Unique
|- password VARCHAR(32)
|session_keys
|- userid INT(11) Not Null
|- session_key INT(11) Primary Key, Not Null, Unique
|todos
|- idtodos INT(11) Primary Key, Not Null, Auto Increment
|- user INT(11) Foreign Key (user.iduser)
|- topic VARCHAR(45)
|- description VARCHAR(500)
|- isDone TINYINT(4)
|todo_tasks
|- idtodo_tasks INT(11) Primary Key, Not Null, Auto Increment
|- todo INT(11) Foreign Key(todos.idtodos)
|- task VARCHAR(45)
|- isDone TINYINT(4)
