
const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/dcs")
.then(()=>console.log("MOngo db connected"));


const taskModel = require("./models/task");
const userModel = require("./models/user");



app.get("/api/", (req, res) => res.send("Hello World!"));

app.get("/api/list",async (req,res) => {
  const taskList = await taskModel.find({},{ id : true , task:true , day:true , reminder:true});

  if(taskList.length == 0){
    return res.json({ data: "no task in fullstack" });
  }

  return res.json({ data : userList });
});

app.post("/api/Register", (req, res) => {
  const newUser = req.body;
  userModel.create(newUser);
  return res.json({ data: "User added successfully "});
});

app.post("/api/addTask", (req, res) => {
  const newTask = req.body;
  taskModel.create(newTask);
  return res.json({ data: "Task added successfully "});
});

//login user
app.post("/api/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await userModel.findOne({ username: username, password: password });

  if(user){
    return res.json({ data: "login successfully "});
  }

  return res.json({ data: "wrong credential "});
});

//update task
app.put("/api/updatetask/:id",async (err, req,res, next) =>{
  const id = req.params.id;
  const task = req.body.task;
  const day = req.body.day;
  const reminder = req.body.reminder;
    
  const updateTask = await taskModel.findOneAndUpdate(
    { id :id},
    { task : task },
    { day : day },
    { reminder : reminder },
    { new : true }
  );

  console.error(err.stack);
  res.status(500).send('something broke');
  next(err);
  return res.json({ data: "Task update successfully "});
});


//delete user
app.delete("/api/deletetask/:id",async (req,res) =>{
  
  const deletedTask = await taskModel.findOneAndDelete({id : req.params.id});
  return res.json({ data: "Task deleted successfully "});
});

app.listen(port, () => console.log(`server running on port 5000`));


