const Todo = require("../Model/Todo");

// Get a list of all the tasks
const getTodos = async (req, res) => {
    console.log(
        "Getting todos",
        res
    );
    try {
        const todos = await Todo.find().exec();
        res.json(todos);
    } catch (err) {
        console.error("Error fetching todos:", err);
        res.status(500).send(err);
    }
};

// Create a new Todo
const createTodo = async (req, res) => {
    console.log("Creating todo", req.params);
    const todos = new Todo({
        title: req.body.title,
        description: req.body.description,
        Completed: req.body.Completed
    });
    try {
        const savedTodo = await todos.save();
        res.json(savedTodo);
    } catch (err) {
        console.error("Error creating todo:", err);
        res.status(500).send(err);
    }
};


// updateTodo

const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: req.params.todoID },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    completed: req.body.completed,
                },
            },
            { new: true }
        ).exec();
        res.json(updatedTodo);
    } catch (err) {
        log.error("Error updating todo:", err);
        res.status(500).send(err);
    }
}

// Delete a Todo
const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findOneAndDelete
            ({ _id: req.params.todoID })
            .exec();
        res.json({ deletedTodo });
    } catch (err) {
        console.error("Error deleting todo:", err);
        res.status(500).send(err);
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};
