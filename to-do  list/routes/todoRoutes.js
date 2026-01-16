const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let todos = [];

// READ
app.get("/", (req, res) => {
    res.render("index", { todos });
});

// CREATE
app.post("/add", (req, res) => {
    const task = req.body.task;

    todos.push({
        id: new Date().getTime(),
        task: task
    });

    res.redirect("/");
});

// DELETE
app.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    todos = todos.filter(item => item.id != id);
    res.redirect("/");
});

// EDIT PAGE
app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const todo = todos.find(item => item.id == id);
    res.render("edit", { todo });
});

// UPDATE
app.post("/update/:id", (req, res) => {
    const id = req.params.id;
    const newTask = req.body.task;

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos[i].task = newTask;
        }
    }

    res.redirect("/");
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});
