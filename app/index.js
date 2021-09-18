const path = require("path");

const express = require("express");
const session = require("express-session");
let flash = require('connect-flash');
const MongoStore = require('connect-mongo');
let debug = require('debug')('application');

const renderMiddleware = require("@middleware/render");
const app = express();

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MANGO_URL })
}))
app.use(flash());

// template engine
app.set("view engine", "ejs");
app.set("views", "view");

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

renderMiddleware(app);

//router
require("@router/indexRouter")(app);
debug("route");


const port = process.env.APP_PORT || 5000;
app.listen(port, () => {
    debug( `on port ${port}`);
});