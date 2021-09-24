const express = require('express');
const app = express();
const morgan = require("morgan");
require("dotenv").config();

// require("./connection");
const app = express();

// Middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setttings
app.set('port', process.env.PORT || 4000);

// Routes
// app.use(require("./routes/user.routes"));

app.listen(app.get('port'), () => console.log(`Example app listening on port port!`));