const mongoose = require('mongoose');
const env = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


const taskRoutes = require("./routes/taskRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const projectRoutes = require('./routes/projectRoutes.js');
const epicRoutes = require('./routes/epicRoutes.js');
const storyRoutes = require('./routes/storyRoutes.js');
const { login } = require('./controllers/auth.js');
const PORT = process.env.PORT || 3002;

//Resolvemos el problema del cors
app.use(cors());

//Middelware para que comprenda los body de las requests
app.use(express.json());


//Cada uno de los controllers
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/epics", epicRoutes);
app.use("/stories", storyRoutes);
app.use("/login", login);

app.get('/', 
	(req, res) => res.send('¡Hola nodemon!')
);

app.listen(PORT, (err, res) => {
    mongoose.connect(process.env.MONGOCONNECTION);
    console.log("Arranco el server");
});
