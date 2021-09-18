const userModel = require("@model/userModel");
const bcrypt = require("bcryptjs");


exports.login = async (email, pass) => {
    let user = await userModel.findOne({email});

    if (!user) return false;
    
    const { password } = user;
    return bcrypt.compareSync(pass, password) ? user : false;

   
}