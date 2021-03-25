const express = require('express');
const mysql = require('mysql')
const cors=require('cors')

const port = 8000;
const app = express();
app.use(cors())
app.use(express.json());


const connection = mysql.createConnection({
    host: 'db',
    port: process.env.DB_PORT,
    user: 'user',
    password: 'pass',
    database: 'todoapp'
})

connection.connect(error => {
    if (error) throw error;
    console.log("Connected succesfuly");
});

app.listen(port, () => {
    console.log("Success")
})

// get all todos
app.get('/all', function (req, res) {
    const query='SELECT * FROM todos';
    connection.query(query,(error,results)=>{
        if(error) throw error;
        if (results.length>0){
            res.json(results)
        }else{
            res.send("no result")
        }
    })
});

// get only one todo filtered by id
app.get('/all/:id', function (req, res) {
    const {id}=req.params;
    const query=`SELECT * FROM todos WHERE id=${id}`;
    connection.query(query,(error,results)=>{
        if(error) throw error;
        if (results.length>0){
            res.json(results)
        }else{
            res.send("no result")
        }
    })
});

//add a new todo
app.post('/add', function (req, res) {
    const query=`INSERT INTO todos SET ? `;
    
    const todoObject = {
        content: req.body.content,
        done: req.body.done
    }

    console.log(todoObject);
    connection.query(query, todoObject, (error, result) => {
        if (error) throw error;

        res.send({
            id: result.insertId,
            ...todoObject
        });
    })
  });

  //modify or complete an existing todo
  app.put('/update/:id',function (req,res){
      const {id}=req.params;
      const {content}=req.body;
      const {done}=req.body;
      console.log({content});
      console.log({done});
      const query=`UPDATE todos SET content="${content}", done=${done} WHERE id=${id};`
      console.log("entered");

      connection.query(query,error=>{
        if (error) throw error;
        res.send(res.statusCode);
    })
  });

  //delete a todo
  app.delete('/delete/:id',function (req, res){
    const {id}=req.params;
    console.log({id});
    const query=`DELETE FROM todos WHERE id=${id}`;
      connection.query(query,error=>{
        if (error) throw error;
        res.send(res.statusCode);
    })
  })