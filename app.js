require("dotenv").config();
require('module-alias/register')

require("@model/mongodb")();
require("./app/index");
