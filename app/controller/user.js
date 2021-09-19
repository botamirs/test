const validator = require("@service/validate");
const userModel = require("@model/userModel");
const authService = require("@service/authService")
const bcrypt = require("bcryptjs");

const captchaService = require("@service/captcha");

module.exports.register = (req, res) => {
    res.userRender("admin/signup", {pageTitle : "ثبت نام"});
}

module.exports.handleRegister = async (req, res) => {
    const errors = [];
    try {
        const { email, pass, fullname } = req.body;

        const validate =  validator(req.body, 0);
        if(validate !== true) throw validate;

        const userDB = await userModel.findOne({email});
        
        if(userDB) {
            errors.push("کاربری با این ایمیل موجود است");
            throw errors;
        }

        const hashPass = bcrypt.hashSync(pass, 10);
        const user = await userModel.create({email, fullname, password: hashPass});

        req.session.user = user;
        res.redirect("/dashboard");
    } catch (err) {
        req.flash("errors", err);
        res.redirect("/user/register");
    }
}

module.exports.login = async (req, res) => {
    res.userRender("admin/login", {pageTitle: "ورود به داشبورد"});
}

module.exports.handleLogin = async (req, res) => {
    const {email, pass } = req.body;
    try {
        const validate =  validator(req.body, 1);
        if(validate !== true) throw validate;
        
        const captchaResponse = await captchaService(req.body["g-recaptcha-response"], req.connection.remoteAddress);
        if(captchaResponse.success) {
        
            const user = await authService.login(email, pass);

            if(!user) {
                req.flash("errors", ["ایمیل یا کلمه عبور صحیح نیست"]);
                return res.redirect("/user/login");
            }

            if(req.body.remember && req.body.email && req.body.email) {
                req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000; // 24h
            } else {
                req.session.cookie.expire = null;
            }
            
            req.session.user = user;
            res.redirect("/dashboard");
        } else {
            req.flash("errors", "اعتبارسنجی captcha ناموفق بود");
            return res.redirect("/user/login"); 
        }
    } catch (err) {
        req.flash('errors', err);
        res.redirect("/user/login");
    }
}

module.exports.logout = (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) console.log(err);
            else req.session = null;
        });
    }
    res.redirect("/user/login");
}